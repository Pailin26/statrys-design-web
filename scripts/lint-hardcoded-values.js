#!/usr/bin/env node
/**
 * Scans every package's src/ folder for hardcoded hex colors or px values
 * that should reference a design token instead. Run via `npm run lint:tokens`.
 */
const fs = require("fs");
const path = require("path");

const PACKAGES_DIR = path.join(__dirname, "..", "packages");
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
const PX_RE = /\b\d+px\b/g;

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(walk(full));
    else if (/\.(tsx?|css)$/.test(entry.name)) results.push(full);
  }
  return results;
}

let violations = 0;
for (const pkg of fs.readdirSync(PACKAGES_DIR, { withFileTypes: true })) {
  if (!pkg.isDirectory()) continue;
  const srcDir = path.join(PACKAGES_DIR, pkg.name, "src");
  for (const file of walk(srcDir)) {
    const content = fs.readFileSync(file, "utf8");
    const hexMatches = content.match(HEX_RE) || [];
    const pxMatches = content.match(PX_RE) || [];
    if (hexMatches.length || pxMatches.length) {
      violations++;
      console.warn(`\n${file}`);
      if (hexMatches.length) console.warn(`  hardcoded colors: ${hexMatches.join(", ")}`);
      if (pxMatches.length) console.warn(`  hardcoded px values: ${pxMatches.join(", ")}`);
    }
  }
}

if (violations > 0) {
  console.warn(`\n${violations} file(s) with hardcoded values — use tokens instead.`);
  process.exit(1);
} else {
  console.log("No hardcoded values found.");
}
