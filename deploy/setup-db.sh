#!/usr/bin/env bash
# Idempotent: native PostgreSQL DB + role + schema + runtime deps + env for profit-partner-path.
set -euo pipefail
APP=/opt/profit-partner-path
cd "$APP"
DBNAME=aspb_partners
DBUSER=aspb_partners
ENVF="$APP/.env"

echo "==> [1/5] install runtime dep (pg)"
cp deploy/runtime-package.json package.json
npm install --omit=dev --no-audit --no-fund 2>&1 | tail -3

echo "==> [2/5] create/rotate role + database"
DBPASS=$(openssl rand -hex 24)
if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DBUSER'" | grep -q 1; then
  sudo -u postgres psql -qc "ALTER ROLE $DBUSER LOGIN PASSWORD '$DBPASS';"
  echo "    role existed -> password rotated"
else
  sudo -u postgres psql -qc "CREATE ROLE $DBUSER LOGIN PASSWORD '$DBPASS';"
  echo "    role created"
fi
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DBNAME'" | grep -q 1; then
  sudo -u postgres psql -qc "CREATE DATABASE $DBNAME OWNER $DBUSER;"
  echo "    database created"
else
  echo "    database existed"
fi

echo "==> [3/5] run migration as app role (tables owned by $DBUSER)"
PGPASSWORD="$DBPASS" psql -h 127.0.0.1 -U "$DBUSER" -d "$DBNAME" -v ON_ERROR_STOP=1 \
  -f migrations/0001_applications.postgres.sql
echo "    schema applied; row count: $(PGPASSWORD="$DBPASS" psql -h 127.0.0.1 -U "$DBUSER" -d "$DBNAME" -tAc 'SELECT count(*) FROM applications')"

echo "==> [4/5] write env file (preserve existing Telegram tokens if present)"
DBURL="postgres://$DBUSER:$DBPASS@127.0.0.1:5432/$DBNAME"
if [ -f "$ENVF" ]; then
  grep -v '^DATABASE_URL=' "$ENVF" > "$ENVF.tmp" || true
  echo "DATABASE_URL=$DBURL" >> "$ENVF.tmp"
  mv "$ENVF.tmp" "$ENVF"
  echo "    updated DATABASE_URL, kept other vars"
else
  {
    echo "NODE_ENV=production"
    echo "HOST=127.0.0.1"
    echo "PORT=3200"
    echo "ALLOWED_HOSTS=aspb-partner.ru,www.aspb-partner.ru,localhost,127.0.0.1"
    echo "ADMIN_SITE_URL=https://aspb-partner.ru"
    echo "DATABASE_URL=$DBURL"
    echo "# --- Telegram (fill real values to enable notifications; leave blank = DB-only) ---"
    echo "TELEGRAM_BOT_TOKEN="
    echo "TELEGRAM_CHAT_ID="
    echo "FAQ_TELEGRAM_BOT_TOKEN="
    echo "FAQ_TELEGRAM_CHAT_ID="
    echo "FAQ_WEBHOOK_SECRET="
    echo "ADMIN_TELEGRAM_BOT_TOKEN="
    echo "ADMIN_TELEGRAM_CHAT_ID="
    echo "ADMIN_WEBHOOK_SECRET="
  } > "$ENVF"
  echo "    created fresh env file"
fi
chmod 600 "$ENVF"
chown www-data:www-data "$ENVF"

echo "==> [5/5] install service + restart"
cp deploy/profit-partner-path.service /etc/systemd/system/profit-partner-path.service
chown -R www-data:www-data "$APP/dist" "$APP/server.mjs" "$APP/node_modules" 2>/dev/null || true
systemctl daemon-reload
systemctl restart profit-partner-path
sleep 2
echo "    active: $(systemctl is-active profit-partner-path)"
echo "==> done."
