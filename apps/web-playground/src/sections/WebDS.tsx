import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Button, ButtonHighlight, Link, HorizontalTabs, Toggle, Checkbox, Radio, SearchInput, TextInputFluid } from "@statrys/web-ds";

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
      <p style={{ color: "#666", maxWidth: 560 }}>
        <code>iconLeft</code>/<code>iconRight</code> are consumer-supplied <code>ReactNode</code> — no
        re-export layer in <code>@statrys/web-ds</code>. Here it's Lucide's <code>ArrowUpRight</code>,
        matching Figma's own icon. No <code>color</code> prop passed — it inherits the link's current text
        color (default/hover/active/disabled) via SVG's <code>currentColor</code>.
      </p>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {SIZES.map((size) => (
          <Link key={size} size={size} href="#" iconRight={<ArrowUpRight size={16} />}>
            primary link / {size}
          </Link>
        ))}
        <Link href="#" disabled iconRight={<ArrowUpRight size={16} />}>
          disabled
        </Link>
      </div>

      <h2 style={{ fontSize: 16, marginTop: 8 }}>Inverse (dark surface)</h2>
      <div style={{ background: "var(--neutral-8)", padding: 24, borderRadius: "var(--radius-lg)", display: "flex", gap: 24, alignItems: "center" }}>
        {SIZES.map((size) => (
          <Link key={size} size={size} inverse href="#" iconRight={<ArrowUpRight size={16} />}>
            inverse link / {size}
          </Link>
        ))}
        <Link inverse href="#" disabled iconRight={<ArrowUpRight size={16} />}>
          disabled
        </Link>
      </div>
    </div>
  );
}

const TAB_ITEMS = [
  { id: "one", label: "Tab one", badge: 2, icon: <ChevronDown size={16} /> },
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

function ToggleDemo() {
  const [defaultOn, setDefaultOn] = useState(true);
  const [defaultOff, setDefaultOff] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>Toggle</h1>
      <p style={{ color: "#666", maxWidth: 560 }}>
        A switch to change between two states, on and off — an alternative for the checkbox (per Figma's
        usage note on this component). No Hover variant is defined in Figma, so none is implemented here.
      </p>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Toggle selected={defaultOff} onChange={setDefaultOff} aria-label="off by default" />
        <Toggle selected={defaultOn} onChange={setDefaultOn} aria-label="on by default" />
        <Toggle selected={false} disabled aria-label="off, disabled" />
        <Toggle selected={true} disabled aria-label="on, disabled" />
      </div>
    </div>
  );
}

function CheckboxDemo() {
  const [plain, setPlain] = useState(true);
  const [withDesc, setWithDesc] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>Checkbox</h1>
      <p style={{ color: "#666", maxWidth: 560 }}>
        Built on a native <code>input[type=checkbox]</code> for real form/keyboard/screen-reader
        semantics, visually replaced by a styled box.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Checkbox label="Remember me" selected={plain} onChange={setPlain} />
        <Checkbox
          label="Remember me"
          description="Save my login details for next time"
          selected={withDesc}
          onChange={setWithDesc}
        />
        <Checkbox label="Select all" indeterminate selected={indeterminate} onChange={setIndeterminate} size="md" />
        <Checkbox label="Disabled, unchecked" disabled />
        <Checkbox label="Disabled, checked" selected disabled />
      </div>
    </div>
  );
}

function RadioDemo() {
  const [choice, setChoice] = useState("a");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>Radio</h1>
      <p style={{ color: "#666", maxWidth: 560 }}>
        No labeled wrapper was published in Figma for this component (unlike Checkbox) — just the bare
        indicator, built on a native <code>input[type=radio]</code>.
      </p>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {(["a", "b", "c"] as const).map((v) => (
          <label key={v} style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
            <Radio name="demo" value={v} selected={choice === v} onChange={() => setChoice(v)} />
            option {v}
          </label>
        ))}
        <Radio size="md" selected disabled aria-label="disabled, selected" />
        <Radio size="md" selected={false} disabled aria-label="disabled, unselected" />
      </div>
    </div>
  );
}

function SearchInputDemo() {
  const [values, setValues] = useState<Record<string, string>>({ sm: "", md: "Statrys", lg: "" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>Search Input</h1>
      <p style={{ color: "#666", maxWidth: 560 }}>
        "Filled" isn't a discrete prop — it's derived from whether <code>value</code> is non-empty, since a
        real input can be both focused and filled at once, a combination Figma's flat state enum can't
        represent.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 343 }}>
        {(["sm", "md", "lg"] as const).map((size) => (
          <SearchInput
            key={size}
            size={size}
            value={values[size]}
            onChange={(v) => setValues((prev) => ({ ...prev, [size]: v }))}
          />
        ))}
        <SearchInput size="md" value="" onChange={() => {}} disabled />
      </div>
    </div>
  );
}

function TextInputFluidDemo() {
  const [values, setValues] = useState<Record<string, string>>({ sm: "", md: "", lg: "" });
  const [errorValue, setErrorValue] = useState("bad-input");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1>Text Input Fluid</h1>
      <p style={{ color: "#666", maxWidth: 560 }}>
        The label floats to a caption above once focused or filled — computed from focus state and
        whether <code>value</code> is non-empty, not a discrete prop (see{" "}
        <code>packages/web-ds/src/text-input</code>).
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 343 }}>
        {(["sm", "md", "lg"] as const).map((size) => (
          <TextInputFluid
            key={size}
            label="Label"
            placeholder="Placeholder"
            hint="This is a help text to hint user"
            tooltip="Helpful context"
            size={size}
            value={values[size]}
            onChange={(v) => setValues((prev) => ({ ...prev, [size]: v }))}
          />
        ))}
        <TextInputFluid
          label="Email"
          placeholder="you@example.com"
          error="Enter a valid email address"
          value={errorValue}
          onChange={setErrorValue}
        />
        <TextInputFluid label="Country" placeholder="Select a country" dropdown value="" onChange={() => {}} />
        <TextInputFluid label="Disabled field" value="" onChange={() => {}} disabled />
      </div>
    </div>
  );
}

export function WebDS({ item }: { item: string }) {
  if (item === "button") return <ButtonDemo />;
  if (item === "button-highlight") return <ButtonHighlightDemo />;
  if (item === "link") return <LinkDemo />;
  if (item === "horizontal-tabs") return <HorizontalTabsDemo />;
  if (item === "toggle") return <ToggleDemo />;
  if (item === "checkbox") return <CheckboxDemo />;
  if (item === "radio") return <RadioDemo />;
  if (item === "search-input") return <SearchInputDemo />;
  if (item === "text-input-fluid") return <TextInputFluidDemo />;
  return <div>Unknown component: {item}</div>;
}
