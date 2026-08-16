# Momentum Todo

A polished desktop-first Todo application built with React, TypeScript,
Tailwind CSS 4, shadcn/ui, Radix UI, and Lucide icons.

## Development

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run build
npm run lint
```

The desktop baseline is intentionally optimized for viewports around 1280px.
Responsive tablet and mobile layouts will be designed through the Stitch
workflow documented in `TODO_STITCH_RESPONSIVE_WORKFLOW.md`.

## Agent tooling

The devcontainer installs repository-owned Agent Skills from `.agents/skills/`
and optionally configures Google Stitch, Dolt, and shadcn MCP servers. See
`docs/agent-tooling.md` for setup, secrets, and maintenance commands. This
project does not use `.skillshare`.
