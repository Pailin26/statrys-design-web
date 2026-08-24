import { useState, Fragment } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Button, ButtonHighlight, Link, HorizontalTabs, Toggle, Checkbox, Radio, SearchInput, TextInputFluid, Tooltip, Banner, ToastMessage, XClose, Overlay, Modal } from "@statrys/web-ds";
import { ComponentPage } from "../ComponentPage";

const FIGMA_FILE = "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=";

// One state per row, one axis value (usually size) per column — every
// meaningful visual variant in one table instead of scattered one-off
// examples. Shared by every component demo below.
function VariantGrid<Col extends string>({
  columns,
  rows,
  columnLabelWidth = 160,
  showColumnHeaders = true,
}: {
  columns: readonly Col[];
  rows: { label: string; render: (column: Col) => React.ReactNode }[];
  columnLabelWidth?: number;
  /** Off for a single-column table where the column value isn't a real axis
   *  (e.g. an icon-slots list) — a header would just repeat the row labels' meaning. */
  showColumnHeaders?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${columnLabelWidth}px repeat(${columns.length}, 1fr)`,
        gap: 16,
        alignItems: "center",
      }}
    >
      {showColumnHeaders && (
        <>
          <div />
          {columns.map((column) => (
            <div key={column} style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#808080" }}>
              {column}
            </div>
          ))}
        </>
      )}
      {rows.map((row) => (
        <Fragment key={row.label}>
          <div style={{ fontSize: 13, color: "#666" }}>{row.label}</div>
          {columns.map((column) => (
            <div key={column}>{row.render(column)}</div>
          ))}
        </Fragment>
      ))}
    </div>
  );
}

// Shared by every "Interactive" demo section below: a small-caps label over
// a group of controls (so a panel mixing free text with layout toggles reads
// as two groups, not one flat list), a plain editable text field/textarea,
// and a labeled Radio group (dogfoods the DS's own Radio for a real
// multi-choice control instead of a raw <select>).
function ControlGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color: "#999",
        borderBottom: "1px solid #eee",
        paddingBottom: 6,
      }}
    >
      {children}
    </div>
  );
}

function DemoField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const fieldStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 400,
    color: "#1b1b1b",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #ddd",
    boxSizing: "border-box",
  };

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, fontWeight: 600, color: "#444" }}>
      {label}
      {multiline ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} style={{ ...fieldStyle, resize: "vertical" }} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={fieldStyle} />
      )}
    </label>
  );
}

function DemoRadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {options.map((option) => (
          <label
            key={option}
            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#1b1b1b", cursor: "pointer", textTransform: "capitalize" }}
          >
            <Radio name={label} value={option} selected={value === option} onChange={() => onChange(option)} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

const VARIANTS = ["primary", "secondary", "tertiary"] as const;
const HIGHLIGHT_VARIANTS = ["primary", "secondary"] as const;
const SIZES = ["sm", "md", "lg"] as const;

function ButtonDemo() {
  const [label, setLabel] = useState("Continue");
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>("primary");
  const [size, setSize] = useState<(typeof SIZES)[number]>("md");
  const [shape, setShape] = useState<"rec" | "rounded">("rec");
  const [disabled, setDisabled] = useState(false);
  const [inverse, setInverse] = useState(false);

  return (
    <ComponentPage
      id="button"
      title="Button"
      usage="Primary interactive button for web product and marketing surfaces. Use variant to set hierarchy (primary/secondary/tertiary), shape for Rec/Rounded/Square/Circle, and inverse on dark surfaces."
      figmaUrl={`${FIGMA_FILE}537-1561`}
      code={`import { Button } from "@statrys/web-ds";\n\n<Button variant="primary" size="md" onClick={handleClick}>\n  Continue\n</Button>\n\n// Icon-only (Shape=Square/Circle) — icon is a consumer-supplied ReactNode\nimport { ArrowUpRight } from "lucide-react";\n\n<Button\n  variant="primary"\n  shape="circle"\n  icon={<ArrowUpRight size={20} />}\n  aria-label="Open"\n/>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div
              style={{
                flex: "1 1 400px",
                minHeight: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: inverse ? "var(--neutral-8)" : "#f2f2f2",
                borderRadius: 8,
              }}
            >
              <Button variant={variant} size={size} shape={shape} disabled={disabled} inverse={inverse}>
                {label}
              </Button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Text</ControlGroupLabel>
                <DemoField label="Label" value={label} onChange={setLabel} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
                <DemoRadioGroup label="Size" options={SIZES} value={size} onChange={setSize} />
                <DemoRadioGroup label="Shape" options={["rec", "rounded"] as const} value={shape} onChange={setShape} />
                <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
                <Checkbox label="Inverse (dark surface)" selected={inverse} onChange={setInverse} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 16, margin: "0 0 12px" }}>Shape=Square / Circle (icon-only)</h2>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            <code>icon</code> is a consumer-supplied <code>ReactNode</code> — no re-export layer in
            <code> @statrys/web-ds</code>. Here it's Lucide's <code>ArrowUpRight</code>, matching Figma's own icon.
          </p>
          {(["square", "circle"] as const).map((shape) => (
            <div key={shape} style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 14, margin: "0 0 12px", textTransform: "capitalize" }}>{shape}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {VARIANTS.map((variant) => (
                  <VariantGrid
                    key={variant}
                    columns={SIZES}
                    rows={[
                      {
                        label: "Default",
                        render: (size) => (
                          <Button
                            variant={variant}
                            size={size}
                            shape={shape}
                            icon={<ArrowUpRight size={size === "sm" ? 16 : size === "md" ? 20 : 24} />}
                            aria-label={`${variant} ${shape} ${size}`}
                          />
                        ),
                      },
                      {
                        label: "Disabled",
                        render: (size) => (
                          <Button
                            variant={variant}
                            size={size}
                            shape={shape}
                            icon={<ArrowUpRight size={size === "sm" ? 16 : size === "md" ? 20 : 24} />}
                            aria-label={`${variant} ${shape} ${size} disabled`}
                            disabled
                          />
                        ),
                      },
                    ]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ComponentPage>
  );
}

function ButtonHighlightDemo() {
  const [label, setLabel] = useState("Get started");
  const [variant, setVariant] = useState<(typeof HIGHLIGHT_VARIANTS)[number]>("primary");
  const [size, setSize] = useState<(typeof SIZES)[number]>("md");
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentPage
      id="button-highlight"
      title="Button Highlight"
      usage="Gradient-filled CTA button for high-emphasis marketing surfaces — a distinct component from Button, not a variant of it."
      figmaUrl={`${FIGMA_FILE}1847-8095`}
      code={`import { ButtonHighlight } from "@statrys/web-ds";\n\n<ButtonHighlight variant="primary" size="md" onClick={handleClick}>\n  Get started\n</ButtonHighlight>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 400px", minHeight: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f2f2", borderRadius: 8 }}>
              <ButtonHighlight variant={variant} size={size} disabled={disabled}>
                {label}
              </ButtonHighlight>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Text</ControlGroupLabel>
                <DemoField label="Label" value={label} onChange={setLabel} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Variant" options={HIGHLIGHT_VARIANTS} value={variant} onChange={setVariant} />
                <DemoRadioGroup label="Size" options={SIZES} value={size} onChange={setSize} />
                <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 16, margin: "0 0 12px" }}>Icon slots</h2>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            <code>iconLeft</code>/<code>iconRight</code> are consumer-supplied <code>ReactNode</code>s.
          </p>
          <VariantGrid
            columns={HIGHLIGHT_VARIANTS}
            rows={[
              { label: "iconLeft", render: (variant) => <ButtonHighlight variant={variant} iconLeft={<ArrowUpRight size={16} />}>Label</ButtonHighlight> },
              { label: "iconRight", render: (variant) => <ButtonHighlight variant={variant} iconRight={<ArrowUpRight size={16} />}>Label</ButtonHighlight> },
              {
                label: "Both",
                render: (variant) => (
                  <ButtonHighlight variant={variant} iconLeft={<ArrowUpRight size={16} />} iconRight={<ArrowUpRight size={16} />}>
                    Label
                  </ButtonHighlight>
                ),
              },
            ]}
          />
        </div>
      </div>
    </ComponentPage>
  );
}

function LinkDemo() {
  const [label, setLabel] = useState("Learn more");
  const [size, setSize] = useState<(typeof SIZES)[number]>("md");
  const [disabled, setDisabled] = useState(false);
  const [inverse, setInverse] = useState(false);

  return (
    <ComponentPage
      id="link"
      title="Link"
      usage="Text-only navigational link with icon slots — inline anchor styling for body copy and lists, not a variant of Button."
      figmaUrl={`${FIGMA_FILE}2153-6347`}
      code={`import { Link } from "@statrys/web-ds";\nimport { ArrowUpRight } from "lucide-react";\n\n<Link href="/docs" size="md" iconRight={<ArrowUpRight size={16} />}>\n  Learn more\n</Link>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          <code>iconLeft</code>/<code>iconRight</code> are consumer-supplied <code>ReactNode</code> — no
          re-export layer in <code>@statrys/web-ds</code>. Here it's Lucide's <code>ArrowUpRight</code>,
          matching Figma's own icon. No <code>color</code> prop passed — it inherits the link's current text
          color (default/hover/active/disabled) via SVG's <code>currentColor</code>.
        </p>

        <div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div
              style={{
                flex: "1 1 400px",
                minHeight: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: inverse ? "var(--neutral-8)" : "#f2f2f2",
                borderRadius: 8,
              }}
            >
              <Link size={size} href="#" disabled={disabled} inverse={inverse} iconRight={<ArrowUpRight size={16} />}>
                {label}
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Text</ControlGroupLabel>
                <DemoField label="Label" value={label} onChange={setLabel} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Size" options={SIZES} value={size} onChange={setSize} />
                <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
                <Checkbox label="Inverse (dark surface)" selected={inverse} onChange={setInverse} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 16, margin: "0 0 12px" }}>Icon slots</h2>
          <VariantGrid
            columns={["value"] as const}
            showColumnHeaders={false}
            rows={[
              { label: "iconLeft", render: () => <Link href="#" iconLeft={<ArrowUpRight size={16} />}>Label</Link> },
              { label: "iconRight", render: () => <Link href="#" iconRight={<ArrowUpRight size={16} />}>Label</Link> },
              { label: "Both", render: () => <Link href="#" iconLeft={<ArrowUpRight size={16} />} iconRight={<ArrowUpRight size={16} />}>Label</Link> },
              { label: "No icon", render: () => <Link href="#">Label</Link> },
            ]}
          />
        </div>
      </div>
    </ComponentPage>
  );
}

const HORIZONTAL_TABS_SIZES = ["md", "lg"] as const;

function HorizontalTabsDemo() {
  const [label1, setLabel1] = useState("Tab one");
  const [label2, setLabel2] = useState("Tab two");
  const [label3, setLabel3] = useState("Tab three");
  const [withIconBadge, setWithIconBadge] = useState(true);
  const [size, setSize] = useState<(typeof HORIZONTAL_TABS_SIZES)[number]>("md");
  const [activeId, setActiveId] = useState("one");

  const items = [
    { id: "one", label: label1, ...(withIconBadge ? { badge: 2, icon: <ChevronDown size={16} /> } : {}) },
    { id: "two", label: label2 },
    { id: "three", label: label3 },
  ];

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
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 400px", minHeight: 120, display: "flex", alignItems: "center", background: "#f2f2f2", borderRadius: 8, padding: "0 24px" }}>
              <HorizontalTabs items={items} activeId={activeId} onChange={setActiveId} size={size} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Text</ControlGroupLabel>
                <DemoField label="Tab one" value={label1} onChange={setLabel1} />
                <DemoField label="Tab two" value={label2} onChange={setLabel2} />
                <DemoField label="Tab three" value={label3} onChange={setLabel3} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Size" options={HORIZONTAL_TABS_SIZES} value={size} onChange={setSize} />
                <Checkbox label="Icon + badge on first tab" selected={withIconBadge} onChange={setWithIconBadge} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

function ToggleDemo() {
  const [selected, setSelected] = useState(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentPage
      id="toggle"
      title="Toggle"
      usage="A switch to change between two states, on and off — an alternative for the checkbox (per Figma's usage note on this component). No Hover variant is defined in Figma, so none is implemented here."
      figmaUrl={`${FIGMA_FILE}3784-2555`}
      code={`import { Toggle } from "@statrys/web-ds";\n\n<Toggle selected={enabled} onChange={setEnabled} aria-label="Enable notifications" />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            No text prop on Toggle — click it directly (when not disabled), or drive it from the
            "Selected" control below to see the disabled+on / disabled+off states.
          </p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 400px", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f2f2", borderRadius: 8 }}>
              <Toggle
                selected={selected}
                onChange={disabled ? () => {} : setSelected}
                disabled={disabled}
                aria-label="Toggle demo"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <Checkbox label="Selected" selected={selected} onChange={setSelected} />
                <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

const CHECKBOX_SIZES = ["sm", "md"] as const;

function CheckboxDemo() {
  const [label, setLabel] = useState("Remember me");
  const [description, setDescription] = useState("Save my login details for next time");
  const [showDescription, setShowDescription] = useState(false);
  const [size, setSize] = useState<(typeof CHECKBOX_SIZES)[number]>("md");
  const [selected, setSelected] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentPage
      id="checkbox"
      title="Checkbox"
      usage="Checkbox with a label and optional description, built on a native input[type=checkbox] for real form/keyboard/screen-reader semantics, visually replaced by a styled box."
      figmaUrl={`${FIGMA_FILE}3417-179`}
      code={`import { Checkbox } from "@statrys/web-ds";\n\n<Checkbox label="Remember me" selected={checked} onChange={setChecked} />\n\n<Checkbox\n  label="Remember me"\n  description="Save my login details for next time"\n  selected={checked}\n  onChange={setChecked}\n/>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 400px", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f2f2", borderRadius: 8, padding: 24 }}>
              <Checkbox
                label={label}
                description={showDescription ? description : undefined}
                size={size}
                selected={selected}
                indeterminate={indeterminate}
                disabled={disabled}
                onChange={setSelected}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Text</ControlGroupLabel>
                <DemoField label="Label" value={label} onChange={setLabel} />
                {showDescription && <DemoField label="Description" value={description} onChange={setDescription} />}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Size" options={CHECKBOX_SIZES} value={size} onChange={setSize} />
                <Checkbox label="Description" selected={showDescription} onChange={setShowDescription} />
                <Checkbox label="Selected" selected={selected} onChange={setSelected} />
                <Checkbox label="Indeterminate" selected={indeterminate} onChange={setIndeterminate} />
                <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

const RADIO_SIZES = ["sm", "md"] as const;

function RadioDemo() {
  const [choice, setChoice] = useState("a");
  const [size, setSize] = useState<(typeof RADIO_SIZES)[number]>("md");
  const [selected, setSelected] = useState(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentPage
      id="radio"
      title="Radio"
      usage="Radio button built on a native input[type=radio] for real form/keyboard/screen-reader semantics (group via the name prop). No labeled wrapper was published in Figma for this component (unlike Checkbox) — just the bare indicator."
      figmaUrl={`${FIGMA_FILE}3081-4828`}
      code={`import { Radio } from "@statrys/web-ds";\n\n<Radio name="plan" value="monthly" selected={plan === "monthly"} onChange={() => setPlan("monthly")} />\n<Radio name="plan" value="yearly" selected={plan === "yearly"} onChange={() => setPlan("yearly")} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            No labeled wrapper, so no text to edit here — just the bare indicator's Layout props.
          </p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 400px", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f2f2", borderRadius: 8 }}>
              <Radio
                size={size}
                selected={selected}
                disabled={disabled}
                onChange={disabled ? () => {} : () => setSelected(true)}
                aria-label="Radio demo"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Size" options={RADIO_SIZES} value={size} onChange={setSize} />
                <Checkbox label="Selected" selected={selected} onChange={setSelected} />
                <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Interactive group</h3>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {(["a", "b", "c"] as const).map((v) => (
              <label key={v} style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
                <Radio name="demo" value={v} selected={choice === v} onChange={() => setChoice(v)} />
                option {v}
              </label>
            ))}
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

const SEARCH_INPUT_SIZES = ["sm", "md", "lg"] as const;

function SearchInputDemo() {
  const [value, setValue] = useState("Statrys");
  const [placeholder, setPlaceholder] = useState("Search");
  const [size, setSize] = useState<(typeof SEARCH_INPUT_SIZES)[number]>("md");
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentPage
      id="search-input"
      title="Search Input"
      usage="Search field with a leading search icon and a clear button once filled. Hover/Active are real CSS states; 'Filled' is derived from value being non-empty, not a discrete prop."
      figmaUrl={`${FIGMA_FILE}818-2874`}
      code={`import { SearchInput } from "@statrys/web-ds";\n\n<SearchInput value={query} onChange={setQuery} placeholder="Search" />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 900 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          "Filled" isn't a discrete prop — it's derived from whether <code>value</code> is non-empty, since a
          real input can be both focused and filled at once, a combination Figma's flat state enum can't
          represent. Hover/focus are real CSS pseudo-classes on the container (by design, matching
          Button/Link/Tab) — try it live below, including typing into the field itself.
        </p>

        <div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 400px", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f2f2", borderRadius: 8, padding: 24 }}>
              <div style={{ width: "100%", maxWidth: 343 }}>
                <SearchInput size={size} value={value} placeholder={placeholder} disabled={disabled} onChange={setValue} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Text</ControlGroupLabel>
                <DemoField label="Value" value={value} onChange={setValue} />
                <DemoField label="Placeholder" value={placeholder} onChange={setPlaceholder} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Size" options={SEARCH_INPUT_SIZES} value={size} onChange={setSize} />
                <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

const TEXT_INPUT_SIZES = ["sm", "md", "lg"] as const;

function TextInputFluidDemo() {
  const [label, setLabel] = useState("Label");
  const [placeholder, setPlaceholder] = useState("Placeholder");
  const [value, setValue] = useState("");
  const [hint, setHint] = useState("This is a help text to hint user");
  const [error, setError] = useState("Enter a valid email address");
  const [tooltipText, setTooltipText] = useState("Helpful context");
  const [size, setSize] = useState<(typeof TEXT_INPUT_SIZES)[number]>("md");
  const [disabled, setDisabled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [forceFocus, setForceFocus] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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
          whether <code>value</code> is non-empty, not a discrete prop. "Force focus" below stands in
          for real focus, since a static page can't otherwise show that state without clicking in.
        </p>

        <div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 400px", minHeight: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f2f2", borderRadius: 8, padding: 24 }}>
              <div style={{ width: "100%", maxWidth: 343 }}>
                <TextInputFluid
                  label={label}
                  placeholder={placeholder}
                  value={value}
                  onChange={setValue}
                  size={size}
                  disabled={disabled}
                  dropdown={dropdown}
                  forceFocus={forceFocus}
                  tooltip={showTooltip ? tooltipText : undefined}
                  hint={showError ? undefined : showHint ? hint : undefined}
                  error={showError ? error : undefined}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Text</ControlGroupLabel>
                <DemoField label="Label" value={label} onChange={setLabel} />
                <DemoField label="Placeholder" value={placeholder} onChange={setPlaceholder} />
                <DemoField label="Value" value={value} onChange={setValue} />
                {showTooltip && <DemoField label="Tooltip" value={tooltipText} onChange={setTooltipText} />}
                {showError ? (
                  <DemoField label="Error" value={error} onChange={setError} />
                ) : (
                  showHint && <DemoField label="Hint" value={hint} onChange={setHint} />
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Size" options={TEXT_INPUT_SIZES} value={size} onChange={setSize} />
                <Checkbox label="Dropdown" selected={dropdown} onChange={setDropdown} />
                <Checkbox label="Force focus" selected={forceFocus} onChange={setForceFocus} />
                <Checkbox label="Tooltip" selected={showTooltip} onChange={setShowTooltip} />
                <Checkbox label="Hint" selected={showHint} onChange={setShowHint} />
                <Checkbox label="Error" selected={showError} onChange={setShowError} />
                <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

const TOOLTIP_ARROWS = ["none", "top", "bottom", "bottom-left", "bottom-right", "left", "right"] as const;

function TooltipDemo() {
  const [title, setTitle] = useState("This is a tooltip");
  const [description, setDescription] = useState(
    "Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element."
  );
  const [showDescription, setShowDescription] = useState(false);
  const [arrow, setArrow] = useState<(typeof TOOLTIP_ARROWS)[number]>("bottom");
  const [inverse, setInverse] = useState(false);

  return (
    <ComponentPage
      id="tooltip"
      title="Tooltip"
      usage="Static tooltip bubble — title, optional supporting text, and an optional arrow pointing at the anchoring element. No open/close or positioning logic of its own; placing it next to the target (hover/focus trigger, floating-ui/popper, etc.) is the caller's job."
      figmaUrl={`${FIGMA_FILE}2432-14400`}
      code={`import { Tooltip } from "@statrys/web-ds";\n\n<Tooltip title="This is a tooltip" arrow="bottom" />\n\n<Tooltip\n  title="This is a tooltip"\n  description="Tooltips are used to describe or identify an element."\n  arrow="top"\n  inverse\n/>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          <code>arrow</code> picks both which side the arrow renders on and which way it points — the
          bubble reflows around it (row layout for left/right, column for top/bottom). <code>bottom-left</code>/
          <code>bottom-right</code> additionally shift the arrow toward that corner instead of centering it.
        </p>

        <div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 400px", minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f2f2", borderRadius: 8 }}>
              <Tooltip title={title} description={showDescription ? description : undefined} arrow={arrow} inverse={inverse} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Text</ControlGroupLabel>
                <DemoField label="Title" value={title} onChange={setTitle} />
                {showDescription && <DemoField label="Description" value={description} onChange={setDescription} multiline />}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Arrow" options={TOOLTIP_ARROWS} value={arrow} onChange={setArrow} />
                <Checkbox label="Description" selected={showDescription} onChange={setShowDescription} />
                <Checkbox label="Inverse (dark bubble)" selected={inverse} onChange={setInverse} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

const BANNER_COLORS = ["success", "warning", "error", "info"] as const;
const BANNER_TEXT = "Your information is secure and encrypted";

function BannerDemo() {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const [title, setTitle] = useState("Title");
  const [text, setText] = useState(BANNER_TEXT);
  const [linkLabel, setLinkLabel] = useState("View Details");
  const [showTitle, setShowTitle] = useState(false);
  const [showLink, setShowLink] = useState(true);
  const [showDismiss, setShowDismiss] = useState(true);
  const [color, setColor] = useState<(typeof BANNER_COLORS)[number]>("success");
  const [fullWidth, setFullWidth] = useState(false);

  return (
    <ComponentPage
      id="banner"
      title="Banner"
      usage="Inline notification bar — icon + text (optional title) + optional link + optional dismiss, in 4 semantic colors. No auto-dismiss timer or positioning of its own; the caller owns whether/where it's mounted."
      figmaUrl={`${FIGMA_FILE}3443-2895`}
      code={`import { Banner } from "@statrys/web-ds";\n\n<Banner\n  color="success"\n  text="Your information is secure and encrypted"\n  onLinkClick={() => {}}\n  onDismiss={() => setShow(false)}\n/>\n\n<Banner color="warning" title="Title" text="..." fullWidth />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 900 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          <code>title</code> is what switches between Figma's "Text only" and "Title + Text" — not a
          separate discrete prop. <code>onLinkClick</code>/<code>onDismiss</code> each show their own
          element only when provided, so an unused affordance is never rendered disabled.
        </p>

        <div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 400px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f2f2", borderRadius: 8, padding: fullWidth ? 0 : 24 }}>
              <div style={{ width: "100%" }}>
                <Banner
                  color={color}
                  title={showTitle ? title : undefined}
                  text={text}
                  fullWidth={fullWidth}
                  linkLabel={linkLabel}
                  onLinkClick={showLink ? () => {} : undefined}
                  onDismiss={showDismiss ? () => {} : undefined}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Text</ControlGroupLabel>
                {showTitle && <DemoField label="Title" value={title} onChange={setTitle} />}
                <DemoField label="Text" value={text} onChange={setText} multiline />
                {showLink && <DemoField label="Link label" value={linkLabel} onChange={setLinkLabel} />}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Color" options={BANNER_COLORS} value={color} onChange={setColor} />
                <Checkbox label="Title" selected={showTitle} onChange={setShowTitle} />
                <Checkbox label="Link" selected={showLink} onChange={setShowLink} />
                <Checkbox label="Dismiss" selected={showDismiss} onChange={setShowDismiss} />
                <Checkbox label="Full width (page-level bar)" selected={fullWidth} onChange={setFullWidth} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Interactive dismiss</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 343 }}>
            {BANNER_COLORS.filter((color) => !dismissed[color]).map((color) => (
              <Banner
                key={color}
                color={color}
                text={BANNER_TEXT}
                onDismiss={() => setDismissed((prev) => ({ ...prev, [color]: true }))}
              />
            ))}
            {BANNER_COLORS.every((color) => dismissed[color]) && (
              <p style={{ color: "#666" }}>
                All dismissed —{" "}
                <button
                  type="button"
                  style={{ border: "none", background: "none", color: "#1b1b1b", textDecoration: "underline", cursor: "pointer", padding: 0 }}
                  onClick={() => setDismissed({})}
                >
                  reset
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

const TOAST_VARIANTS = ["default", "success", "error", "warning"] as const;

function ToastMessageDemo() {
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(TOAST_VARIANTS.map((v) => [v, true]))
  );
  const [title, setTitle] = useState("Invoice sent");
  const [subtitle, setSubtitle] = useState("Marked as sent");
  const [actionLabel, setActionLabel] = useState("View Details");
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [showAction, setShowAction] = useState(true);
  const [variant, setVariant] = useState<(typeof TOAST_VARIANTS)[number]>("success");

  return (
    <ComponentPage
      id="toast-message"
      title="Toast Message"
      usage="Dark-surface notification card — optional filled status icon, title + optional subtitle, an optional trailing link, and a close button. Purely presentational; no positioning, auto-hide timer, or animation of its own — mount it inside whatever timed/positioned wrapper the app uses."
      figmaUrl={`${FIGMA_FILE}215-4052`}
      code={`import { ToastMessage } from "@statrys/web-ds";\n\n<ToastMessage\n  variant="success"\n  title="Invoice sent"\n  subtitle="Marked as sent"\n  action={{ label: "View Details", onClick: openInvoice }}\n  onClose={() => setShow(false)}\n/>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 900 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          <code>subtitle</code> and <code>action</code> each render only when passed — Figma's
          "showSubtitle" toggle and the link row aren't separate discrete flags here.
        </p>

        <div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 400px", minHeight: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f2f2", borderRadius: 8, padding: 24 }}>
              <div style={{ width: "100%", maxWidth: 356 }}>
                <ToastMessage
                  variant={variant}
                  title={title}
                  subtitle={showSubtitle ? subtitle : undefined}
                  action={showAction ? { label: actionLabel, onClick: () => {} } : undefined}
                  onClose={() => {}}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Text</ControlGroupLabel>
                <DemoField label="Title" value={title} onChange={setTitle} />
                {showSubtitle && <DemoField label="Subtitle" value={subtitle} onChange={setSubtitle} />}
                {showAction && <DemoField label="Action label" value={actionLabel} onChange={setActionLabel} />}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Variant" options={TOAST_VARIANTS} value={variant} onChange={setVariant} />
                <Checkbox label="Subtitle" selected={showSubtitle} onChange={setShowSubtitle} />
                <Checkbox label="Action link" selected={showAction} onChange={setShowAction} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Interactive dismiss</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 356 }}>
            {TOAST_VARIANTS.filter((v) => visible[v]).map((variant) => (
              <ToastMessage
                key={variant}
                variant={variant}
                title="Title"
                subtitle="Subtitle"
                onClose={() => setVisible((prev) => ({ ...prev, [variant]: false }))}
              />
            ))}
            {TOAST_VARIANTS.every((v) => !visible[v]) && (
              <p style={{ color: "#666" }}>
                All dismissed —{" "}
                <button
                  type="button"
                  style={{ border: "none", background: "none", color: "#1b1b1b", textDecoration: "underline", cursor: "pointer", padding: 0 }}
                  onClick={() => setVisible(Object.fromEntries(TOAST_VARIANTS.map((v) => [v, true])))}
                >
                  reset
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

const XCLOSE_SIZES = ["sm", "md"] as const;

function XCloseDemo() {
  const [size, setSize] = useState<(typeof XCLOSE_SIZES)[number]>("md");
  const [inverse, setInverse] = useState(false);

  return (
    <ComponentPage
      id="x-close"
      title="X Close"
      usage="Small square icon-only close/dismiss button. Hover is a real CSS background tint, not a discrete prop — try it live below."
      figmaUrl={`${FIGMA_FILE}1646-164`}
      code={`import { XClose } from "@statrys/web-ds";\n\n<XClose size="sm" onClick={() => setOpen(false)} aria-label="Dismiss" />\n\n// On a dark surface (e.g. inside ToastMessage)\n<XClose size="sm" inverse onClick={() => setOpen(false)} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>No text prop — just size and surface. Hover it to see the real background tint.</p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div
              style={{
                flex: "1 1 400px",
                minHeight: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: inverse ? "var(--bg-neutral-inverse-primary)" : "#f2f2f2",
                borderRadius: 8,
              }}
            >
              <XClose size={size} inverse={inverse} onClick={() => {}} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <DemoRadioGroup label="Size" options={XCLOSE_SIZES} value={size} onChange={setSize} />
                <Checkbox label="Inverse (dark surface)" selected={inverse} onChange={setInverse} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

function OverlayDemo() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ComponentPage
      id="overlay"
      title="Overlay"
      usage="Full-bleed dark scrim mounted behind a Modal (or any other floating surface). Fades itself in on mount; no portal, positioning relative to a target, or exit animation of its own — mount/unmount it as a sibling of whatever it's dimming. Layering with Modal is automatic: Overlay sits at z-index 300, Modal at 400, so a Modal mounted alongside it always renders on top regardless of DOM order — mount Overlay first anyway, since it reads as the backdrop semantically."
      figmaUrl={`${FIGMA_FILE}1510-8634`}
      code={`import { Overlay, Modal } from "@statrys/web-ds";\n\n// Siblings, not nested — Overlay (z-index 300) is the dimmed backdrop,\n// Modal (z-index 400) always renders on top of it.\n{open && (\n  <>\n    <Overlay onClick={() => setOpen(false)} />\n    <Modal>\n      <Modal.Header title="Title" onClose={() => setOpen(false)} />\n      <Modal.Footer primaryLabel="Confirm" onPrimary={() => setOpen(false)} />\n    </Modal>\n  </>\n)}`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <h3 style={{ margin: "0 0 12px" }}>On its own</h3>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            Renders <code>position: fixed; inset: 0</code> at <code>z-index: var(--overlay-z-index)</code>{" "}
            (300) — contained to the box below via a CSS containing-block trick (<code>contain</code> on
            the box) for this preview only; real usage mounts it at the app root, covering the whole
            viewport.
          </p>
          <div style={{ position: "relative", height: 280, borderRadius: 8, overflow: "hidden", contain: "layout paint" }}>
            <div style={{ position: "absolute", inset: 0, background: "#f2f2f2" }} />
            <Overlay onClick={() => {}} />
          </div>
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Paired with Modal — Modal renders on top</h3>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            Same contained box, this time with a <code>Modal</code> mounted alongside it. Modal's{" "}
            <code>z-index: var(--modal-z-index)</code> (400) beats Overlay's 300, so it always sits above
            the scrim — clicking the scrim itself (via Overlay's <code>onClick</code>) is the usual way to
            dismiss both together.
          </p>
          <div style={{ position: "relative", height: 280, borderRadius: 8, overflow: "hidden", contain: "layout paint" }}>
            <div style={{ position: "absolute", inset: 0, background: "#f2f2f2" }} />
            {!showModal && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button variant="primary" size="md" onClick={() => setShowModal(true)}>
                  Show modal on top
                </Button>
              </div>
            )}
            {showModal && (
              <>
                <Overlay onClick={() => setShowModal(false)} />
                <Modal>
                  <Modal.Header title="Title" description="Description" onClose={() => setShowModal(false)} />
                  <Modal.Footer primaryLabel="Confirm" onPrimary={() => setShowModal(false)} />
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

const MODAL_DEFAULT_BODY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque enim ac odio tincidunt, ac tincidunt ipsum ullamcorper.";

function ModalDemo() {
  const [title, setTitle] = useState("Title");
  const [descriptionText, setDescriptionText] = useState("Description");
  const [contentText, setContentText] = useState(MODAL_DEFAULT_BODY);
  const [description, setDescription] = useState(true);
  const [content, setContent] = useState(true);
  const [secondaryButton, setSecondaryButton] = useState(true);
  const [filled, setFilled] = useState(false);
  const [closable, setClosable] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <ComponentPage
      id="modal"
      title="Modal"
      usage="Fixed, viewport-centered dialog card composed from Modal.Header, Modal.Content, and Modal.Footer. Pair with Overlay for the dimmed backdrop — Modal only renders the card itself, no portal or backdrop of its own. Mount them as siblings (not nested): Modal's z-index (400) is always above Overlay's (300), so Modal renders on top with no extra work — see Overlay's own Usage tab for the paired example."
      figmaUrl={`${FIGMA_FILE}2734-18960`}
      code={`import { Modal, Overlay } from "@statrys/web-ds";\n\n// Siblings, not nested — Overlay (z-index 300) dims the page,\n// Modal (z-index 400) always renders on top of it.\n{open && (\n  <>\n    <Overlay onClick={() => setOpen(false)} />\n    <Modal>\n      <Modal.Header title="Title" description="Description" onClose={() => setOpen(false)} />\n      <Modal.Content paddingBottom>Body copy…</Modal.Content>\n      <Modal.Footer\n        primaryLabel="Confirm"\n        onPrimary={() => setOpen(false)}\n        secondaryLabel="Cancel"\n        onSecondary={() => setOpen(false)}\n      />\n    </Modal>\n  </>\n)}`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          <code>onClose</code> (Header) and <code>secondaryLabel</code> (Footer) each render their
          affordance only when provided — not separate discrete flags. Footer's <code>filled</code>
          stretches both buttons to split the row evenly instead of sitting auto-width at the end.
        </p>

        <div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <div
              style={{
                flex: "1 1 480px",
                position: "relative",
                minHeight: 460,
                background: "#f2f2f2",
                borderRadius: 8,
                overflow: "hidden",
                contain: "layout paint",
              }}
            >
              <Overlay onClick={() => {}} />
              <Modal>
                <Modal.Header
                  title={title}
                  description={description ? descriptionText : undefined}
                  onClose={closable ? () => {} : undefined}
                />
                {content && <Modal.Content paddingBottom>{contentText}</Modal.Content>}
                <Modal.Footer
                  primaryLabel="Confirm"
                  onPrimary={() => {}}
                  secondaryLabel={secondaryButton ? "Cancel" : undefined}
                  onSecondary={() => {}}
                  filled={filled}
                />
              </Modal>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Text</ControlGroupLabel>
                <DemoField label="Title" value={title} onChange={setTitle} />
                {description && <DemoField label="Description" value={descriptionText} onChange={setDescriptionText} />}
                {content && <DemoField label="Content body" value={contentText} onChange={setContentText} multiline />}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Layout</ControlGroupLabel>
                <Checkbox label="Description" selected={description} onChange={setDescription} />
                <Checkbox label="Content body" selected={content} onChange={setContent} />
                <Checkbox label="Secondary button" selected={secondaryButton} onChange={setSecondaryButton} />
                <Checkbox label="Filled footer" selected={filled} onChange={setFilled} />
                <Checkbox label="Close (×) button" selected={closable} onChange={setClosable} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Real trigger flow</h3>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            The combination above, mounted for real — full-screen, opened/closed by a trigger,
            instead of pinned open inside a contained preview box.
          </p>
          <Button variant="primary" size="md" onClick={() => setOpen(true)}>
            Open modal
          </Button>
          {open && (
            <>
              <Overlay onClick={() => setOpen(false)} />
              <Modal>
                <Modal.Header
                  title={title}
                  description={description ? descriptionText : undefined}
                  onClose={closable ? () => setOpen(false) : undefined}
                />
                {content && <Modal.Content paddingBottom>{contentText}</Modal.Content>}
                <Modal.Footer
                  primaryLabel="Confirm"
                  onPrimary={() => setOpen(false)}
                  secondaryLabel={secondaryButton ? "Cancel" : undefined}
                  onSecondary={() => setOpen(false)}
                  filled={filled}
                />
              </Modal>
            </>
          )}
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Parts, in isolation</h3>
          <p style={{ color: "#666", maxWidth: 560 }}>
            Only the assembled <code>Modal</code> root is fixed/centered — Header/Content/Footer are
            plain flex rows on their own, shown here inline in a bordered box instead of full-screen.
          </p>
          <div
            style={{
              width: 520,
              maxWidth: "100%",
              background: "var(--bg-neutral-primary)",
              border: "1px solid var(--border-primary, #eee)",
              borderRadius: "var(--radius-3xl)",
              overflow: "hidden",
            }}
          >
            <Modal.Header title="Title" description="Description" onClose={() => {}} />
            <Modal.Content paddingTop paddingBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Modal.Content>
            <Modal.Footer primaryLabel="Button" secondaryLabel="Button" onPrimary={() => {}} onSecondary={() => {}} />
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
  if (item === "tooltip") return <TooltipDemo />;
  if (item === "banner") return <BannerDemo />;
  if (item === "toast-message") return <ToastMessageDemo />;
  if (item === "x-close") return <XCloseDemo />;
  if (item === "overlay") return <OverlayDemo />;
  if (item === "modal") return <ModalDemo />;
  return <div>Unknown component: {item}</div>;
}
