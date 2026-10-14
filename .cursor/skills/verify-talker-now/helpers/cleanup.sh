#!/usr/bin/env bash
# Stop the instance this run started. Leaves evidence/ in place.

set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/common.sh"

if [[ ! -f "$PID_FILE" ]]; then
  echo "No pid file; nothing to stop. Evidence remains at $EVIDENCE_DIR"
  exit 0
fi

pid="$(cat "$PID_FILE" || true)"
if [[ -n "${pid:-}" ]] && kill -0 "$pid" 2>/dev/null; then
  # Kill the process group if we can; otherwise the pid only. Never pkill next.
  if kill -TERM -- "-$pid" 2>/dev/null; then
    :
  else
    kill -TERM "$pid" 2>/dev/null || true
  fi
  for _ in $(seq 1 20); do
    kill -0 "$pid" 2>/dev/null || break
    sleep 0.25
  done
  if kill -0 "$pid" 2>/dev/null; then
    kill -KILL "$pid" 2>/dev/null || true
  fi
fi

rm -f "$PID_FILE" "$PORT_FILE" "$URL_FILE" "$META_FILE"
# Keep the log until the directory is removed so a failed run can still be inspected.
# Remove only this run directory, never evidence.
rm -rf "$TALKER_VERIFY_DIR"

echo "Stopped verification instance (pid ${pid:-unknown})."
echo "Evidence kept at $EVIDENCE_DIR"
