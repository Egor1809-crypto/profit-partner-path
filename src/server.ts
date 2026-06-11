import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type TelegramEnv = {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  FAQ_TELEGRAM_BOT_TOKEN?: string;
  FAQ_TELEGRAM_CHAT_ID?: string;
  FAQ_WEBHOOK_SECRET?: string;
  ADMIN_TELEGRAM_BOT_TOKEN?: string;
  ADMIN_TELEGRAM_CHAT_ID?: string;
  ADMIN_WEBHOOK_SECRET?: string;
  ADMIN_SITE_URL?: string;
  DB?: D1DatabaseLike;
};

type D1DatabaseLike = {
  prepare: (query: string) => D1PreparedStatementLike;
};

type D1PreparedStatementLike = {
  bind: (...values: unknown[]) => D1PreparedStatementLike;
  run: () => Promise<{ success?: boolean; meta?: { last_row_id?: number } }>;
  all: <T = Record<string, unknown>>() => Promise<{ results?: T[] }>;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function jsonResponse(payload: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init?.headers,
    },
  });
}

function getRuntimeEnv(env: unknown): TelegramEnv {
  const workerEnv = env && typeof env === "object" ? (env as TelegramEnv) : {};
  const processEnv = (globalThis as unknown as { process?: { env?: TelegramEnv } }).process?.env;

  return {
    TELEGRAM_BOT_TOKEN: workerEnv.TELEGRAM_BOT_TOKEN ?? processEnv?.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: workerEnv.TELEGRAM_CHAT_ID ?? processEnv?.TELEGRAM_CHAT_ID,
    FAQ_TELEGRAM_BOT_TOKEN: workerEnv.FAQ_TELEGRAM_BOT_TOKEN ?? processEnv?.FAQ_TELEGRAM_BOT_TOKEN,
    FAQ_TELEGRAM_CHAT_ID: workerEnv.FAQ_TELEGRAM_CHAT_ID ?? processEnv?.FAQ_TELEGRAM_CHAT_ID,
    FAQ_WEBHOOK_SECRET: workerEnv.FAQ_WEBHOOK_SECRET ?? processEnv?.FAQ_WEBHOOK_SECRET,
    ADMIN_TELEGRAM_BOT_TOKEN:
      workerEnv.ADMIN_TELEGRAM_BOT_TOKEN ?? processEnv?.ADMIN_TELEGRAM_BOT_TOKEN,
    ADMIN_TELEGRAM_CHAT_ID:
      workerEnv.ADMIN_TELEGRAM_CHAT_ID ?? processEnv?.ADMIN_TELEGRAM_CHAT_ID,
    ADMIN_WEBHOOK_SECRET: workerEnv.ADMIN_WEBHOOK_SECRET ?? processEnv?.ADMIN_WEBHOOK_SECRET,
    ADMIN_SITE_URL: workerEnv.ADMIN_SITE_URL ?? processEnv?.ADMIN_SITE_URL,
    DB: workerEnv.DB,
  };
}

function escapeTelegramHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatTelegramMessage(payload: Record<string, unknown>): string {
  const type = payload.type === "client" ? "Заявка: передать клиента" : "Заявка на партнёрство";
  const labels: Record<string, string> = {
    name: "Имя",
    phone: "Телефон",
    city: "Город",
    field: "Сфера деятельности",
    hasClients: "Есть потенциальные клиенты",
    volume: "Заявок в месяц",
    channel: "Удобная связь",
    comment: "Комментарий",
    pname: "Имя партнёра",
    pphone: "Телефон партнёра",
    cname: "Имя клиента",
    cphone: "Телефон клиента",
    ccity: "Город клиента",
    debt: "Сумма долга",
    requestType: "Тип заявки",
  };

  const lines = [`<b>${escapeTelegramHtml(type)}</b>`];

  for (const [key, label] of Object.entries(labels)) {
    const value = payload[key];
    if (value === undefined || value === null || value === "") continue;
    lines.push(`<b>${escapeTelegramHtml(label)}:</b> ${escapeTelegramHtml(value)}`);
  }

  lines.push("");
  lines.push(`<i>Источник: сайт партнёрской программы</i>`);

  return lines.join("\n").slice(0, 3900);
}

