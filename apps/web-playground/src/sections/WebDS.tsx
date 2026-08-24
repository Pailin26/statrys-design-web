import { useState, Fragment, type ComponentProps } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Button, ButtonHighlight, Link, HorizontalTabs, Toggle, Checkbox, Radio, SearchInput, TextInputFluid } from "@statrys/web-ds";
import { ComponentPage } from "../ComponentPage";

const FIGMA_FILE = "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=";

const VARIANTS = ["primary", "secondary", "tertiary"] as const;
const HIGHLIGHT_VARIANTS = ["primary", "secondary"] as const;
const SIZES = ["sm", "md", "lg"] as const;

function ButtonDemo() {
  return (
    <ComponentPage
      id="button"
      title="Button"
      usage="Primary interactive button for web product and marketing surfaces. Use variant to set hierarchy (primary/secondary/tertiary), shape for Rec/Rounded/Square/Circle, and inverse on dark surfaces."
      figmaUrl={`${FIGMA_FILE}537-1561`}
      code={`import { Button } from "@statrys/web-ds";\n\n<Button variant="primary" size="md" onClick={handleClick}>\n  Continue\n</Button>\n\n// Icon-only (Shape=Square/Circle) — icon is a consumer-supplied ReactNode\nimport { ArrowUpRight } from "lucide-react";\n\n<Button\n  variant="primary"\n  shape="circle"\n  icon={<ArrowUpRight size={20} />}\n  aria-label="Open"\n/>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
    </ComponentPage>
  );
}

function ButtonHighlightDemo() {
  return (
    <ComponentPage
      id="button-highlight"
      title="Button Highlight"
      usage="Gradient-filled CTA button for high-emphasis marketing surfaces — a distinct component from Button, not a variant of it."
      figmaUrl={`${FIGMA_FILE}1847-8095`}
      code={`import { ButtonHighlight } from "@statrys/web-ds";\n\n<ButtonHighlight variant="primary" size="md" onClick={handleClick}>\n  Get started\n</ButtonHighlight>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
    </ComponentPage>
  );
}

function LinkDemo() {
  return (
    <ComponentPage
      id="link"
      title="Link"
      usage="Text-only navigational link with icon slots — inline anchor styling for body copy and lists, not a variant of Button."
      figmaUrl={`${FIGMA_FILE}2153-6347`}
      code={`import { Link } from "@statrys/web-ds";\nimport { ArrowUpRight } from "lucide-react";\n\n<Link href="/docs" size="md" iconRight={<ArrowUpRight size={16} />}>\n  Learn more\n</Link>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
    </ComponentPage>
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
    <ComponentPage
      id="horizontal-tabs"
      title="Horizontal Tabs"
      usage="Horizontal tab list, Style=Underline only — renders one internal Tab (Figma 'TabsBase') per item; Tab is not exported on its own."
      figmaUrl={`${FIGMA_FILE}2725-16713`}
      code={`import { HorizontalTabs } from "@statrys/web-ds";\n\nconst items = [\n  { id: "one", label: "Tab one", badge: 2 },\n  { id: "two", label: "Tab two" },\n];\n\n<HorizontalTabs items={items} activeId={activeId} onChange={setActiveId} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <h2 style={{ fontSize: 16, marginTop: 0 }}>size=md</h2>
          <HorizontalTabs items={TAB_ITEMS} activeId={mdActive} onChange={setMdActive} />
        </div>

        <div>
          <h2 style={{ fontSize: 16, marginTop: 0 }}>size=lg</h2>
          <HorizontalTabs items={TAB_ITEMS} activeId={lgActive} onChange={setLgActive} size="lg" />
        </div>
      </div>
    </ComponentPage>
  );
}

function ToggleDemo() {
  const [defaultOn, setDefaultOn] = useState(true);
  const [defaultOff, setDefaultOff] = useState(false);

  return (
    <ComponentPage
      id="toggle"
      title="Toggle"
      usage="A switch to change between two states, on and off — an alternative for the checkbox (per Figma's usage note on this component). No Hover variant is defined in Figma, so none is implemented here."
      figmaUrl={`${FIGMA_FILE}3784-2555`}
      code={`import { Toggle } from "@statrys/web-ds";\n\n<Toggle selected={enabled} onChange={setEnabled} aria-label="Enable notifications" />`}
    >
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Toggle selected={defaultOff} onChange={setDefaultOff} aria-label="off by default" />
        <Toggle selected={defaultOn} onChange={setDefaultOn} aria-label="on by default" />
        <Toggle selected={false} disabled aria-label="off, disabled" />
        <Toggle selected={true} disabled aria-label="on, disabled" />
      </div>
    </ComponentPage>
  );
}

function CheckboxDemo() {
  const [plain, setPlain] = useState(true);
  const [withDesc, setWithDesc] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <ComponentPage
      id="checkbox"
      title="Checkbox"
      usage="Checkbox with a label and optional description, built on a native input[type=checkbox] for real form/keyboard/screen-reader semantics, visually replaced by a styled box."
      figmaUrl={`${FIGMA_FILE}3417-179`}
      code={`import { Checkbox } from "@statrys/web-ds";\n\n<Checkbox label="Remember me" selected={checked} onChange={setChecked} />\n\n<Checkbox\n  label="Remember me"\n  description="Save my login details for next time"\n  selected={checked}\n  onChange={setChecked}\n/>`}
    >
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
    </ComponentPage>
  );
}

function RadioDemo() {
  const [choice, setChoice] = useState("a");

  return (
    <ComponentPage
      id="radio"
      title="Radio"
      usage="Radio button built on a native input[type=radio] for real form/keyboard/screen-reader semantics (group via the name prop). No labeled wrapper was published in Figma for this component (unlike Checkbox) — just the bare indicator."
      figmaUrl={`${FIGMA_FILE}3081-4828`}
      code={`import { Radio } from "@statrys/web-ds";\n\n<Radio name="plan" value="monthly" selected={plan === "monthly"} onChange={() => setPlan("monthly")} />\n<Radio name="plan" value="yearly" selected={plan === "yearly"} onChange={() => setPlan("yearly")} />`}
    >
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
    </ComponentPage>
  );
}

function SearchInputDemo() {
  const [values, setValues] = useState<Record<string, string>>({ sm: "", md: "Statrys", lg: "" });

  return (
    <ComponentPage
      id="search-input"
      title="Search Input"
      usage="Search field with a leading search icon and a clear button once filled. Hover/Active are real CSS states; 'Filled' is derived from value being non-empty, not a discrete prop."
      figmaUrl={`${FIGMA_FILE}818-2874`}
      code={`import { SearchInput } from "@statrys/web-ds";\n\n<SearchInput value={query} onChange={setQuery} placeholder="Search" />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 343 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          "Filled" isn't a discrete prop — it's derived from whether <code>value</code> is non-empty, since a
          real input can be both focused and filled at once, a combination Figma's flat state enum can't
          represent.
        </p>
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
    </ComponentPage>
  );
}

const TEXT_INPUT_SIZES = ["sm", "md", "lg"] as const;

// One state per row, one size per column — every meaningful visual variant
// in one grid instead of scattered one-off examples. "Focused" uses
// forceFocus (Showcase-only prop) since real focus can't be shown
// statically; "Filled" and "Focused + filled" show the label already
// floated with/without live focus, since a real input can be both floating
// states from either cause.
type TextInputVariantRow = {
  label: string;
  props: Partial<ComponentProps<typeof TextInputFluid>>;
};

const TEXT_INPUT_VARIANT_ROWS: TextInputVariantRow[] = [
  { label: "Default (empty)", props: {} },
  { label: "Filled", props: { value: "Olivia Rhye" } },
  { label: "Focused (empty)", props: { forceFocus: true } },
  { label: "Focused + filled", props: { forceFocus: true, value: "Olivia Rhye" } },
  { label: "Error", props: { value: "not-an-email", error: "Enter a valid email address" } },
  { label: "Disabled (empty)", props: { disabled: true } },
  { label: "Disabled + filled", props: { disabled: true, value: "Olivia Rhye" } },
];

function TextInputFluidDemo() {
  const [values, setValues] = useState<Record<string, string>>({ sm: "", md: "", lg: "" });
  const [errorValue, setErrorValue] = useState("bad-input");

  return (
    <ComponentPage
      id="text-input-fluid"
      title="Text Input Fluid"
      usage="Text field with a floating label — the label sits as a placeholder-sized prompt until focused or filled, then shrinks to a caption above the real placeholder/value."
      figmaUrl={`${FIGMA_FILE}1085-5372`}
      code={`import { TextInputFluid } from "@statrys/web-ds";\n\n<TextInputFluid\n  label="Email"\n  value={email}\n  onChange={setEmail}\n  placeholder="you@example.com"\n  hint="We'll never share your email"\n/>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 900 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          The label floats to a caption above once focused or filled — computed from focus state and
          whether <code>value</code> is non-empty, not a discrete prop.
        </p>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>All states × sizes</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `140px repeat(${TEXT_INPUT_SIZES.length}, 1fr)`,
              gap: 16,
              alignItems: "start",
            }}
          >
            <div />
            {TEXT_INPUT_SIZES.map((size) => (
              <div key={size} style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#808080" }}>
                {size}
              </div>
            ))}
            {TEXT_INPUT_VARIANT_ROWS.map((row) => (
              <Fragment key={row.label}>
                <div style={{ fontSize: 13, color: "#666", paddingTop: 12 }}>{row.label}</div>
                {TEXT_INPUT_SIZES.map((size) => (
                  <TextInputFluid
                    key={size}
                    label="Label"
                    placeholder="Placeholder"
                    value=""
                    onChange={() => {}}
                    size={size}
                    {...row.props}
                  />
                ))}
              </Fragment>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Interactive (controlled)</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 343 }}>
            {TEXT_INPUT_SIZES.map((size) => (
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
          </div>
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Dropdown</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 343 }}>
            <TextInputFluid label="Country" placeholder="Select a country" dropdown value="" onChange={() => {}} />
            <TextInputFluid label="Country" dropdown value="Hong Kong" onChange={() => {}} />
            <TextInputFluid label="Country" dropdown value="" onChange={() => {}} error="Required" />
            <TextInputFluid label="Country" dropdown value="Hong Kong" onChange={() => {}} disabled />
          </div>
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>With tooltip</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 343 }}>
            <TextInputFluid label="API key" placeholder="sk-..." tooltip="Found in Settings → Developer" value="" onChange={() => {}} />
            <TextInputFluid label="API key" tooltip="Found in Settings → Developer" value="sk-live-abc123" onChange={() => {}} />
          </div>
        </div>
      </div>
    </ComponentPage>
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
