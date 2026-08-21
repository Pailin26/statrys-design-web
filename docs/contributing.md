# Contributing

## Repo boundaries — read this first

- **Foundation** (`packages/tokens`, `packages/icons`) — primitives, no platform logic.
- **Core DS** (`packages/web-ds`, `packages/app-ds`) — shared components, one package
  per platform. Same component *name* and *props shape* should exist on both platforms
  where possible (see `manifest.json`'s `platform` field to tell them apart).
- **Custom Component Lib** — for now, lives under `projects/<name>/src/custom-component-lib/`
  in this same repo (prototype stage, no publishing needed). If a component turns out
  to be needed by two or more projects, that's the signal to promote it into
  `web-ds`/`app-ds` instead of duplicating it. Once a project goes to production, it
  moves to its own repo and switches from a workspace link to an installed
  `@statrys/*` package — see `docs/versioning.md`.

## Adding a new Core DS component

1. Create `packages/web-ds/src/<name>/` and/or `packages/app-ds/src/<name>/`
   (add both if the component exists on both platforms)
2. Add `packages/tokens/semantic/<name>.json` — see "Component-level tokens" below.
   Do this **before** writing the component's styles, not after.
3. Add the component code, following the file split below, and a `manifest.json`
   (include `"platform": "web"` or `"app"`)
4. For web components, also add a `<name>.figma.tsx` Code Connect file
5. Fill in `figmaFileKey` / `figmaNodeId` once published in the Figma library
6. Open a PR

## Component-level tokens — this is the system, not a one-off

Every value a component needs — color, font, radius, padding, whatever — lives
in exactly one place: `packages/tokens/semantic/<component-name>.json`. The
component's own style file (`.module.css` / `.styles.ts`) may reference *only*
that file's tokens — never a primitive directly, and never reaching into
another component's or a shared file's tokens directly either. If a component
needs a shared semantic value (e.g. `text.neutralInverse.primary`), alias it
into the component's own file first (see `button.textOnFill` in
`semantic/button.json` for the pattern) rather than referencing `text.*` from
component code.

This is what makes a token change propagate automatically instead of needing
a per-component code edit:

```
primitive (brand.5, radius.md, fontSize.base, ...)
   ↓ referenced by
semantic/<component>.json   (button.primary, button.radius, button.fontSizeMd, ...)
   ↓ built into
dist/tokens.css (web, keeps units)  +  dist/tokens.js (native, unitless numbers — see below)
   ↓ consumed by
<Component>.module.css / <Component>.styles.ts   — the ONLY place a component references a token
```

Change a primitive's value, or a component's semantic mapping, run
`npm run build:tokens`, rebuild the consuming app — every component using that
token updates. No component code changes, because component code never held
the value in the first place.

`packages/tokens/build/build.js` (not just `build/config.json`) registers two
custom transforms on the native (`js`) platform, so this holds for every
future component without extra work per-component:
- `size/native` — strips `px` and converts to a plain number (`"16px"` → `16`),
  since RN's `StyleSheet` rejects unit strings.
- `fontFamily/native` — takes just the first, unquoted name from a CSS font
  stack (`"GT Walsheim LC", "Helvetica Neue", ...` → `GT Walsheim LC`), since
  RN's `fontFamily` has no fallback-list concept.

RN quirk worth knowing before you wire a new component: `Text` does not
inherit font styles from an ancestor `View`/`Pressable` the way CSS cascades
on web. Keep layout tokens (padding, height) on the container's style and
font tokens (`fontSize`, `fontFamily`, `fontWeight`) on the `Text` itself —
see `Button.styles.ts`'s `container*` vs `text*` split.