function getStringField(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function getApplicationContactFields(payload: Record<string, unknown>) {
  const requestType = payload.type === "client" ? "client" : "partner";

  if (requestType === "client") {
    return {
      requestType,
      name: getStringField(payload, "cname"),
      phone: getStringField(payload, "cphone"),
      city: getStringField(payload, "ccity"),
    };
  }

  return {
    requestType,
    name: getStringField(payload, "name"),
    phone: getStringField(payload, "phone"),
    city: getStringField(payload, "city"),
  };
}

async function saveApplication(
  env: unknown,
  payload: Record<string, unknown>,
): Promise<{ saved: boolean; id?: number }> {
  const { DB } = getRuntimeEnv(env);
  if (!DB) {
    return { saved: false };
  }

  const fields = getApplicationContactFields(payload);
  const result = await DB.prepare(
    [
      "INSERT INTO applications",
      "(request_type, status, source, name, phone, city, channel, comment, payload_json)",
      "VALUES (?, 'new', 'site', ?, ?, ?, ?, ?, ?)",
    ].join(" "),
  )
    .bind(
      fields.requestType,
      fields.name,
      fields.phone,
      fields.city,
      getStringField(payload, "channel"),
      getStringField(payload, "comment"),
      JSON.stringify(payload),
    )
    .run();

  return { saved: result.success !== false, id: result.meta?.last_row_id };
}

async function handleTelegramRequest(request: Request, env: unknown): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = getRuntimeEnv(env);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return jsonResponse({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  // Durable capture first: persist the lead to the database. A failure here is
  // logged but does not by itself drop the lead if Telegram delivery still works.
  let savedApplication: { saved: boolean; id?: number } = { saved: false };
  let dbError: unknown = null;
  try {
    savedApplication = await saveApplication(env, payload as Record<string, unknown>);
  } catch (error) {
    dbError = error;
    console.error("Application DB save error:", error);
  }

  // Telegram notification is best-effort and optional. The lead is considered
  // captured as long as at least one durable channel (DB or Telegram) succeeded.
  let telegramSent = false;
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: formatTelegramMessage(payload as Record<string, unknown>),
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        },
      );
      telegramSent = telegramResponse.ok;
      if (!telegramResponse.ok) {
        console.error(`Telegram API error: ${telegramResponse.status}`);
      }
    } catch (error) {
      console.error("Telegram request failed:", error);
    }
  }

  // Nothing captured anywhere — surface a real failure so the user can retry.
  if (!savedApplication.saved && !telegramSent) {
    console.error("Lead capture failed: no durable channel succeeded", dbError ?? "");
    return jsonResponse(
      { ok: false, error: "Не удалось сохранить заявку. Попробуйте позже." },
      { status: 502 },
    );
  }

  return jsonResponse({
    ok: true,
    application: savedApplication,
    notified: telegramSent,
  });
}

type TelegramWebhookUpdate = {
  message?: {
    message_id?: number;
    text?: string;
    chat?: {
      id?: number | string;
    };
  };
};

