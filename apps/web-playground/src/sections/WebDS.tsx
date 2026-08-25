import { useState, Fragment } from "react";
import { ArrowUpRight, ChevronDown, Send } from "lucide-react";
import { Button, ButtonHighlight, Link, HorizontalTabs, Toggle, Checkbox, Radio, SearchInput, TextInputFluid, Tooltip, Banner, ToastMessage, XClose, Overlay, Modal, Sidebar, PageHeader, DashboardTemplate } from "@statrys/web-ds";
import { ComponentPage } from "../ComponentPage";

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
      whatItIs="A clickable button for the one action you want someone to take, like submitting a form or confirming a choice."
      whenToUse={[
        "For the main action on a screen, like “Save” or “Continue.”",
        "For a supporting action next to it, like “Cancel” beside “Confirm.”",
        "For a low-emphasis action that shouldn't compete for attention, like “Skip.”",
        "On a dark background, turn on “inverse” so it stays easy to read.",
      ]}
      useInstead={[
        { label: "Link", because: "the action is just text within a sentence or list, not its own button." },
      ]}
      goodToKnow={[
        "The square and circle shapes are for icon-only buttons with no visible label — only use them when the icon alone is clear.",
      ]}
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
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>State</ControlGroupLabel>
                <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
                <Checkbox label="Inverse (dark surface)" selected={inverse} onChange={setInverse} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 16, margin: "0 0 12px" }}>Icon-only buttons</h2>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            Square and circle buttons show only an icon, no label — you supply whichever icon fits.
            The one shown here matches Figma's own example icon.
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
      whatItIs="An eye-catching, gradient button for marketing moments — think landing pages and promotions, not everyday product screens."
      whenToUse={[
        "On a hero section, landing page, or promotional banner, where one action should stand out above everything else.",
      ]}
      useInstead={[
        { label: "Button", because: "you're inside a product screen or a form — its primary style is already the right amount of emphasis there." },
      ]}
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
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>State</ControlGroupLabel>
                <Checkbox label="Disabled" selected={disabled} onChange={setDisabled} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 16, margin: "0 0 12px" }}>Icon slots</h2>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            An icon can go on the left, the right, or both sides of the label — you choose which icon to use.
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
      whatItIs="Text that acts like a link — for navigating or jumping to more info, written to flow naturally inside a sentence or list."
      whenToUse={[
        "Inline with body text, like “Learn more” or “View Details.”",
        "In a list row or a footer, where the action should read as text rather than a button.",
      ]}
      useInstead={[
        { label: "Button", because: "the action needs to stand out on its own, like submitting a form." },
      ]}
      code={`import { Link } from "@statrys/web-ds";\nimport { ArrowUpRight } from "lucide-react";\n\n<Link href="/docs" size="md" iconRight={<ArrowUpRight size={16} />}>\n  Learn more\n</Link>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          An icon can go on the left, right, or both sides of the link — you choose which one, this
          example uses the same arrow as Figma. The icon automatically matches the link's own text
          color, so it changes along with hover, active, and disabled states without extra setup.
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
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>State</ControlGroupLabel>
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
      whatItIs="A row of tabs for switching between a few closely related views on the same page."
      whenToUse={[
        "Switching between sections that live on one page, like tabs in a settings screen.",
        "When there are only a few tabs — enough to fit comfortably on one line without wrapping.",
      ]}
      useInstead={[
        { label: "regular navigation (menus, links)", because: "you have many destinations, or they're not really equal peers of each other." },
      ]}
      goodToKnow={[
        "Only the underlined style exists today — there's no pill or segmented look yet.",
      ]}
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
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Content</ControlGroupLabel>
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
      whatItIs="A switch for turning something on or off right away, with no extra step to confirm."
      whenToUse={[
        "Settings that apply the moment you flip them, like notifications or dark mode.",
      ]}
      useInstead={[
        { label: "Checkbox", because: "the choice is part of a form and won't take effect until the whole form is submitted." },
      ]}
      code={`import { Toggle } from "@statrys/web-ds";\n\n<Toggle selected={enabled} onChange={setEnabled} aria-label="Enable notifications" />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            Toggle has no label of its own — click it directly to flip it, or use the "Selected"
            control below to see how it looks both on and off while disabled.
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
                <ControlGroupLabel>State</ControlGroupLabel>
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
      whatItIs="A checkbox with a label (and an optional short description) for choices that are part of a form or list."
      whenToUse={[
        "Agreeing to terms, or picking several options that can all apply at once.",
        "Selecting rows in a list to include in a bulk action.",
      ]}
      useInstead={[
        { label: "Toggle", because: "the choice should take effect immediately, with no submit step." },
        { label: "Radio", because: "only one option out of the set is allowed." },
      ]}
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
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Content</ControlGroupLabel>
                <Checkbox label="Description" selected={showDescription} onChange={setShowDescription} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>State</ControlGroupLabel>
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
      whatItIs="A round selector for choosing exactly one option out of a small set."
      whenToUse={[
        "Picking a plan, a shipping method, or the answer to a single-choice question.",
        "Grouping a few options together so picking one automatically clears the others.",
      ]}
      useInstead={[
        { label: "Checkbox", because: "more than one option can be chosen at the same time." },
        { label: "a dropdown field", because: "the list of options is too long to show all at once." },
      ]}
      goodToKnow={[
        "This is just the round indicator by itself — there's no built-in text label, so pair it with your own.",
      ]}
      code={`import { Radio } from "@statrys/web-ds";\n\n<Radio name="plan" value="monthly" selected={plan === "monthly"} onChange={() => setPlan("monthly")} />\n<Radio name="plan" value="yearly" selected={plan === "yearly"} onChange={() => setPlan("yearly")} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            This is just the round indicator, with no label built in — so there's no text to edit here.
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
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>State</ControlGroupLabel>
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
      whatItIs="A search box with a search icon, and a clear button that appears once you start typing."
      whenToUse={[
        "Filtering or searching a list, table, or page of results.",
      ]}
      useInstead={[
        { label: "Text Input Fluid", because: "it's a regular form field like name or email, not a search box." },
      ]}
      code={`import { SearchInput } from "@statrys/web-ds";\n\n<SearchInput value={query} onChange={setQuery} placeholder="Search" />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          The "filled" look isn't something you turn on directly — it just appears automatically once
          there's text in the field, even while it's still focused. Hover and focus styling work the
          same natural way too, so try clicking into and typing in the field below rather than just
          flipping switches.
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
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>State</ControlGroupLabel>
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
      whatItIs="A form field with a floating label that shrinks out of the way once you start typing."
      whenToUse={[
        "Standard form fields like name, email, or address.",
        "Turn on “dropdown” when tapping the field should open a list of choices instead of a keyboard.",
      ]}
      useInstead={[
        { label: "Search Input", because: "it's specifically for filtering a list or table, not a general form field." },
      ]}
      goodToKnow={[
        "Always pair a field with a hint or error message — don't rely on color alone to show something's wrong.",
      ]}
      code={`import { TextInputFluid } from "@statrys/web-ds";\n\n<TextInputFluid\n  label="Email"\n  value={email}\n  onChange={setEmail}\n  placeholder="you@example.com"\n  hint="We'll never share your email"\n/>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          The label shrinks into a small caption above the field automatically, once you click into it
          or it already has text — you don't set that directly. "Force focus" below fakes that focused
          look so you can see it without having to click into the field yourself.
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
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Content</ControlGroupLabel>
                <Checkbox label="Tooltip" selected={showTooltip} onChange={setShowTooltip} />
                <Checkbox label="Hint" selected={showHint} onChange={setShowHint} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>State</ControlGroupLabel>
                <Checkbox label="Force focus" selected={forceFocus} onChange={setForceFocus} />
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
      whatItIs="A small bubble of extra context that appears when someone hovers over or focuses an element."
      whenToUse={[
        "Explaining an icon-only button, or why a control is greyed out.",
        "Giving a short, optional definition someone might want but doesn't need to see right away.",
      ]}
      goodToKnow={[
        "Never put information someone needs to finish a task inside a tooltip — it's easy to miss, especially on phones and tablets.",
      ]}
      code={`import { Tooltip } from "@statrys/web-ds";\n\n<Tooltip title="This is a tooltip" arrow="bottom" />\n\n<Tooltip\n  title="This is a tooltip"\n  description="Tooltips are used to describe or identify an element."\n  arrow="top"\n  inverse\n/>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          The arrow points toward whatever the tooltip is explaining, and can sit on any side — top,
          bottom, left, or right. The two bottom-corner options shift the arrow toward that corner
          instead of centering it.
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
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Content</ControlGroupLabel>
                <Checkbox label="Description" selected={showDescription} onChange={setShowDescription} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>State</ControlGroupLabel>
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
      whatItIs="A notice that stays visible on the page until someone dismisses it or the situation changes."
      whenToUse={[
        "Ongoing notices, like a maintenance warning, an account status, or a security alert.",
      ]}
      useInstead={[
        { label: "Toast Message", because: "it's a quick confirmation right after an action, not something that needs to stay on screen." },
      ]}
      goodToKnow={[
        "Match the color to how serious the notice is — green for success, red for errors, and so on.",
        "Only make it dismissable when it's fine for someone to lose it for good.",
      ]}
      code={`import { Banner } from "@statrys/web-ds";\n\n<Banner\n  color="success"\n  text="Your information is secure and encrypted"\n  onLinkClick={() => {}}\n  onDismiss={() => setShow(false)}\n/>\n\n<Banner color="warning" title="Title" text="..." fullWidth />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          Adding a title switches the banner from plain text to a title-and-text layout automatically —
          there's no separate setting for that. The link and dismiss button each show up only when you
          actually provide them, instead of appearing greyed out and unusable.
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
                <Checkbox label="Full width (page-level bar)" selected={fullWidth} onChange={setFullWidth} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Content</ControlGroupLabel>
                <Checkbox label="Title" selected={showTitle} onChange={setShowTitle} />
                <Checkbox label="Link" selected={showLink} onChange={setShowLink} />
                <Checkbox label="Dismiss" selected={showDismiss} onChange={setShowDismiss} />
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
      whatItIs="A brief confirmation card that pops up right after someone takes an action."
      whenToUse={[
        "“Invoice sent,” “Changes saved,” “Draft deleted” — short feedback about something that just happened.",
      ]}
      useInstead={[
        { label: "Banner", because: "the message needs to stay visible rather than disappear after a moment." },
      ]}
      goodToKnow={[
        "Keep the title short enough to read at a glance.",
        "Only add the trailing link when there's a genuinely useful next step to take.",
      ]}
      code={`import { ToastMessage } from "@statrys/web-ds";\n\n<ToastMessage\n  variant="success"\n  title="Invoice sent"\n  subtitle="Marked as sent"\n  action={{ label: "View Details", onClick: openInvoice }}\n  onClose={() => setShow(false)}\n/>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          The subtitle and the trailing link only show up if you actually provide them — no separate
          switch needed to hide them.
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
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Content</ControlGroupLabel>
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
      whatItIs="The small × button people tap to close or dismiss something."
      whenToUse={[
        "On modals, panels, toasts, and banners — anywhere someone can close a surface without taking its main action.",
      ]}
      goodToKnow={[
        "Always give it a label describing what it closes, so it's clear to people using a screen reader.",
      ]}
      code={`import { XClose } from "@statrys/web-ds";\n\n<XClose size="sm" onClick={() => setOpen(false)} aria-label="Dismiss" />\n\n// On a dark surface (e.g. inside ToastMessage)\n<XClose size="sm" inverse onClick={() => setOpen(false)} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>There's no label here — just its size and which surface it sits on. Hover over it below to see the background tint appear.</p>
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
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>State</ControlGroupLabel>
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
      whatItIs="The dimmed background that appears behind a modal or other pop-up surface."
      whenToUse={[
        "Any time a modal (or similar pop-up) needs to visually separate itself from the page behind it.",
      ]}
      goodToKnow={[
        "It's just the dimmed backdrop, mounted alongside the modal rather than wrapped around it — never put content inside it.",
        "The modal itself always appears on top automatically, no extra setup needed.",
      ]}
      code={`import { Overlay, Modal } from "@statrys/web-ds";\n\n// Siblings, not nested — Overlay (z-index 300) is the dimmed backdrop,\n// Modal (z-index 400) always renders on top of it.\n{open && (\n  <>\n    <Overlay onClick={() => setOpen(false)} />\n    <Modal>\n      <Modal.Header title="Title" onClose={() => setOpen(false)} />\n      <Modal.Footer primaryLabel="Confirm" onPrimary={() => setOpen(false)} />\n    </Modal>\n  </>\n)}`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <h3 style={{ margin: "0 0 12px" }}>On its own</h3>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            Normally this covers the entire screen. It's boxed into the preview below just so you can
            see it here — in real use it sits behind whatever it's dimming, covering the whole page.
          </p>
          <div style={{ position: "relative", height: 280, borderRadius: 8, overflow: "hidden", contain: "layout paint" }}>
            <div style={{ position: "absolute", inset: 0, background: "#f2f2f2" }} />
            <Overlay onClick={() => {}} />
          </div>
        </div>

        <div>
          <h3 style={{ margin: "0 0 12px" }}>Paired with Modal — Modal renders on top</h3>
          <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
            Same preview box, now with a Modal mounted next to it. The modal always appears on top of
            the dimmed background automatically, with no extra setup — clicking the dimmed area is the
            usual way to close both at once.
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
      whatItIs="A pop-up dialog that pauses the rest of the page until someone finishes or cancels the task inside it."
      whenToUse={[
        "Confirming a destructive action, like deleting something.",
        "A short, focused task that needs someone's full attention before they move on.",
      ]}
      useInstead={[
        { label: "Tooltip or Banner", because: "the info is just supplementary, not something that needs to block the page." },
      ]}
      goodToKnow={[
        "Pair it with Overlay for the dimmed background — see Overlay's own Usage tab for the two shown together.",
      ]}
      code={`import { Modal, Overlay } from "@statrys/web-ds";\n\n// Siblings, not nested — Overlay (z-index 300) dims the page,\n// Modal (z-index 400) always renders on top of it.\n{open && (\n  <>\n    <Overlay onClick={() => setOpen(false)} />\n    <Modal>\n      <Modal.Header title="Title" description="Description" onClose={() => setOpen(false)} />\n      <Modal.Content paddingBottom>Body copy…</Modal.Content>\n      <Modal.Footer\n        primaryLabel="Confirm"\n        onPrimary={() => setOpen(false)}\n        secondaryLabel="Cancel"\n        onSecondary={() => setOpen(false)}\n      />\n    </Modal>\n  </>\n)}`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <p style={{ color: "#666", maxWidth: 560, marginTop: 0 }}>
          The close (×) button and the secondary footer button each show up only when you actually give
          them something to do. The "filled" footer stretches both buttons to split the row evenly,
          instead of sitting snug at the end.
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
                <Checkbox label="Filled footer" selected={filled} onChange={setFilled} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ControlGroupLabel>Content</ControlGroupLabel>
                <Checkbox label="Description" selected={description} onChange={setDescription} />
                <Checkbox label="Content body" selected={content} onChange={setContent} />
                <Checkbox label="Secondary button" selected={secondaryButton} onChange={setSecondaryButton} />
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
            Only the full Modal centers itself on the page — the header, content, and footer are just
            simple building blocks on their own, shown here side by side in a plain box instead of
            full-screen.
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

const ACCOUNT_TYPES = ["ccBa", "ccOnly"] as const;

function SidebarDemo() {
  const [accountType, setAccountType] = useState<(typeof ACCOUNT_TYPES)[number]>("ccBa");
  const [activeKey, setActiveKey] = useState("dashboard");
  const [pinned, setPinned] = useState(false);

  return (
    <ComponentPage
      id="sidebar"
      title="Sidebar"
      whatItIs="The app's left-hand navigation — a narrow icon rail that widens to show labels when you hover over it or tab into it with the keyboard."
      whenToUse={["The persistent left navigation for a signed-in dashboard or app shell."]}
      goodToKnow={[
        "It expands on hover or keyboard focus on its own — you don't need to manage that state yourself.",
        "“CC + BA” (Corporate Card + Business Account) shows the full menu; “CC Only” shows the smaller card-only menu.",
      ]}
      code={`import { Sidebar } from "@statrys/web-ds";\n\n<Sidebar\n  accountType="ccBa"\n  activeKey="dashboard"\n  onNavigate={(key) => navigate(key)}\n/>`}
    >
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
        <div
          style={{
            flex: "1 1 480px",
            position: "relative",
            height: 500,
            background: "#f2f2f2",
            borderRadius: 8,
            overflow: "hidden",
            contain: "layout paint",
          }}
        >
          <Sidebar accountType={accountType} activeKey={activeKey} onNavigate={setActiveKey} expanded={pinned} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ControlGroupLabel>Layout</ControlGroupLabel>
            <DemoRadioGroup label="Account type" options={ACCOUNT_TYPES} value={accountType} onChange={setAccountType} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ControlGroupLabel>State</ControlGroupLabel>
            <Checkbox label="Pinned expanded" selected={pinned} onChange={setPinned} />
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

function PageHeaderDemo() {
  const [companyName, setCompanyName] = useState("ACME Corporation");
  const [profileInitials, setProfileInitials] = useState("JM");
  const [unread, setUnread] = useState(true);

  return (
    <ComponentPage
      id="page-header"
      title="Page Header"
      whatItIs="The dashboard's top bar — the business account switcher on the left, quick actions and account controls on the right."
      whenToUse={["The top of any signed-in dashboard page, usually paired with Sidebar."]}
      code={`import { PageHeader } from "@statrys/web-ds";\nimport { Send } from "lucide-react";\n\n<PageHeader\n  companyName="ACME Corporation"\n  primaryAction={{ label: "Make a payment", icon: <Send size={20} />, onClick: handlePay }}\n  secondaryActions={[\n    { label: "Convert Funds", onClick: handleConvert },\n    { label: "Add account", onClick: handleAddAccount },\n  ]}\n  unread\n  profileInitials="JM"\n/>`}
    >
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
        <div style={{ flex: "1 1 480px", background: "#f2f2f2", borderRadius: 8, overflow: "hidden" }}>
          <PageHeader
            companyName={companyName}
            primaryAction={{ label: "Make a payment", icon: <Send size={20} />, onClick: () => {} }}
            secondaryActions={[
              { label: "Convert Funds", onClick: () => {} },
              { label: "Add account", onClick: () => {} },
            ]}
            unread={unread}
            profileInitials={profileInitials}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 220, flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ControlGroupLabel>Text</ControlGroupLabel>
            <DemoField label="Company name" value={companyName} onChange={setCompanyName} />
            <DemoField label="Profile initials" value={profileInitials} onChange={setProfileInitials} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ControlGroupLabel>State</ControlGroupLabel>
            <Checkbox label="Unread notifications" selected={unread} onChange={setUnread} />
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}

function DashboardTemplateDemo() {
  const [title, setTitle] = useState("Page Title");
  const [accountType, setAccountType] = useState<(typeof ACCOUNT_TYPES)[number]>("ccBa");
  const [activeKey, setActiveKey] = useState("dashboard");

  return (
    <ComponentPage
      id="dashboard-template"
      title="Dashboard Template"
      whatItIs="The full app-shell page layout — Sidebar and PageHeader combined around a titled content area."
      whenToUse={["Any signed-in dashboard page — wrap the page's own content in it instead of rebuilding the shell each time."]}
      useInstead={[{ label: "Sidebar and PageHeader directly", because: "your page needs a different arrangement than this template's fixed layout." }]}
      code={`import { DashboardTemplate } from "@statrys/web-ds";\nimport { Send } from "lucide-react";\n\n<DashboardTemplate\n  title="Page Title"\n  sidebarProps={{ accountType: "ccBa", activeKey: "dashboard", onNavigate: navigate }}\n  pageHeaderProps={{\n    companyName: "ACME Corporation",\n    primaryAction: { label: "Make a payment", icon: <Send size={20} />, onClick: handlePay },\n    secondaryActions: [\n      { label: "Convert Funds", onClick: handleConvert },\n      { label: "Add account", onClick: handleAddAccount },\n    ],\n    unread: true,\n    profileInitials: "JM",\n  }}\n>\n  {/* page content */}\n</DashboardTemplate>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DemoField label="Page title" value={title} onChange={setTitle} />
        <div
          style={{
            position: "relative",
            height: 560,
            background: "#f2f2f2",
            borderRadius: 8,
            overflow: "hidden",
            contain: "layout paint",
          }}
        >
          <DashboardTemplate
            title={title}
            sidebarProps={{ accountType, activeKey, onNavigate: setActiveKey }}
            pageHeaderProps={{
              companyName: "ACME Corporation",
              primaryAction: { label: "Make a payment", icon: <Send size={20} />, onClick: () => {} },
              secondaryActions: [
                { label: "Convert Funds", onClick: () => {} },
                { label: "Add account", onClick: () => {} },
              ],
              unread: true,
              profileInitials: "JM",
            }}
          />
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
  if (item === "sidebar") return <SidebarDemo />;
  if (item === "page-header") return <PageHeaderDemo />;
  if (item === "dashboard-template") return <DashboardTemplateDemo />;
  return <div>Unknown component: {item}</div>;
}
