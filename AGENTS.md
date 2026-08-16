# Momentum Todo Agent Guide

Use `.agents/skills/todo-ui-development/SKILL.md` for application UI and
responsive changes. Use the repository Stitch skills for code-to-design,
design generation, design-system extraction, and Stitch uploads.

`.agents/skills/` is the canonical repository skill directory. Do not create a
`.skillshare` directory or independent copies under agent-specific folders.
Claude compatibility links are maintained by `scripts/setup-agent-skills.sh`.

Before changing the UI, inspect existing primitives in `src/components/ui/`
and read `TODO_STITCH_RESPONSIVE_WORKFLOW.md`. Preserve application behavior,
use Stitch as a visual source rather than generated application code, and run:

```bash
npm run build
npm run lint
```