const faqCommandAnswers: Record<string, string> = {
  "/start": [
    "Здравствуйте! Я FAQ-бот партнёрской программы.",
    "Отвечаю на частые вопросы партнёров: как передать клиента, как считаются выплаты, какие статусы видны в кабинете и что происходит после заявки.",
    "",
    "Доступные команды:",
    "/faq — список частых вопросов",
    "/lead — как передать клиента",
    "/payouts — как устроены выплаты",
    "/cabinet — что видно в личном кабинете",
    "/docs — что проверяют юристы",
    "/time — сроки обработки заявки",
    "/contacts — как связаться с отделом партнёров",
  ].join("\n"),
  "/help": [
    "Я понимаю команды и короткие вопросы обычным текстом.",
    "",
    "Попробуйте:",
    "/lead",
    "/payouts",
    "/cabinet",
    "/docs",
    "/time",
    "/contacts",
  ].join("\n"),
  "/faq": [
    "Частые вопросы:",
    "",
    "1. Как передать клиента?",
    "2. Когда выплачивается вознаграждение?",
    "3. Что видно в личном кабинете?",
    "4. Какие документы проверяют юристы?",
    "5. Сколько занимает первичная обработка?",
    "",
    "Нажмите команду ниже или напишите вопрос своими словами.",
  ].join("\n"),
  "/lead": [
    "Как передать клиента:",
    "1. Оставьте заявку через форму сайта или согласованный канал.",
    "2. Укажите имя, телефон, город и коротко опишите ситуацию клиента.",
    "3. Юристы проведут первичную правовую оценку.",
    "4. Если обращение подходит в работу, заявка фиксируется за партнёром.",
  ].join("\n"),
  "/payouts": [
    "Вознаграждение выплачивается за подтверждённые заявки.",
    "",
    "Условия зависят от источника, качества обращения и согласованной партнёрской схемы. Перед стартом менеджер объяснит порядок выплат и фиксации заявок.",
  ].join("\n"),
  "/cabinet": [
    "В личном кабинете партнёр видит статусы заявок по каждому клиенту.",
    "",
    "Можно отслеживать этап обработки, историю обращений и понимать, какие источники дают результат.",
  ].join("\n"),
  "/docs": [
    "Юристы оценивают ситуацию клиента до обещаний и договора.",
    "",
    "Обычно смотрят долги, доходы, имущество, документы и возможные риски. Результат зависит от индивидуальной ситуации клиента.",
  ].join("\n"),
  "/time": [
    "Первичная обработка заявки обычно занимает до 24 часов.",
    "",
    "Если нужны уточнения, менеджер или юрист связывается с партнёром или клиентом.",
  ].join("\n"),
  "/contacts": [
    "Чтобы связаться с отделом партнёров, оставьте заявку на сайте.",
    "",
    "Менеджер уточнит ваш источник заявок, условия выплат и порядок подключения.",
  ].join("\n"),
};

function getFaqCommand(text: string): string | null {
  const firstWord = text.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  const command = firstWord.split("@")[0];
  return faqCommandAnswers[command] ? command : null;
}

function buildFaqTelegramAnswer(text: string): string {
  const command = getFaqCommand(text);
  if (command) {
    return faqCommandAnswers[command];
  }

  const normalized = text.toLowerCase();

  if (normalized.includes("выплат") || normalized.includes("вознаграж")) {
    return [
      "Вознаграждение выплачивается за подтверждённые заявки.",
      "Точные условия зависят от источника, качества обращения и согласованной партнёрской схемы.",
      "Чтобы подключиться, оставьте заявку на сайте или напишите менеджеру.",
    ].join("\n\n");
  }

  if (normalized.includes("кабинет") || normalized.includes("статус")) {
    return [
      "В личном кабинете партнёр видит статусы заявок по каждому клиенту.",
      "Так проще понимать, на каком этапе обращение: принято, в оценке, в работе или требует уточнений.",
    ].join("\n\n");
  }

  if (normalized.includes("документ") || normalized.includes("банкрот")) {
    return [
      "Клиента сначала передают на правовую оценку ситуации по банкротству физлиц.",
      "Юристы проверяют документы, долги, доходы, имущество и возможные риски.",
      "Мы не обещаем гарантированный результат до анализа ситуации.",
    ].join("\n\n");
  }

  if (normalized.includes("срок") || normalized.includes("24") || normalized.includes("быстро")) {
    return [
      "Первичная обработка заявки обычно занимает до 24 часов.",
      "Если по обращению нужны уточнения, менеджер или юрист связывается с партнёром или клиентом.",
    ].join("\n\n");
  }

  if (
    normalized.includes("клиент") ||
    normalized.includes("заявк") ||
    normalized.includes("передать")
  ) {
    return [
      "Механика простая:",
      "1. Партнёр передаёт заявку клиента.",
      "2. Юристы проводят первичную оценку.",
      "3. Если обращение качественное и подходит в работу, партнёр получает вознаграждение.",
    ].join("\n");
  }

  if (normalized.includes("контакт") || normalized.includes("связ")) {
    return [
      "Чтобы связаться с отделом партнёров, оставьте заявку на сайте.",
      "Менеджер уточнит источник заявок, условия выплат и порядок подключения.",
    ].join("\n\n");
  }

  return [
    "Здравствуйте! Я FAQ-бот партнёрской программы.",
    "Могу ответить про выплаты, передачу заявок, личный кабинет, сроки обработки и юридическую оценку клиента.",
    "",
    "Напишите вопрос коротко, например: «Как выплачивается вознаграждение?» или «Как передать клиента?»",
  ].join("\n");
}

