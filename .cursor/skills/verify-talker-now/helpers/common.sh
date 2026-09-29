#!/usr/bin/env bash
# Shared paths for talker.now verification. Sourced by launch/doctor/cleanup/drive.

set -euo pipefail

REPO="$(git -C "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)" rev-parse --show-toplevel)"
SKILL_DIR="$REPO/.cursor/skills/verify-talker-now"
HELPERS_DIR="$SKILL_DIR/helpers"
EVIDENCE_DIR="${TALKER_VERIFY_EVIDENCE:-$SKILL_DIR/evidence}"

TALKER_VERIFY_DIR="${TALKER_VERIFY_DIR:-/tmp/talker-verify}"
TALKER_VERIFY_PORT="${TALKER_VERIFY_PORT:-3317}"
TALKER_VERIFY_HOST="${TALKER_VERIFY_HOST:-127.0.0.1}"
TALKER_VERIFY_URL="http://${TALKER_VERIFY_HOST}:${TALKER_VERIFY_PORT}"

PID_FILE="$TALKER_VERIFY_DIR/next.pid"
PORT_FILE="$TALKER_VERIFY_DIR/port"
LOG_FILE="$TALKER_VERIFY_DIR/next.log"
URL_FILE="$TALKER_VERIFY_DIR/url"
META_FILE="$TALKER_VERIFY_DIR/meta.json"

CHROME_PATH="${CHROME_PATH:-/usr/local/bin/google-chrome}"

mkdir -p "$TALKER_VERIFY_DIR" "$EVIDENCE_DIR"