Second RN font quirk: unlike CSS, RN can't select a weight *within* one
registered family — `fontFamily: "GT Walsheim LC", fontWeight: "500"` renders
the OS default, silently, no error. Each weight has to be its own registered
family name (`GTWalsheimLC-Medium`, etc.) — never pass a bare token family +
numeric weight straight to a native `Text` style. Use
`nativeFontFamily(family, weight)` from `@statrys/app-ds` to map to the
correct registered name (see `Button.styles.ts`), and register the actual
weight files via `expo-font`'s `useFonts` once, at the app root — see
`apps/app-playground/src/fonts.ts` (uses the `.ttf` build,
`packages/tokens/fonts/GTWalsheimLC-*.ttf` — not the `.woff2` web-playground
uses, since RN has no woff2 decoder on true native). Naming the font isn't
enough on any platform; without loading it, both this alias step and the
underlying `useFonts` call are required, matching how web needs the explicit
`@statrys/tokens/fonts.css` import.

## Component file structure — logic and style stay in separate files

A component's `.tsx` is headless: markup, props, and behavior only — no inline
`style={{...}}`, no `StyleSheet.create` calls, no visual values. All styling lives in
a sibling file. This keeps the component usable if the visual layer gets reskinned,
and keeps `git diff` on a style tweak from touching component logic.

**Web (`web-ds`, and Custom Component Lib components under `projects/*`):**

```
<name>/
├── <Name>.tsx          ← structure + behavior only, imports the CSS module
├── <Name>.module.css   ← all visual styles, one class per variant/size/state
├── <name>.figma.tsx    ← Code Connect (web-ds only)
└── manifest.json
```

```tsx
// Button.tsx
import styles from "./Button.module.css";

<button className={[styles.base, styles[variant], disabled && styles.disabled]
  .filter(Boolean).join(" ")} />
```

**App (`app-ds`, React Native — no CSS, so the equivalent split is a `StyleSheet`
in its own file):**

```
<name>/
├── <Name>.tsx          ← structure + behavior only, imports the stylesheet
├── <Name>.styles.ts    ← StyleSheet.create({...}), exported as `styles`
└── manifest.json
```

Either way, colors/spacing/radii referenced in the style file should come from
`@statrys/tokens` (CSS custom properties on web, the JS token export on native) —
see the PR checklist below.

## Adding or changing a token

1. Primitive values go in `packages/tokens/primitives/`, semantic mappings in
   `packages/tokens/semantic/`
2. Never hand-edit `packages/tokens/dist/` — generated by `npm run build:tokens`
3. Note in the PR which platform(s)/products might be affected

Token **values** are sourced from `apa-statrys/accounting` (`src/styles/tokens/*.css`,
`src/styles/theme.css`, and `src/styles/fonts.css`) — that repo is the source of
truth for what a token should equal; this repo just re-expresses those same
values as primitives + semantic JSON instead of CSS custom properties. That
source is single-theme (no dark mode) today, so semantic tokens here are flat
(`{value, type}`), not the old `{light, dark}` pairing — if/when accounting
adds a dark theme, mirror it in as a second value per token then, not before.
Same for typography's tablet/mobile breakpoint overrides — only the desktop
size is modeled today.

`GT Walsheim LC` is a licensed typeface (Grilli Type) — don't redistribute
these files outside Statrys' own products. Two builds live in
`packages/tokens/fonts/`, for the two platforms' different loading
mechanisms:
- `*.woff2` — copied from accounting's own `public/fonts/`, loaded via
  `packages/tokens/fonts.css` on web.
- `*.ttf` — sourced from Statrys' own GT Walsheim LC license (order_120580),
  since accounting never had a native-compatible build; loaded via
  `expo-font` on native, see the RN font quirk above.

## PR checklist

- [ ] Component logic (`.tsx`) has no inline styles — visuals live in
      `.module.css` (web) or `.styles.ts` (app)
- [ ] No hardcoded hex/px values in component source (use token references)
- [ ] Component style file references only `semantic/<component-name>.json`
      tokens — not a primitive, and not another component's/shared semantic
      file's tokens directly (alias those into the component's own file first)
- [ ] manifest.json filled in, including `platform`
- [ ] If added to only one platform, note whether the other platform needs it too
