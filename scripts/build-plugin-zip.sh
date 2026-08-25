#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
src="$root/wp-plugin/talker-now"
out="$root/public/talker-now.zip"

if [[ ! -d "$src" ]]; then
  echo "Missing plugin source at $src" >&2
  exit 1
fi

mkdir -p "$root/public"
rm -f "$out"

if command -v zip >/dev/null 2>&1; then
  (
    cd "$root/wp-plugin"
    zip -r -q "$out" talker-now \
      -x "*/.DS_Store" \
      -x "*~"
  )
else
  python3 - "$src" "$out" <<'PY'
import sys, zipfile
from pathlib import Path

src = Path(sys.argv[1])
out = Path(sys.argv[2])
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zf:
    for path in sorted(src.rglob("*")):
        if not path.is_file() or path.name in {".DS_Store"}:
            continue
        zf.write(path, Path("talker-now") / path.relative_to(src))
PY
fi

echo "Wrote $out"
if command -v unzip >/dev/null 2>&1; then
  unzip -l "$out"
fi
