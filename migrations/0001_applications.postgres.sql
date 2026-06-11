-- PostgreSQL dialect of the applications schema (the VPS/Node deploy uses native Postgres,
-- not Cloudflare D1). Kept alongside the original SQLite/D1 migration for parity.
CREATE TABLE IF NOT EXISTS applications (
  id            BIGSERIAL PRIMARY KEY,
  request_type  TEXT NOT NULL CHECK (request_type IN ('partner', 'client')),
  status        TEXT NOT NULL DEFAULT 'new',
  source        TEXT NOT NULL DEFAULT 'site',
  name          TEXT,
  phone         TEXT,
  city          TEXT,
  channel       TEXT,
  comment       TEXT,
  payload_json  TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS applications_request_type_idx
  ON applications (request_type, created_at DESC);

CREATE INDEX IF NOT EXISTS applications_status_idx
  ON applications (status, created_at DESC);
