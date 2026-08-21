import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// @statrys/web-ds has no build step yet (see docs/contributing.md), so its
// package.json "main" points at a dist/ that doesn't exist. Alias straight to
// source until packages/web-ds gets a real build — swap this for plain
// workspace resolution once it does.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@statrys/web-ds": path.resolve(__dirname, "../../packages/web-ds/src"),
    },
  },
});
