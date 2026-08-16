# Agent tooling

Repository commands and checks remain authoritative. Skills and MCP servers
provide reusable guidance and external integrations, but the Todo application
can build without those integrations being online.

## Devcontainer lifecycle

On creation, `scripts/post-create.sh` prepares the environment, restores the
locked npm dependencies, and validates repository Agent Skills. It then tries
to register remote MCP servers and the local shadcn MCP. MCP failures are
reported as warnings and do not hide failures in required setup.

To reproduce the required portion manually:

```bash
npm ci
scripts/setup-agent-skills.sh
npm run build
npm run lint
```

## Skills

`.agents/skills/` is canonical. The current reusable set includes:

- Stitch: `code-to-design`, `extract-design-md`, `extract-static-html`,
  `generate-design`, `manage-design-system`, and `upload-to-stitch`
- UI: `frontend-design`, `shadcn`, and `web-design-guidelines`
- React: `vercel-react-best-practices`
- Delivery: `github-pages`
- Repository guidance: `todo-ui-development`

Claude compatibility links are generated in `.claude/skills/` by
`scripts/setup-agent-skills.sh`. Codex and OpenCode discover `.agents/skills/`
directly. `.skillshare/` is obsolete and intentionally ignored.

Use the project-installed CLI to inspect or update upstream skills:

```bash
npx --no-install skills list
npx --no-install skills update --project --yes
scripts/setup-agent-skills.sh
```

Review upstream updates before committing them. `skills-lock.json` records
their sources and the reference snapshot used for this setup.

## Remote MCP servers

`configs/mcp-servers.conf` is the repository-owned endpoint list consumed by
the container image's `install-mcps.sh` command.

Google Stitch requires `STITCH_API_KEY`. Supply it as a Codespaces secret or
environment variable; never place the value in `configs/mcp-servers.conf`, an
agent configuration file, or Git history.

Refresh remote registrations with:

```bash
install-mcps.sh
```

Afterward, restart the agent client and verify that it can list Stitch
projects. A missing key should affect Stitch only, not normal development.

## Local shadcn MCP

The shadcn package is already a project dependency. Register its MCP server
with supported clients using:

```bash
scripts/setup-local-mcps.sh
```

The script uses the locked local executable instead of downloading a package
at agent startup. OpenCode reads the equivalent entry from `opencode.json`.

## Updating this setup

- Add remote HTTP/SSE servers to `configs/mcp-servers.conf`.
- Add local stdio servers to a repository setup script and relevant
  repository-owned client config; do not put stdio commands in the remote
  endpoint file.
- Add or edit repository-specific skills in `.agents/skills/`.
- Refresh compatibility links after adding, removing, or renaming a skill.
- Keep secrets and generated per-user agent state out of Git.
