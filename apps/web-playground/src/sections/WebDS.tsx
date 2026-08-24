import { useState, Fragment, type ComponentProps } from "react";
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
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {VARIANTS.map((variant) => (
          <div key={variant}>
            <h3 style={{ margin: "0 0 12px", textTransform: "capitalize" }}>{variant}</h3>
            <VariantGrid
              columns={SIZES}
              rows={[
                { label: "Default", render: (size) => <Button variant={variant} size={size}>{variant} / {size}</Button> },
                { label: "Disabled", render: (size) => <Button variant={variant} size={size} disabled>{variant} / {size}</Button> },
              ]}
            />
          </div>
        ))}

        <div>
          <h2 style={{ fontSize: 16, margin: "0 0 12px" }}>Inverse (dark surface)</h2>
          <div style={{ background: "var(--neutral-8)", padding: 24, borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", gap: 24 }}>
            {VARIANTS.map((variant) => (
              <VariantGrid
                key={variant}
                columns={SIZES}
                rows={[
                  { label: "Default", render: (size) => <Button variant={variant} size={size} inverse>{variant} / {size}</Button> },
                  { label: "Disabled", render: (size) => <Button variant={variant} size={size} inverse disabled>{variant} / {size}</Button> },
                ]}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 16, margin: "0 0 12px" }}>Shape=Rounded</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {VARIANTS.map((variant) => (
              <VariantGrid
                key={variant}
                columns={SIZES}
                rows={[
                  { label: "Default", render: (size) => <Button variant={variant} size={size} shape="rounded">{variant} / {size}</Button> },
                  { label: "Disabled", render: (size) => <Button variant={variant} size={size} shape="rounded" disabled>{variant} / {size}</Button> },
                ]}
              />
            ))}
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
  return (
    <ComponentPage
      id="button-highlight"
      title="Button Highlight"
      usage="Gradient-filled CTA button for high-emphasis marketing surfaces — a distinct component from Button, not a variant of it."
      figmaUrl={`${FIGMA_FILE}1847-8095`}
      code={`import { ButtonHighlight } from "@statrys/web-ds";\n\n<ButtonHighlight variant="primary" size="md" onClick={handleClick}>\n  Get started\n</ButtonHighlight>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {HIGHLIGHT_VARIANTS.map((variant) => (
          <div key={variant}>
            <h3 style={{ margin: "0 0 12px", textTransform: "capitalize" }}>{variant}</h3>
            <VariantGrid
              columns={SIZES}
              rows={[
                { label: "Default", render: (size) => <ButtonHighlight variant={variant} size={size}>{variant} / {size}</ButtonHighlight> },
                { label: "Disabled", render: (size) => <ButtonHighlight variant={variant} size={size} disabled>{variant} / {size}</ButtonHighlight> },
              ]}
            />
          </div>
        ))}

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
          <h3 style={{ margin: "0 0 12px" }}>All states × sizes</h3>
          <VariantGrid
            columns={SIZES}
            rows={[
              { label: "Default", render: (size) => <Link size={size} href="#" iconRight={<ArrowUpRight size={16} />}>Link / {size}</Link> },
              { label: "Disabled", render: (size) => <Link size={size} href="#" disabled iconRight={<ArrowUpRight size={16} />}>Link / {size}</Link> },
            ]}
          />
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

        <div>
          <h2 style={{ fontSize: 16, margin: "0 0 12px" }}>Inverse (dark surface)</h2>
          <div style={{ background: "var(--neutral-8)", padding: 24, borderRadius: "var(--radius-lg)" }}>
            <VariantGrid
              columns={SIZES}
              rows={[
                { label: "Default", render: (size) => <Link size={size} inverse href="#" iconRight={<ArrowUpRight size={16} />}>Link / {size}</Link> },
                { label: "Disabled", render: (size) => <Link size={size} inverse href="#" disabled iconRight={<ArrowUpRight size={16} />}>Link / {size}</Link> },
              ]}
            />
          </div>
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

const TAB_ITEMS_PLAIN = [
  { id: "one", label: "Tab one" },
  { id: "two", label: "Tab two" },
  { id: "three", label: "Tab three" },
];

const HORIZONTAL_TABS_SIZES = ["md", "lg"] as const;

function HorizontalTabsDemo() {
  const [mdIconActive, setMdIconActive] = useState("one");
  const [lgIconActive, setLgIconActive] = useState("three");
  const [mdPlainActive, setMdPlainActive] = useState("two");
  const [lgPlainActive, setLgPlainActive] = useState("one");

  return (
    <ComponentPage
      id="horizontal-tabs"
      title="Horizontal Tabs"
      usage="Horizontal tab list, Style=Underline only — renders one internal Tab (Figma 'TabsBase') per item; Tab is not exported on its own."
      figmaUrl={`${FIGMA_FILE}2725-16713`}
      code={`import { HorizontalTabs } from "@statrys/web-ds";\n\nconst items = [\n  { id: "one", label: "Tab one", badge: 2 },\n  { id: "two", label: "Tab two" },\n];\n\n<HorizontalTabs items={items} activeId={activeId} onChange={setActiveId} />`}
    >
      <VariantGrid
        columns={HORIZONTAL_TABS_SIZES}
        rows={[
          {
            label: "With icon + badge",
            render: (size) =>
              size === "md" ? (
                <HorizontalTabs items={TAB_ITEMS} activeId={mdIconActive} onChange={setMdIconActive} />
              ) : (
                <HorizontalTabs items={TAB_ITEMS} activeId={lgIconActive} onChange={setLgIconActive} size="lg" />
              ),
          },
          {
            label: "Plain (no icon/badge)",
            render: (size) =>
              size === "md" ? (
                <HorizontalTabs items={TAB_ITEMS_PLAIN} activeId={mdPlainActive} onChange={setMdPlainActive} />
              ) : (
                <HorizontalTabs items={TAB_ITEMS_PLAIN} activeId={lgPlainActive} onChange={setLgPlainActive} size="lg" />
              ),
          },
        ]}
      />
    </ComponentPage>
  );
}

const TOGGLE_COLUMNS = ["Enabled", "Disabled"] as const;

function ToggleDemo() {
  const [off, setOff] = useState(false);
  const [on, setOn] = useState(true);

  return (
    <ComponentPage
      id="toggle"
      title="Toggle"
      usage="A switch to change between two states, on and off — an alternative for the checkbox (per Figma's usage note on this component). No Hover variant is defined in Figma, so none is implemented here."
      figmaUrl={`${FIGMA_FILE}3784-2555`}
      code={`import { Toggle } from "@statrys/web-ds";\n\n<Toggle selected={enabled} onChange={setEnabled} aria-label="Enable notifications" />`}
    >
      <VariantGrid
        columns={TOGGLE_COLUMNS}
        rows={[
          {
            label: "Off",
            render: (column) =>
              column === "Enabled" ? (
                <Toggle selected={off} onChange={setOff} aria-label="off, enabled" />
              ) : (
                <Toggle selected={false} disabled aria-label="off, disabled" />
              ),
          },
          {
            label: "On",
            render: (column) =>
              column === "Enabled" ? (
                <Toggle selected={on} onChange={setOn} aria-label="on, enabled" />
              ) : (
                <Toggle selected={true} disabled aria-label="on, disabled" />
              ),
          },
        ]}
      />
    </ComponentPage>
  );
}

const CHECKBOX_SIZES = ["sm", "md"] as const;
const CHECKBOX_VARIANT_ROWS: { label: string; props: Partial<ComponentProps<typeof Checkbox>> }[] = [
  { label: "Unselected", props: { selected: false } },
  { label: "Selected", props: { selected: true } },
  { label: "Indeterminate", props: { selected: true, indeterminate: true } },
  { label: "Disabled, unselected", props: { selected: false, disabled: true } },
  { label: "Disabled, selected", props: { selected: true, disabled: true } },
];

function CheckboxDemo() {
  const [withDesc, setWithDesc] = useState(false);

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
          <h3 style={{ margin: "0 0 12px" }}>All states × sizes</h3>
          <VariantGrid
            columns={CHECKBOX_SIZES}
            rows={CHECKBOX_VARIANT_ROWS.map((row) => ({
              label: row.label,
              render: (size: (typeof CHECKBOX_SIZES)[number]) => <Checkbox label="Label" size={size} onChange={() => {}} {...row.props} />,
            }))}
          />
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>With description</h3>
          <Checkbox
            label="Remember me"
            description="Save my login details for next time"
            selected={withDesc}
            onChange={setWithDesc}
          />
        </div>
      </div>
    </ComponentPage>
  );
}

const RADIO_SIZES = ["sm", "md"] as const;
const RADIO_VARIANT_ROWS: { label: string; props: Partial<ComponentProps<typeof Radio>> }[] = [
  { label: "Unselected", props: { selected: false } },
  { label: "Selected", props: { selected: true } },
  { label: "Disabled, unselected", props: { selected: false, disabled: true } },
  { label: "Disabled, selected", props: { selected: true, disabled: true } },
];

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
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <h3 style={{ margin: "0 0 12px" }}>All states × sizes</h3>
          <VariantGrid
            columns={RADIO_SIZES}
            rows={RADIO_VARIANT_ROWS.map((row) => ({
              label: row.label,
              render: (size: (typeof RADIO_SIZES)[number]) => <Radio size={size} aria-label={`${row.label} ${size}`} {...row.props} />,
            }))}
          />
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
const SEARCH_INPUT_VARIANT_ROWS: { label: string; props: Partial<ComponentProps<typeof SearchInput>> }[] = [
  { label: "Empty", props: { value: "" } },
  { label: "Filled", props: { value: "Statrys" } },
  { label: "Disabled, empty", props: { value: "", disabled: true } },
  { label: "Disabled, filled", props: { value: "Statrys", disabled: true } },
];

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
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 900 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          "Filled" isn't a discrete prop — it's derived from whether <code>value</code> is non-empty, since a
          real input can be both focused and filled at once, a combination Figma's flat state enum can't
          represent. Hover/focus are real CSS pseudo-classes on the container (by design, matching
          Button/Link/Tab) — try it live in the section below rather than in the static grid.
        </p>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>All states × sizes</h3>
          <VariantGrid
            columns={SEARCH_INPUT_SIZES}
            rows={SEARCH_INPUT_VARIANT_ROWS.map((row) => ({
              label: row.label,
              render: (size: (typeof SEARCH_INPUT_SIZES)[number]) => <SearchInput size={size} onChange={() => {}} {...row.props} />,
            }))}
          />
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Interactive (controlled)</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 343 }}>
            {SEARCH_INPUT_SIZES.map((size) => (
              <SearchInput
                key={size}
                size={size}
                value={values[size]}
                onChange={(v) => setValues((prev) => ({ ...prev, [size]: v }))}
              />
            ))}
          </div>
        </div>
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
          <VariantGrid
            columns={TEXT_INPUT_SIZES}
            columnLabelWidth={140}
            rows={TEXT_INPUT_VARIANT_ROWS.map((row) => ({
              label: row.label,
              render: (size: (typeof TEXT_INPUT_SIZES)[number]) => (
                <TextInputFluid label="Label" placeholder="Placeholder" value="" onChange={() => {}} size={size} {...row.props} />
              ),
            }))}
          />
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

const TOOLTIP_ARROWS = ["none", "top", "bottom", "bottom-left", "bottom-right", "left", "right"] as const;
const TOOLTIP_COLUMNS = ["Title only", "With description"] as const;
const TOOLTIP_DESCRIPTION =
  "Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element.";

function TooltipDemo() {
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
          <h3 style={{ margin: "0 0 12px" }}>Default</h3>
          <VariantGrid
            columns={TOOLTIP_COLUMNS}
            rows={TOOLTIP_ARROWS.map((arrow) => ({
              label: arrow,
              render: (column) =>
                column === "Title only" ? (
                  <Tooltip title="This is a tooltip" arrow={arrow} />
                ) : (
                  <Tooltip title="This is a tooltip" description={TOOLTIP_DESCRIPTION} arrow={arrow} />
                ),
            }))}
          />
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Inverse (dark bubble, for light surfaces)</h3>
          <div style={{ background: "var(--bg-beige-primary)", padding: 24, borderRadius: "var(--radius-lg)" }}>
            <VariantGrid
              columns={TOOLTIP_COLUMNS}
              rows={TOOLTIP_ARROWS.map((arrow) => ({
                label: arrow,
                render: (column) =>
                  column === "Title only" ? (
                    <Tooltip title="This is a tooltip" arrow={arrow} inverse />
                  ) : (
                    <Tooltip title="This is a tooltip" description={TOOLTIP_DESCRIPTION} arrow={arrow} inverse />
                  ),
              }))}
            />
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

const BANNER_COLORS = ["success", "warning", "error", "info"] as const;
const BANNER_COLUMNS = ["Text only", "Title + Text"] as const;
const BANNER_TEXT = "Your information is secure and encrypted";

function BannerDemo() {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});

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
          <h3 style={{ margin: "0 0 12px" }}>Card (default)</h3>
          <VariantGrid
            columns={BANNER_COLUMNS}
            columnLabelWidth={100}
            rows={BANNER_COLORS.map((color) => ({
              label: color,
              render: (column) => (
                <Banner
                  color={color}
                  title={column === "Title + Text" ? "Title" : undefined}
                  text={BANNER_TEXT}
                  onLinkClick={() => {}}
                  onDismiss={() => {}}
                />
              ),
            }))}
          />
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Full width (page-level bar)</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {BANNER_COLORS.map((color) => (
              <Banner
                key={color}
                color={color}
                text={BANNER_TEXT}
                fullWidth
                onLinkClick={() => {}}
                onDismiss={() => {}}
              />
            ))}
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

        <div>
          <h3 style={{ margin: "0 0 12px" }}>No link, no dismiss</h3>
          <Banner color="info" title="Title" text={BANNER_TEXT} />
        </div>
      </div>
    </ComponentPage>
  );
}

const TOAST_VARIANTS = ["default", "success", "error", "warning"] as const;
const TOAST_COLUMNS = ["No subtitle", "With subtitle"] as const;

function ToastMessageDemo() {
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(TOAST_VARIANTS.map((v) => [v, true]))
  );

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
          <h3 style={{ margin: "0 0 12px" }}>All variants</h3>
          <VariantGrid
            columns={TOAST_COLUMNS}
            columnLabelWidth={100}
            rows={TOAST_VARIANTS.map((variant) => ({
              label: variant,
              render: (column) => (
                <ToastMessage
                  variant={variant}
                  title="Title"
                  subtitle={column === "With subtitle" ? "Subtitle" : undefined}
                  action={{ label: "View Details", onClick: () => {} }}
                  onClose={() => {}}
                />
              ),
            }))}
          />
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

        <div>
          <h3 style={{ margin: "0 0 12px" }}>No action, no title-only subtitle</h3>
          <ToastMessage variant="default" title="Changes saved" onClose={() => {}} />
        </div>
      </div>
    </ComponentPage>
  );
}

const XCLOSE_SIZES = ["sm", "md"] as const;

function XCloseDemo() {
  return (
    <ComponentPage
      id="x-close"
      title="X Close"
      usage="Small square icon-only close/dismiss button. Hover is a real CSS background tint, not a discrete prop — try it live below rather than in a static grid."
      figmaUrl={`${FIGMA_FILE}1646-164`}
      code={`import { XClose } from "@statrys/web-ds";\n\n<XClose size="sm" onClick={() => setOpen(false)} aria-label="Dismiss" />\n\n// On a dark surface (e.g. inside ToastMessage)\n<XClose size="sm" inverse onClick={() => setOpen(false)} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <h3 style={{ margin: "0 0 12px" }}>Default (light surface)</h3>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {XCLOSE_SIZES.map((size) => (
              <XClose key={size} size={size} onClick={() => {}} />
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Inverse (dark surface)</h3>
          <div style={{ background: "var(--bg-neutral-inverse-primary)", padding: 24, borderRadius: "var(--radius-lg)", display: "flex", gap: 24, alignItems: "center" }}>
            {XCLOSE_SIZES.map((size) => (
              <XClose key={size} size={size} inverse onClick={() => {}} />
            ))}
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

function ModalDemo() {
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
          <h3 style={{ margin: "0 0 12px" }}>Interactive — every combination</h3>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            One live <code>Modal</code> re-rendering as you flip these — not a static grid of
            pre-baked screenshots.
          </p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
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
                  title="Title"
                  description={description ? "Description" : undefined}
                  onClose={closable ? () => {} : undefined}
                />
                {content && (
                  <Modal.Content paddingBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque enim ac
                    odio tincidunt, ac tincidunt ipsum ullamcorper.
                  </Modal.Content>
                )}
                <Modal.Footer
                  primaryLabel="Confirm"
                  onPrimary={() => {}}
                  secondaryLabel={secondaryButton ? "Cancel" : undefined}
                  onSecondary={() => {}}
                  filled={filled}
                />
              </Modal>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 200, flexShrink: 0 }}>
              <Checkbox label="Description" selected={description} onChange={setDescription} />
              <Checkbox label="Content body" selected={content} onChange={setContent} />
              <Checkbox label="Secondary button" selected={secondaryButton} onChange={setSecondaryButton} />
              <Checkbox label="Filled footer" selected={filled} onChange={setFilled} />
              <Checkbox label="Close (×) button" selected={closable} onChange={setClosable} />
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
                  title="Title"
                  description={description ? "Description" : undefined}
                  onClose={closable ? () => setOpen(false) : undefined}
                />
                {content && (
                  <Modal.Content paddingBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque enim ac
                    odio tincidunt, ac tincidunt ipsum ullamcorper.
                  </Modal.Content>
                )}
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
