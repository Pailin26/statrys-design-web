import { useState } from "react";
import changelogs from "./changelogs.generated.json";
import { TabBar } from "./TabBar";

type ChangelogEntry = { hash: string; date: string; subject: string };
const CHANGELOGS: Record<string, ChangelogEntry[]> = changelogs;

const SECTIONS = ["Examples", "Code", "Usage", "Changelog"] as const;
type Section = (typeof SECTIONS)[number];

export type UseInstead = { label: string; because: string };

export type ComponentPageProps = {
  id: string;
  title: string;
  /** One plain-language sentence: what this component is, no jargon. */
  whatItIs: string;
  /** Plain-language scenarios where this is the right choice — short, concrete, no prop names. */
  whenToUse: string[];
  /** "Reach for X instead when..." — the other component + the plain-language reason. */
  useInstead?: UseInstead[];
  /** Extra tips worth knowing, still in plain language — accessibility notes, common mistakes, etc. */
  goodToKnow?: string[];
  code: string;
  figmaUrl?: string;
  children: React.ReactNode;
};

function UsageHeading({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 15, margin: 0, color: "var(--text-primary)" }}>{children}</h3>;
}

function UsageList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: 15 }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

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

export function ComponentPage({
  id,
  title,
  whatItIs,
  whenToUse,
  useInstead,
  goodToKnow,
  code,
  figmaUrl,
  children,
}: ComponentPageProps) {
  const [section, setSection] = useState<Section>("Examples");
  const entries = CHANGELOGS[id] ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      <TabBar variant="inline" tabs={SECTIONS} active={section} onChange={setSection} />

      {section === "Examples" && children}

      {section === "Code" && <CodeBlock code={code} />}

      {section === "Usage" && (
        <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 28 }}>
          <p style={{ color: "var(--text-primary)", lineHeight: 1.6, fontSize: 17, margin: 0, fontWeight: 500 }}>
            {whatItIs}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <UsageHeading>When to use it</UsageHeading>
            <UsageList items={whenToUse} />
          </div>

          {useInstead && useInstead.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <UsageHeading>Use something else when...</UsageHeading>
              <UsageList
                items={useInstead.map((item) => `Reach for ${item.label} instead — ${item.because}`)}
              />
            </div>
          )}

          {goodToKnow && goodToKnow.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <UsageHeading>Good to know</UsageHeading>
              <UsageList items={goodToKnow} />
            </div>
          )}

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
