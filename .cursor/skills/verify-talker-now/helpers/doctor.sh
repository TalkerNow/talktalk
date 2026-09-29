#!/usr/bin/env bash
# Read-only: is this verification instance ours, alive, and serving talker.now?

set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/common.sh"

fail() { echo "DOCTOR FAIL: $*" >&2; exit 1; }

[[ -f "$PID_FILE" ]] || fail "no pid file at $PID_FILE (run helpers/launch.sh)"
pid="$(cat "$PID_FILE")"
[[ -n "$pid" ]] || fail "empty pid file"
kill -0 "$pid" 2>/dev/null || fail "pid $pid is not running"

port="$(cat "$PORT_FILE" 2>/dev/null || echo "$TALKER_VERIFY_PORT")"
url="$(cat "$URL_FILE" 2>/dev/null || echo "http://${TALKER_VERIFY_HOST}:${port}")"

curl -fsS -o /dev/null "$url/" || fail "nothing answering at $url"

home="$(curl -fsS -D - "$url/" -o /tmp/talker-verify-home.html)"
echo "$home" | head -n 1 | grep -q "200" || fail "GET / is not 200"
grep -qi "talker" /tmp/talker-verify-home.html || fail "GET / HTML does not mention talker"

for path in /contact /installer /talker-now.zip /robots.txt /sitemap.xml; do
  code="$(curl -sS -o /dev/null -w "%{http_code}" "$url$path")"
  [[ "$code" == "200" ]] || fail "GET $path returned $code"
done

# Zip is the WordPress plugin, not HTML.
zip_type="$(curl -sS -I "$url/talker-now.zip" | tr -d '\r' | grep -i '^content-type:' || true)"
echo "$zip_type" | grep -qiE "zip|octet-stream" || fail "talker-now.zip Content-Type is not a zip ($zip_type)"

echo "DOCTOR OK"
echo "pid=$pid"
echo "url=$url"
echo "log=$LOG_FILE"
echo "html mentions talker; / /contact /installer /talker-now.zip /robots.txt /sitemap.xml all 200"
exit 0
