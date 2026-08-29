#!/usr/bin/env bash
# Ensure helper deps, then drive one mapped feature.

set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/common.sh"

feature="${1:-}"
if [[ -z "$feature" ]]; then
  echo "Usage: helpers/drive.sh <home|demo-chat|contact|installer|locale>"
  exit 2
fi

if [[ ! -d "$HELPERS_DIR/node_modules/playwright-core" ]]; then
  echo "Installing playwright-core in $HELPERS_DIR (verification scaffolding, not the app)"
  (cd "$HELPERS_DIR" && npm install)
fi

if [[ ! -x "$CHROME_PATH" ]]; then
  echo "Chrome not found at $CHROME_PATH. Set CHROME_PATH to a Chromium binary."
  exit 1
fi

export TALKER_VERIFY_URL="${TALKER_VERIFY_URL:-$(cat "$URL_FILE" 2>/dev/null || echo "http://${TALKER_VERIFY_HOST}:${TALKER_VERIFY_PORT}")}"
export TALKER_VERIFY_EVIDENCE="$EVIDENCE_DIR"
export CHROME_PATH

exec node "$HELPERS_DIR/drive.mjs" "$feature" --url "$TALKER_VERIFY_URL"
