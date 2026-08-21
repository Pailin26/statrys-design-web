import { useState } from "react";
import changelogs from "./changelogs.generated.json";

type ChangelogEntry = { hash: string; date: string; subject: string };
const CHANGELOGS: Record<string, ChangelogEntry[]> = changelogs;

const SECTIONS = ["Usage", "Examples", "Code", "Changelog"] as const;
type Section = (typeof SECTIONS)[number];

export type ComponentPageProps = {
  id: string;
  title: string;
  usage: string;
  code: string;
  figmaUrl?: string;
  children: React.ReactNode;
};

export function ComponentPage({ id, title, usage, code, figmaUrl, children }: ComponentPageProps) {
  const [section, setSection] = useState<Section>("Examples");
  const entries = CHANGELOGS[id] ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--border-neutral-secondary)" }}>
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderBottom: section === s ? "2px solid var(--brand-5)" : "2px solid transparent",
              background: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              color: section === s ? "var(--brand-6)" : "var(--text-secondary)",
              fontFamily: "inherit",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {section === "Usage" && (
        <div style={{ maxWidth: 640 }}>
          <p style={{ color: "#333", lineHeight: 1.5 }}>{usage}</p>
          {figmaUrl && (
            <p style={{ marginTop: 12 }}>
              <a href={figmaUrl} target="_blank" rel="noreferrer">
                View in Figma ↗
              </a>
            </p>
          )}
        </div>
      )}

      {section === "Examples" && children}

      {section === "Code" && (
        <pre
          style={{
            background: "var(--bg-neutral-secondary)",
            padding: 16,
            borderRadius: "var(--radius-md)",
            overflowX: "auto",
            fontSize: 13,
            lineHeight: 1.5,
            maxWidth: 720,
          }}
        >
          <code>{code}</code>
        </pre>
      )}

      {section === "Changelog" && (
        <div style={{ maxWidth: 640 }}>
          {entries.length === 0 ? (
            <p style={{ color: "#666" }}>No commit history found for this component yet.</p>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {entries.map((entry) => (
                <li
                  key={entry.hash}
                  style={{ display: "flex", gap: 12, paddingBottom: 10, borderBottom: "1px solid #eee" }}
                >
                  <span style={{ color: "#999", fontSize: 13, whiteSpace: "nowrap", minWidth: 80 }}>
                    {entry.date}
                  </span>
                  <span style={{ fontSize: 14 }}>{entry.subject}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
