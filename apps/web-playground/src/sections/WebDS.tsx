import { Button } from "@statrys/web-ds";

const VARIANTS = ["primary", "secondary", "tertiary"] as const;
const SIZES = ["sm", "md", "lg"] as const;

// `item` selects which component demo to show — only "button" exists today,
// but the sidebar (App.tsx's NAV.web) is already structured to grow.
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
    </div>
  );
}

export function WebDS({ item }: { item: string }) {
  if (item === "button") return <ButtonDemo />;
  return <div>Unknown component: {item}</div>;
}