function getFaqReplyMarkup() {
  return {
    keyboard: [
      [{ text: "/lead" }, { text: "/payouts" }],
      [{ text: "/cabinet" }, { text: "/docs" }],
      [{ text: "/time" }, { text: "/contacts" }],
      [{ text: "/faq" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

async function handleFaqTelegramWebhook(request: Request, env: unknown): Promise<Response> {
  if (request.method === "GET") {
    return jsonResponse({ ok: true, service: "telegram-faq" });
  }

  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  const { FAQ_TELEGRAM_BOT_TOKEN, FAQ_TELEGRAM_CHAT_ID, FAQ_WEBHOOK_SECRET } = getRuntimeEnv(env);

  if (!FAQ_TELEGRAM_BOT_TOKEN) {
    return jsonResponse(
      {
        ok: false,
        error: "FAQ Telegram bot is not configured",
      },
      { status: 503 },
    );
  }

  // Reject forged requests: Telegram echoes the configured secret in this header.
  if (
    FAQ_WEBHOOK_SECRET &&
    request.headers.get("x-telegram-bot-api-secret-token") !== FAQ_WEBHOOK_SECRET
  ) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let update: TelegramWebhookUpdate;
  try {
    update = (await request.json()) as TelegramWebhookUpdate;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const chatId = update.message?.chat?.id ?? FAQ_TELEGRAM_CHAT_ID;
  const incomingText = update.message?.text ?? "";

  if (!chatId || !incomingText.trim()) {
    return jsonResponse({ ok: true, skipped: true });
  }

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${FAQ_TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildFaqTelegramAnswer(incomingText),
        reply_to_message_id: update.message?.message_id,
        disable_web_page_preview: true,
        reply_markup: getFaqReplyMarkup(),
      }),
    },
  );

  if (!telegramResponse.ok) {
    const text = await telegramResponse.text();
    console.error(`FAQ Telegram API error: ${telegramResponse.status} ${text}`);
    return jsonResponse({ ok: false, error: "FAQ Telegram API error" }, { status: 502 });
  }

  return jsonResponse({ ok: true });
}

function normalizeSiteUrl(value?: string): string {
  return (value || "https://aspb-partner.ru").replace(/\/+$/, "");
}

function getAdminReplyKeyboard() {
  return {
    keyboard: [
      [{ text: "Передать клиента" }, { text: "Стать партнёром" }],
      [{ text: "/partners" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

function getAdminInlineKeyboard(siteUrl: string, mode?: "client" | "partner") {
  const buttons = {
    client: { text: "Открыть форму передачи клиента", url: `${siteUrl}/#req-client` },
    partner: { text: "Открыть форму партнёрства", url: `${siteUrl}/#req-partner` },
  };

  if (mode) {
    return { inline_keyboard: [[buttons[mode]]] };
  }

  return { inline_keyboard: [[buttons.client], [buttons.partner]] };
}

type ApplicationRow = {
  id: number;
  request_type: "partner" | "client";
  status: string;
  name: string | null;
  phone: string | null;
  city: string | null;
  channel: string | null;
  created_at: string;
};

async function getRecentPartnerApplications(env: unknown): Promise<ApplicationRow[] | null> {
  const { DB } = getRuntimeEnv(env);
  if (!DB) return null;

  const result = await DB.prepare(
    [
      "SELECT id, request_type, status, name, phone, city, channel, created_at",
      "FROM applications",
      "WHERE request_type = 'partner'",
      "ORDER BY created_at DESC",
      "LIMIT 5",
    ].join(" "),
  ).all<ApplicationRow>();

  return result.results ?? [];
}

function formatRecentPartnerApplications(rows: ApplicationRow[] | null): string {
  if (!rows) {
    return [
      "База заявок пока не подключена к окружению.",
      "Проверьте D1 binding DB в wrangler/prod-настройках.",
    ].join("\n");
  }

  if (rows.length === 0) {
    return "Заявок на партнёрство в базе пока нет.";
  }

  return [
    "Последние заявки на партнёрство:",
    "",
    ...rows.map((row) =>
      [
        `#${row.id} — ${row.name || "Без имени"}`,
        row.phone ? `Телефон: ${row.phone}` : null,
        row.city ? `Город: ${row.city}` : null,
        row.channel ? `Связь: ${row.channel}` : null,
        `Статус: ${row.status}`,
        `Создана: ${row.created_at}`,
      ]
        .filter(Boolean)
        .join("\n"),
    ),
  ].join("\n\n");
}

async function buildAdminBotAnswer(text: string, siteUrl: string, env: unknown) {
  const normalized = text.trim().toLowerCase();

  if (normalized === "/partners" || normalized.includes("заявки парт")) {
    return {
      text: formatRecentPartnerApplications(await getRecentPartnerApplications(env)),
      replyMarkup: getAdminReplyKeyboard(),
    };
  }

  if (normalized.includes("передать") || normalized.includes("клиент")) {
    return {
      text: [
        "Передача клиента",
        "",
        "Откройте форму, внесите контакт клиента и коротко опишите ситуацию. Заявка уйдёт менеджеру в Telegram с пометкой «Передать клиента».",
      ].join("\n"),
      replyMarkup: getAdminInlineKeyboard(siteUrl, "client"),
    };
  }

  if (normalized.includes("партн")) {
    return {
      text: [
        "Заявка на партнёрство",
        "",
        "Откройте форму подключения. Заявка уйдёт менеджеру в Telegram с пометкой «Заявка на партнёрство».",
      ].join("\n"),
      replyMarkup: getAdminInlineKeyboard(siteUrl, "partner"),
    };
  }

  return {
    text: [
      "Админ-бот ASPB Partners.",
      "",
      "Выберите действие:",
      "— передать клиента на правовую оценку;",
      "— оставить заявку на подключение партнёра.",
      "",
      "Команда /partners покажет последние заявки на партнёрство из базы.",
    ].join("\n"),
    replyMarkup: normalized.startsWith("/start")
      ? getAdminReplyKeyboard()
      : getAdminInlineKeyboard(siteUrl),
  };
}

async function handleAdminTelegramWebhook(request: Request, env: unknown): Promise<Response> {
  if (request.method === "GET") {
    return jsonResponse({ ok: true, service: "telegram-admin" });
  }

  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  const { ADMIN_TELEGRAM_BOT_TOKEN, ADMIN_TELEGRAM_CHAT_ID, ADMIN_WEBHOOK_SECRET, ADMIN_SITE_URL } =
    getRuntimeEnv(env);

  if (!ADMIN_TELEGRAM_BOT_TOKEN) {
    return jsonResponse(
      {
        ok: false,
        error: "Admin Telegram bot is not configured",
      },
      { status: 503 },
    );
  }

  // Reject forged requests: only Telegram knows the configured secret token.
  if (
    ADMIN_WEBHOOK_SECRET &&
    request.headers.get("x-telegram-bot-api-secret-token") !== ADMIN_WEBHOOK_SECRET
  ) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let update: TelegramWebhookUpdate;
  try {
    update = (await request.json()) as TelegramWebhookUpdate;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const chatId = update.message?.chat?.id;
  const incomingText = update.message?.text ?? "";

  if (!chatId || !incomingText.trim()) {
    return jsonResponse({ ok: true, skipped: true });
  }

  // Allowlist: the admin bot exposes lead PII (/partners). Only reply to explicitly
  // permitted chat IDs so a forged update cannot exfiltrate the applications table.
  const allowedChatIds = (ADMIN_TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (allowedChatIds.length > 0 && !allowedChatIds.includes(String(chatId))) {
    return jsonResponse({ ok: true, skipped: true });
  }

  const siteUrl = normalizeSiteUrl(ADMIN_SITE_URL);
  const answer = await buildAdminBotAnswer(incomingText, siteUrl, env);

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${ADMIN_TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: answer.text,
        reply_to_message_id: update.message?.message_id,
        disable_web_page_preview: true,
        reply_markup: answer.replyMarkup,
      }),
    },
  );

  if (!telegramResponse.ok) {
    const text = await telegramResponse.text();
    console.error(`Admin Telegram API error: ${telegramResponse.status} ${text}`);
    return jsonResponse({ ok: false, error: "Admin Telegram API error" }, { status: 502 });
  }

  return jsonResponse({ ok: true });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/telegram") {
        return await handleTelegramRequest(request, env);
      }
      if (url.pathname === "/api/telegram-faq") {
        return await handleFaqTelegramWebhook(request, env);
      }
      if (url.pathname === "/api/telegram-admin") {
        return await handleAdminTelegramWebhook(request, env);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
