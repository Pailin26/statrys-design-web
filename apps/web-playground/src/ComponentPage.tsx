import { useState } from "react";
import changelogs from "./changelogs.generated.json";
import { TabBar } from "./TabBar";

type ChangelogEntry = { hash: string; date: string; subject: string };
const CHANGELOGS: Record<string, ChangelogEntry[]> = changelogs;

const SECTIONS = ["Examples", "Code", "Usage", "Changelog"] as const;
type Section = (typeof SECTIONS)[number];

export type ComponentPageProps = {
  id: string;
  title: string;
  usage: string;
  code: string;
  figmaUrl?: string;
  children: React.ReactNode;
};

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="doc-code">
      <button
        className="doc-code-copy"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre style={{ margin: 0, whiteSpace: "pre" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ComponentPage({ id, title, usage, code, figmaUrl, children }: ComponentPageProps) {
  const [section, setSection] = useState<Section>("Examples");
  const entries = CHANGELOGS[id] ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      <TabBar variant="inline" tabs={SECTIONS} active={section} onChange={setSection} />

      {section === "Examples" && children}

      {section === "Code" && <CodeBlock code={code} />}

      {section === "Usage" && (
        <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: 15, margin: 0 }}>{usage}</p>
          {figmaUrl && (
            <p style={{ margin: 0 }}>
              <a href={figmaUrl} target="_blank" rel="noreferrer">
                View in Figma ↗
              </a>
            </p>
          )}
        </div>
      )}

      {section === "Changelog" && (
        <div>
          {entries.length === 0 ? (
            <p style={{ color: "var(--text-secondary)" }}>No commit history found for this component yet.</p>
          ) : (
            <ul className="doc-timeline">
              {entries.map((entry) => (
                <li key={entry.hash} className="doc-timeline-item">
                  <span className="doc-timeline-date">{entry.date}</span>
                  <span className="doc-timeline-subject">{entry.subject}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
