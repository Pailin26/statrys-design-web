import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button, ButtonHighlight, Link, HorizontalTabs } from "@statrys/web-ds";

const VARIANTS = ["primary", "secondary", "tertiary"] as const;
const HIGHLIGHT_VARIANTS = ["primary", "secondary"] as const;
const SIZES = ["sm", "md", "lg"] as const;

function ButtonDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>Button</h1>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {SIZES.map((size) => (
            <Button key={size} variant={variant} size={size}>
              {variant} / {size}
            </Button>
          ))}
          <Button variant={variant} disabled>
            disabled
          </Button>
        </div>
      ))}

      <h2 style={{ fontSize: 16, marginTop: 8 }}>Inverse (dark surface)</h2>
      <div style={{ background: "var(--neutral-8)", padding: 24, borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", gap: 24 }}>
        {VARIANTS.map((variant) => (
          <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {SIZES.map((size) => (
              <Button key={size} variant={variant} size={size} inverse>
                {variant} / {size}
              </Button>
            ))}
            <Button variant={variant} inverse disabled>
              disabled
            </Button>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 16, marginTop: 8 }}>Shape=Rounded</h2>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {SIZES.map((size) => (
            <Button key={size} variant={variant} size={size} shape="rounded">
              {variant} / {size}
            </Button>
          ))}
          <Button variant={variant} shape="rounded" disabled>
            disabled
          </Button>
        </div>
      ))}

      <h2 style={{ fontSize: 16, marginTop: 8 }}>Shape=Square / Circle (icon-only)</h2>
      <p style={{ color: "#666", maxWidth: 560 }}>
        <code>icon</code> is a consumer-supplied <code>ReactNode</code> — no re-export layer in
        <code> @statrys/web-ds</code>. Here it's Lucide's <code>ArrowUpRight</code>, matching Figma's own icon.
      </p>
      {(["square", "circle"] as const).map((shape) => (
        <div key={shape} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h3 style={{ fontSize: 14, margin: 0, textTransform: "capitalize" }}>{shape}</h3>
          {VARIANTS.map((variant) => (
            <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {SIZES.map((size) => (
                <Button
                  key={size}
                  variant={variant}
                  size={size}
                  shape={shape}
                  icon={<ArrowUpRight size={size === "sm" ? 16 : size === "md" ? 20 : 24} />}
                  aria-label={`${variant} ${shape} ${size}`}
                />
              ))}
              <Button
                variant={variant}
                shape={shape}
                icon={<ArrowUpRight size={20} />}
                aria-label={`${variant} ${shape} disabled`}
                disabled
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ButtonHighlightDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>Button Highlight</h1>
      <p style={{ color: "#666", maxWidth: 560 }}>
        Gradient-filled CTA — a distinct component from <code>Button</code>, not a variant of it.
        See <code>packages/web-ds/src/button-highlight</code>.
      </p>
      {HIGHLIGHT_VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {SIZES.map((size) => (
            <ButtonHighlight key={size} variant={variant} size={size}>
              {variant} / {size}
            </ButtonHighlight>
          ))}
          <ButtonHighlight variant={variant} disabled>
            disabled
          </ButtonHighlight>
        </div>
      ))}
    </div>
  );
}

function LinkDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>Link</h1>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {SIZES.map((size) => (
          <Link key={size} size={size} href="#" iconRight="→">
            primary link / {size}
          </Link>
        ))}
        <Link href="#" disabled iconRight="→">
          disabled
        </Link>
      </div>

      <h2 style={{ fontSize: 16, marginTop: 8 }}>Inverse (dark surface)</h2>
      <div style={{ background: "var(--neutral-8)", padding: 24, borderRadius: "var(--radius-lg)", display: "flex", gap: 24, alignItems: "center" }}>
        {SIZES.map((size) => (
          <Link key={size} size={size} inverse href="#" iconRight="→">
            inverse link / {size}
          </Link>
        ))}
        <Link inverse href="#" disabled iconRight="→">
          disabled
        </Link>
      </div>
    </div>
  );
}

const TAB_ITEMS = [
  { id: "one", label: "Tab one", badge: 2 },
  { id: "two", label: "Tab two" },
  { id: "three", label: "Tab three" },
];

function HorizontalTabsDemo() {
  const [mdActive, setMdActive] = useState("one");
  const [lgActive, setLgActive] = useState("three");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <h1>Horizontal Tabs</h1>
      <p style={{ color: "#666", maxWidth: 560 }}>
        Style=Underline only — Style=Button isn't used and isn't implemented. Renders one internal{" "}
        <code>Tab</code> (Figma "TabsBase") per item — <code>Tab</code> isn't exported on its own. See{" "}
        <code>packages/web-ds/src/tabs</code>.
      </p>

      <div>
        <h2 style={{ fontSize: 16, marginTop: 0 }}>size=md</h2>
        <HorizontalTabs items={TAB_ITEMS} activeId={mdActive} onChange={setMdActive} />
      </div>

      <div>
        <h2 style={{ fontSize: 16, marginTop: 0 }}>size=lg</h2>
        <HorizontalTabs items={TAB_ITEMS} activeId={lgActive} onChange={setLgActive} size="lg" />
      </div>
    </div>
  );
}

export function WebDS({ item }: { item: string }) {
  if (item === "button") return <ButtonDemo />;
  if (item === "button-highlight") return <ButtonHighlightDemo />;
  if (item === "link") return <LinkDemo />;
  if (item === "horizontal-tabs") return <HorizontalTabsDemo />;
  return <div>Unknown component: {item}</div>;
}
