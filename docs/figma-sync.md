# Figma Sync Notes

Working notes for keeping this repo and the Figma library in sync via the Dev Mode MCP server.

- Node IDs in tool calls use **colon** format (e.g. `1:234`) — the URL uses a hyphen
  (`1-234`); convert before calling any MCP tool.
- `get_metadata` is the reliable first call to confirm a file is reachable before
  requesting node-specific data.
- `get_variable_defs` only returns variables actually applied to visible layers on the
  target node — it won't surface the full library.
- `get_design_context` is **read-only** — there's no write path back to Figma through it.
- The Figma desktop app must have the target file open and in the foreground for MCP
  calls against that file to succeed.

Token library file: `QWnWWhyZzYYm8hwxyxSlfd` (node `1:3` — Light/Dark semantic mapping root).
