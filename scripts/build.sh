#!/usr/bin/env bash
# Compile the Twee source in src/ into index.html with Tweego.
set -euo pipefail
cd "$(dirname "$0")/.."
TWEEGO="tools/tweego/tweego"
if [ ! -x "$TWEEGO" ]; then
  echo "Tweego not found at $TWEEGO — see README (Build)." >&2
  exit 1
fi
TWEEGO_PATH="tools/tweego/storyformats" "$TWEEGO" -o index.html src
echo "Built index.html"
