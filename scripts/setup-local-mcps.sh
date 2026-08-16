#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd -- "$script_dir/.." && pwd)"
shadcn_bin="$project_root/node_modules/.bin/shadcn"

cd -- "$project_root"

if [ ! -x "$shadcn_bin" ]; then
  echo "shadcn is not installed. Run npm ci before scripts/setup-local-mcps.sh." >&2
  exit 1
fi

if command -v claude >/dev/null 2>&1; then
  claude mcp remove --scope local shadcn >/dev/null 2>&1 || true
  claude mcp add --scope local shadcn -- npx --no-install shadcn mcp
else
  echo "Claude Code not found; skipping shadcn MCP registration."
fi

if command -v opencode >/dev/null 2>&1; then
  echo "OpenCode: shadcn MCP configured in opencode.json."
else
  echo "OpenCode not found; opencode.json remains available for later use."
fi

if command -v codex >/dev/null 2>&1; then
  codex mcp remove shadcn >/dev/null 2>&1 || true
  codex mcp add shadcn -- "$shadcn_bin" mcp
else
  echo "Codex not found; skipping shadcn MCP registration."
fi
