#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if [[ -f "$PROJECT_ROOT/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$PROJECT_ROOT/.env"
  set +a
fi

MEDIA_ROOT="${MEDIA_ROOT:-$HOME/Developer/netflix-adaptive-stream-media}"

mkdir -p "$MEDIA_ROOT/uploads" "$MEDIA_ROOT/output"

echo "Media directories ready at: $MEDIA_ROOT"
echo "  uploads: $MEDIA_ROOT/uploads"
echo "  output:  $MEDIA_ROOT/output"
