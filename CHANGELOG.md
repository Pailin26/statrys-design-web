# Changelog

Generated from commit history — don't hand-edit entries below this line.
Use conventional commits (`feat:`, `fix:`, `chore:`) so version bumps stay automatic.

---

## 0.1.0 — Split out of the `statrys-design` monorepo
- Extracted from `packages/web-ds`, `apps/web-playground`, `projects/*`; history preserved.
- `@statrys/tokens` switched from a workspace link to a git dependency (statrys-tokens repo).
- `@statrys/icons` dropped from `web-ds`'s declared dependencies — nothing imports it yet.
