-- PostgreSQL dialect of the applications schema (the VPS/Node deploy uses native Postgres,
-- not Cloudflare D1). Idempotent: safe to run on a fresh or existing database.
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
  notified      BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Telegram delivery flag (added for existing installs too).
ALTER TABLE applications ADD COLUMN IF NOT EXISTS notified BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS applications_request_type_idx
  ON applications (request_type, created_at DESC);

CREATE INDEX IF NOT EXISTS applications_status_idx
  ON applications (status, created_at DESC);

-- Fast lookup for the background Telegram notifier (only undelivered rows).
CREATE INDEX IF NOT EXISTS applications_unnotified_idx
  ON applications (id) WHERE notified = false;
