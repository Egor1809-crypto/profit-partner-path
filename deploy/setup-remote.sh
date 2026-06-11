#!/usr/bin/env bash
# Idempotent provisioning for profit-partner-path on a fresh Debian/Ubuntu VPS.
# Run as root on the server after the app bundle has been extracted to /opt/profit-partner-path.
set -euo pipefail

APP_DIR=/opt/profit-partner-path
echo "==> profit-partner-path remote setup"

# --- Node.js (>=20) -----------------------------------------------------------
if ! command -v node >/dev/null 2>&1 || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 20 ]; then
  echo "==> Installing Node.js 22 LTS"
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
echo "node: $(node -v)"

# --- nginx --------------------------------------------------------------------
if ! command -v nginx >/dev/null 2>&1; then
  echo "==> Installing nginx"
  apt-get update -y
  apt-get install -y nginx
fi

# --- App user & permissions ---------------------------------------------------
id -u www-data >/dev/null 2>&1 || useradd -r -s /usr/sbin/nologin www-data
chown -R www-data:www-data "$APP_DIR"

# --- systemd service ----------------------------------------------------------
echo "==> Installing systemd service"
cp "$APP_DIR/deploy/profit-partner-path.service" /etc/systemd/system/profit-partner-path.service
systemctl daemon-reload
systemctl enable profit-partner-path
systemctl restart profit-partner-path
sleep 2
systemctl --no-pager --full status profit-partner-path | head -12 || true

# --- nginx site ---------------------------------------------------------------
echo "==> Installing nginx site"
cp "$APP_DIR/deploy/nginx.conf" /etc/nginx/sites-available/profit-partner-path
ln -sf /etc/nginx/sites-available/profit-partner-path /etc/nginx/sites-enabled/profit-partner-path
# Shared host: do NOT remove other sites or the default. Validate before reload.
nginx -t
systemctl reload nginx

echo "==> Local health checks"
curl -fsS -o /dev/null -w "node  127.0.0.1:3200       -> %{http_code}\n" http://127.0.0.1:3200/ || echo "node check FAILED"
curl -fsS -o /dev/null -w "nginx Host:aspb-partner.ru -> %{http_code}\n" -H "Host: aspb-partner.ru" http://127.0.0.1:80/ || echo "nginx check FAILED"
echo "==> Done."
