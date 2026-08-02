# Versioning

Each package (`@statrys/tokens`, `@statrys/icons`, `@statrys/web-ds`, `@statrys/app-ds`)
is versioned independently with semver:

- **patch** — bug fixes, no visual/API change
- **minor** — new component or token, backward compatible
- **major** — breaking change (removed/renamed token or prop, visual overhaul)

A token or icon change often forces a version bump in both `web-ds` and `app-ds`
since they both depend on Foundation — check both before publishing.

## For consuming projects (Product A, Product B, etc.)

Pin exact/caret versions in the product's `package.json`:

```json
"@statrys/tokens": "^1.2.0",
"@statrys/web-ds": "^1.4.0"
```

Don't install from a Git branch/`main` directly in production — bump deliberately
and test before upgrading.
