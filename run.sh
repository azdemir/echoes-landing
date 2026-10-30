#!/usr/bin/env bash
# ECHOES landing page — standalone runner.
# Installs deps (first run), builds the static export, serves it on :3000.
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "Installing dependencies (first run only)…"
  npm install --no-audit --no-fund
fi

echo "Building…"
npm run build

echo ""
echo "Serving the static export at http://localhost:3000"
echo "Press Ctrl+C to stop."
python3 -m http.server 3000 --directory out
