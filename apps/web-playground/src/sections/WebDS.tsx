import { Button, ButtonHighlight } from "@statrys/web-ds";

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

export function WebDS({ item }: { item: string }) {
  if (item === "button") return <ButtonDemo />;
  if (item === "button-highlight") return <ButtonHighlightDemo />;
  return <div>Unknown component: {item}</div>;
}
