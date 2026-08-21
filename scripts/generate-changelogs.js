#!/usr/bin/env node
/**
 * Generates a per-component changelog from git history, consumed by the
 * playground's "Changelog" tab. Regenerated on every dev/build (see
 * package.json's predev/prebuild) rather than committed, so it never goes
 * stale — same spirit as CHANGELOG.md's "generated from commit history,
 * don't hand-edit" convention, just scoped to one component's own path
 * instead of the whole package.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const OUT_FILE = path.join(ROOT, "apps/web-playground/src/changelogs.generated.json");

const COMPONENT_PATHS = {
  button: "packages/web-ds/src/button",
  "button-highlight": "packages/web-ds/src/button-highlight",
  link: "packages/web-ds/src/link",
  "horizontal-tabs": "packages/web-ds/src/tabs",
  toggle: "packages/web-ds/src/toggle",
  checkbox: "packages/web-ds/src/checkbox",
  radio: "packages/web-ds/src/radio",
  "search-input": "packages/web-ds/src/search-input",
  "text-input-fluid": "packages/web-ds/src/text-input",
};

function gitLogFor(relPath) {
  let raw;
  try {
    raw = execFileSync(
      "git",
      ["log", "--follow", "--date=short", "--pretty=format:%h|%ad|%s", "--", relPath],
      { cwd: ROOT, encoding: "utf8" }
    );
  } catch {
    return [];
  }
  return raw
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [hash, date, ...subjectParts] = line.split("|");
      return { hash, date, subject: subjectParts.join("|") };
    });
}

const changelogs = {};
for (const [id, relPath] of Object.entries(COMPONENT_PATHS)) {
  changelogs[id] = gitLogFor(relPath);
}

fs.writeFileSync(OUT_FILE, JSON.stringify(changelogs, null, 2) + "\n");
console.log(`✔︎ wrote ${path.relative(ROOT, OUT_FILE)}`);
