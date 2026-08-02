import { Button } from "@statrys/web-ds";

const VARIANTS = ["primary", "secondary", "ghost"] as const;
const SIZES = ["sm", "md", "lg"] as const;

export function App() {
  return (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>Core DS Playground — Button (web-ds)</h1>
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
