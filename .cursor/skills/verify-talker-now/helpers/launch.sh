#!/usr/bin/env bash
# Start an isolated Next.js verification instance. Does not attach to a
# pre-existing localhost:3000 session.

set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/common.sh"

if [[ -f "$PID_FILE" ]]; then
  old_pid="$(cat "$PID_FILE" || true)"
  if [[ -n "${old_pid:-}" ]] && kill -0 "$old_pid" 2>/dev/null; then
    echo "A verification instance is already running (pid $old_pid)."
    echo "Doctor it with $HELPERS_DIR/doctor.sh or stop it with $HELPERS_DIR/cleanup.sh"
    exit 1
  fi
  rm -f "$PID_FILE"
fi

if command -v ss >/dev/null 2>&1; then
  if ss -ltnH "sport = :$TALKER_VERIFY_PORT" | grep -q .; then
    echo "Port $TALKER_VERIFY_PORT is already in use. Set TALKER_VERIFY_PORT to a free port, or stop the occupant."
    echo "Do not drive whatever is bound to that port unless doctor.sh confirms it is this run's pid."
    exit 1
  fi
fi

if [[ ! -d "$REPO/node_modules/next" ]]; then
  echo "Installing app dependencies in $REPO"
  (cd "$REPO" && npm install)
fi

# Installer download is /talker-now.zip — build it so that path is real.
(cd "$REPO" && bash scripts/build-plugin-zip.sh)

echo "$TALKER_VERIFY_PORT" > "$PORT_FILE"
echo "$TALKER_VERIFY_URL" > "$URL_FILE"
: > "$LOG_FILE"

cd "$REPO"
# Isolated host+port so a human's npm run dev on :3000 is left alone.
# setsid so cleanup can kill the whole group without pkill next.
setsid npx next dev --hostname "$TALKER_VERIFY_HOST" --port "$TALKER_VERIFY_PORT" \
  >"$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"

ready=0
for _ in $(seq 1 90); do
  if curl -fsS -o /dev/null "$TALKER_VERIFY_URL/" 2>/dev/null; then
    ready=1
    break
  fi
  if [[ -f "$PID_FILE" ]] && ! kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    echo "next dev exited before becoming ready. Last log lines:"
    tail -n 80 "$LOG_FILE" || true
    exit 1
  fi
  sleep 1
done

if [[ "$ready" -ne 1 ]]; then
  echo "Timed out waiting for $TALKER_VERIFY_URL"
  tail -n 80 "$LOG_FILE" || true
  exit 1
fi

python3 - <<PY
import json, os, time
meta = {
  "pid": int(open("$PID_FILE").read().strip()),
  "port": int("$TALKER_VERIFY_PORT"),
  "host": "$TALKER_VERIFY_HOST",
  "url": "$TALKER_VERIFY_URL",
  "log": "$LOG_FILE",
  "repo": "$REPO",
  "startedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
}
open("$META_FILE", "w").write(json.dumps(meta, indent=2) + "\n")
print(json.dumps(meta, indent=2))
PY

echo "Ready: $TALKER_VERIFY_URL"
echo "Log: $LOG_FILE"
echo "Teardown: $HELPERS_DIR/cleanup.sh"
