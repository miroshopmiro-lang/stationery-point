#!/usr/bin/env bash
# Real build check. `npx vite build | tail` can look silent while actually failing —
# it exits non-zero but a piped tail swallows it. Always assert dist/ exists.
set -o pipefail
rm -rf dist
ALLOW_PLACEHOLDER_PRODUCTS=1 npx vite build 2>&1 | grep -E "built in|error|ERROR" | head -8
if ls dist/assets/*.js >/dev/null 2>&1; then echo "BUILD OK"; exit 0; else echo "BUILD FAILED"; exit 1; fi
