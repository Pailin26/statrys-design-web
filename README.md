# Statrys Design System — Web (`statrys-design-web`)

Web half of the Statrys Design System, split by platform out of the
`statrys-design` monorepo. History for the paths below was preserved across
the split.

```
Foundation          →  @statrys/tokens (separate repo: statrys-tokens)
Core DS (Web)       →  @statrys/web-ds     (React DOM)
Product custom libs →  projects/ here for now, until each is ready to move to its own repo
```

## Packages

| Package | Consumes | Platform |
|---|---|---|
| `@statrys/tokens` | — | color, spacing, radius, typography — lives in [statrys-tokens](https://github.com/Pailin26/statrys-tokens), installed as a git dependency |
| `@statrys/web-ds` | tokens | React DOM — Button, ButtonHighlight, Link, etc |

## Local dev

This repo uses npm workspaces (npm 7+). From the root:
```bash
npm install
npm run dev
```

`npm install` triggers `@statrys/tokens`' own `prepare` script (it's a git
dependency), which builds its `dist/` — no separate `build:tokens` step needed
here anymore.

`apps/web-playground` is a dev-only site for browsing Foundation tokens and
`web-ds` components — not published, not a product prototype (see
`docs/contributing.md` for that boundary).

## Where do product projects live?

**Prototype stage: in this same repo**, under `projects/`, as siblings to `packages/`:

```
statrys-design-web/
├── packages/web-ds/     ← Core DS (web)
└── projects/
    ├── project-a/       ← Custom Component Lib + features, imports @statrys/web-ds
    └── project-b/
```

`projects/*` are wired into the same npm workspaces as `packages/*`, so
`project-a` can `import { Button } from "@statrys/web-ds"` directly — no
publishing to a registry needed while things are moving fast. Once a project
is ready for production, split it out into its own repo and switch it to a
published, versioned `@statrys/*` install instead — see `docs/versioning.md`.

## For AI agents / tooling

Every component has a `manifest.json` next to it (Figma node ID, tokens
consumed, props, platform). Check `packages/web-ds/src/*/manifest.json`
before generating new code, to avoid building something that already exists.

## Docs

- `docs/contributing.md` — component/token conventions (the component-level-token
  rule, headless component pattern, playground vs. product-prototype boundary)
- `docs/versioning.md` — semver policy
- `docs/figma-sync.md` — working notes for the Figma Dev Mode MCP server
