# Momentum Todo Agent Tooling Guide

This project uses the AI tooling image published by
[`calvinw/ai-agentic-tools`](https://github.com/calvinw/ai-agentic-tools):

```text
ghcr.io/calvinw/ai-course-devcontainer:latest
```

The image includes Node.js, Git, GitHub CLI, ripgrep, Python, and common coding
agents including Claude Code, OpenCode, Gemini, and Codex.

## Container setup

`.devcontainer/devcontainer.json` runs `scripts/post-create.sh`. Required setup
is sequential and fail-fast:

1. `setup-env.sh`
2. `npm ci`
3. `scripts/setup-agent-skills.sh`

Remote and local MCP registration then runs as optional setup. An unavailable
API key or agent client does not prevent the application from building.

## Agent Skills

`.agents/skills/` is the repository's single source of truth. Codex and
OpenCode discover it directly. Claude Code uses compatibility symlinks under
`.claude/skills/`, refreshed with:

```bash
scripts/setup-agent-skills.sh
```

Do not create `.skillshare/` or edit generated Claude links directly.

The repository includes reusable Stitch workflow skills, shadcn guidance,
frontend and web-design guidance, React best practices, GitHub Pages guidance,
and the application-specific `todo-ui-development` skill.

List installed project skills with:

```bash
npx --no-install skills list
```

Third-party sources and the reference snapshot are recorded in
`skills-lock.json`.

## MCP servers

`configs/mcp-servers.conf` defines remote integrations. The current entries are:

- Dolt over SSE.
- Google Stitch over HTTP using `X-Goog-Api-Key: $STITCH_API_KEY`.

Register them with:

```bash
install-mcps.sh
```

`STITCH_API_KEY` must be supplied through Codespaces secrets or the local
environment. Never commit it.

The official local shadcn MCP is registered for supported clients by:

```bash
scripts/setup-local-mcps.sh
```

OpenCode reads its repository-owned definition from `opencode.json`. Claude
and Codex registrations are local client state and are recreated by the setup
script.

## Stitch workflow

Read `TODO_STITCH_RESPONSIVE_WORKFLOW.md` and
`.agents/skills/todo-ui-development/SKILL.md` before responsive or Stitch-based
UI work. The repository remains authoritative for behavior; Stitch is the
visual design source. Translate approved designs into the existing React and
shadcn structure rather than replacing the app with exported HTML.

## Development

```bash
npm run dev
npm run build
npm run lint
```

The devcontainer intentionally does not install Playwright because this
repository does not currently define a Playwright suite.

## Agent launchers

The container image provides launcher scripts such as `claude.sh`,
`opencode.sh`, `gemini.sh`, and `codex.sh`. Their implementations and the
shared `setup-env.sh` and `install-mcps.sh` scripts come from the container
image, while repository-specific orchestration lives under `scripts/`.
