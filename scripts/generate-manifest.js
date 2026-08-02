#!/usr/bin/env node
/**
 * Validates that every component folder in web-ds and app-ds has a
 * manifest.json with the required fields (including platform). Run via
 * `npm run generate:manifests`. Doesn't auto-fill values — description/props/
 * tokens need a human or design review to be accurate.
 */
const fs = require("fs");
const path = require("path");

const PACKAGES_DIR = path.join(__dirname, "..", "packages");
const DS_PACKAGES = ["web-ds", "app-ds"];
const REQUIRED_FIELDS = ["name", "platform", "description", "consumesTokens", "props", "status", "usedBy"];

let problems = 0;
for (const pkgName of DS_PACKAGES) {
  const srcDir = path.join(PACKAGES_DIR, pkgName, "src");
  if (!fs.existsSync(srcDir)) continue;
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const manifestPath = path.join(srcDir, entry.name, "manifest.json");
    if (!fs.existsSync(manifestPath)) {
      console.warn(`Missing manifest.json in packages/${pkgName}/src/${entry.name}`);
      problems++;
      continue;
    }
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    for (const field of REQUIRED_FIELDS) {
      if (!(field in manifest)) {
        console.warn(`packages/${pkgName}/src/${entry.name}/manifest.json missing field: ${field}`);
        problems++;
      }
    }
  }
}

if (problems > 0) {
  console.warn(`\n${problems} problem(s) found.`);
  process.exit(1);
} else {
  console.log("All component manifests look complete.");
}
