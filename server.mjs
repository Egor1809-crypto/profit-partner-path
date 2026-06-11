// Production server for the TanStack Start (Cloudflare Worker) build, adapted to plain Node.
// Serves dist/client/* statically and routes everything else to the worker's fetch handler.
// Injects a D1-compatible database shim backed by native PostgreSQL (node-postgres),
// so the worker's env.DB works on this VPS exactly as it would on Cloudflare D1.
import { createServer } from "node:http";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { join, normalize, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const CLIENT_DIR = join(__dirname, "dist", "client");
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "127.0.0.1";
const MAX_BODY_BYTES = Number(process.env.MAX_BODY_BYTES || 262144); // 256 KB

// Hostnames this server is allowed to answer for (prevents Host-header injection).
const ALLOWED_HOSTS = new Set(
  (process.env.ALLOWED_HOSTS || "aspb-partner.ru,www.aspb-partner.ru,localhost,127.0.0.1")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean),
);

const worker = (await import("./dist/server/index.js")).default;

// --- PostgreSQL -> D1 shim ----------------------------------------------------
// The worker code (src/server.ts) speaks the minimal D1 API: prepare(sql).bind(...).run()/.all().
// We back it with native Postgres. `?` placeholders are rewritten to `$1,$2,...`.
let db;
if (process.env.DATABASE_URL) {
  try {
    const { default: pg } = await import("pg");
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
    pool.on("error", (err) => console.error("[pg] idle client error:", err));
    db = makeD1(pool);
    // Fail fast / loud if the DB is unreachable at boot.
    pool
      .query("SELECT 1")
      .then(() => console.log("[pg] connected"))
      .catch((err) => console.error("[pg] initial connection FAILED:", err.message));
  } catch (err) {
    console.error("[pg] init failed (is 'pg' installed?):", err);
  }
} else {
  console.warn("[pg] DATABASE_URL not set — leads will not be persisted to the database");
}

function translatePlaceholders(sql) {
  let out = "";
  let n = 0;
  let inString = false;
  for (const ch of sql) {
    if (ch === "'") inString = !inString;
    if (ch === "?" && !inString) out += "$" + ++n;
    else out += ch;
  }
  return out;
}

function normalizeRow(row) {
  const out = {};
  for (const [k, v] of Object.entries(row)) out[k] = v instanceof Date ? v.toISOString() : v;
  return out;
}

function makeD1(pool) {
  return {
    prepare(sql) {
      const binds = [];
      const stmt = {
        bind(...values) {
          binds.push(...values);
          return stmt;
        },
        async run() {
          let q = translatePlaceholders(sql);
          if (/^\s*insert/i.test(q) && !/\breturning\b/i.test(q)) q += " RETURNING id";
          const res = await pool.query(q, binds);
          return { success: true, meta: { last_row_id: res.rows?.[0]?.id } };
        },
        async all() {
          const res = await pool.query(translatePlaceholders(sql), binds);
          return { results: (res.rows || []).map(normalizeRow) };
        },
        async first() {
          const res = await pool.query(translatePlaceholders(sql), binds);
          return res.rows?.[0] ? normalizeRow(res.rows[0]) : null;
        },
      };
      return stmt;
    },
  };
}

const workerEnv = { DB: db };

// --- static file serving ------------------------------------------------------
const MIME = {
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

async function tryServeStatic(req, res, pathname) {
  const rel = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(CLIENT_DIR, rel);
  // Containment: must be exactly CLIENT_DIR or strictly inside it.
  if (filePath !== CLIENT_DIR && !filePath.startsWith(CLIENT_DIR + sep)) return false;
  let info;
  try {
    info = await stat(filePath);
  } catch {
    return false;
  }
  if (!info.isFile()) return false;

  const type = MIME[extname(filePath).toLowerCase()] || "application/octet-stream";
  const immutable = filePath.startsWith(join(CLIENT_DIR, "assets") + sep);
  res.writeHead(200, {
    "content-type": type,
    "content-length": info.size,
    "cache-control": immutable ? "public, max-age=31536000, immutable" : "public, max-age=3600",
  });
  if (req.method === "HEAD") return res.end(), true;
  createReadStream(filePath).pipe(res);
  return true;
}

function toWebRequest(req) {
  const rawHost = (req.headers.host || `${HOST}:${PORT}`).toLowerCase();
  const hostname = rawHost.split(":")[0];
  const host = ALLOWED_HOSTS.has(hostname) ? req.headers.host : `${HOST}:${PORT}`;
  const url = `http://${host}${req.url}`;
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) v.forEach((vv) => headers.append(k, vv));
    else if (v != null) headers.set(k, v);
  }
  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  return new Request(url, {
    method: req.method,
    headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

async function sendWebResponse(res, webRes) {
  const headers = {};
  for (const [k, v] of webRes.headers) headers[k] = v;
  res.writeHead(webRes.status, headers);
  if (webRes.body) Readable.fromWeb(webRes.body).pipe(res);
  else res.end();
}

const server = createServer(async (req, res) => {
  try {
    const pathname = (req.url || "/").split("?")[0];

    // Reject oversized bodies early (defense in depth; nginx also caps).
    const len = Number(req.headers["content-length"] || 0);
    if (len > MAX_BODY_BYTES) {
      res.writeHead(413, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, error: "Payload too large" }));
      req.resume();
      return;
    }

    if ((req.method === "GET" || req.method === "HEAD") && pathname !== "/") {
      if (await tryServeStatic(req, res, pathname)) return;
    }

    const webReq = toWebRequest(req);
    const webRes = await worker.fetch(webReq, workerEnv, {
      waitUntil() {},
      passThroughOnException() {},
    });
    await sendWebResponse(res, webRes);
  } catch (err) {
    console.error("[server] request failed:", err);
    if (!res.headersSent) res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`profit-partner-path listening on http://${HOST}:${PORT}`);
});
