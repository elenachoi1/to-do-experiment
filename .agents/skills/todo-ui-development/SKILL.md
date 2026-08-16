---
name: todo-ui-development
description: Repository-specific guidance for building and reviewing the Momentum Todo React UI, especially responsive work and Google Stitch round trips. Use for changes to the Todo interface, layout, responsive behavior, or Stitch-to-code implementation.
---

# Momentum Todo UI development

Keep the existing React, Vite, TypeScript, Tailwind CSS 4, shadcn/ui, Radix UI,
and Lucide architecture. Preserve task behavior and state while changing the
visual or responsive presentation.

Before responsive or Stitch-driven work, read:

- `TODO_STITCH_RESPONSIVE_WORKFLOW.md`
- `.stitch/DESIGN.md`
- `components.json`

Inspect `src/components/ui/` before adding primitives. Prefer existing shadcn
components and semantic design tokens over one-off controls or raw colors.

For a Stitch round trip:

1. Treat the repository as the source of truth for behavior.
2. Use Stitch as the approved visual and responsive design source.
3. Translate Stitch output into the existing React/shadcn structure; do not
   replace the app with generated HTML.
4. Keep `.stitch/DESIGN.md` and useful non-secret metadata reviewable in Git.
5. Never commit `STITCH_API_KEY` or values copied from agent configuration.

Verify every implementation with separate commands:

```bash
npm run build
npm run lint
```

For responsive work, exercise the affected workflow at phone, tablet, and
desktop sizes. Check reachability, horizontal overflow, overlays, keyboard
focus, and touch targets—not only the initial render.
