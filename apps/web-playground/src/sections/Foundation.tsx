// TODO: this reads @statrys/tokens' {primitives,semantic} source JSON
// directly since the build pipeline (tokens.css / tokens.js) isn't wired
// into this display page yet — swap to importing the built output once it is.
import neutralTokens from "@statrys/tokens/primitives/color/neutral.json";
import brandTokens from "@statrys/tokens/primitives/color/brand.json";
import statusTokens from "@statrys/tokens/primitives/color/status.json";
import alphaBlack from "@statrys/tokens/primitives/color/alpha/alpha-black.json";
import alphaBrand from "@statrys/tokens/primitives/color/alpha/alpha-brand.json";
import alphaWhite from "@statrys/tokens/primitives/color/alpha/alpha-white.json";
import spacingTokens from "@statrys/tokens/primitives/spacing.json";
import radiusTokens from "@statrys/tokens/primitives/radius.json";
import effectTokens from "@statrys/tokens/primitives/effect.json";
import motionTokens from "@statrys/tokens/primitives/motion.json";
import zIndexTokens from "@statrys/tokens/primitives/z-index.json";
import typographyTokens from "@statrys/tokens/primitives/typography.json";
import bgTokens from "@statrys/tokens/semantic/bg.json";
import typographySemanticTokens from "@statrys/tokens/semantic/typography.json";
import textTokens from "@statrys/tokens/semantic/text.json";
import iconTokens from "@statrys/tokens/semantic/icon.json";
import borderTokens from "@statrys/tokens/semantic/border.json";
import buttonTokens from "@statrys/tokens/semantic/button.json";
import linkTokens from "@statrys/tokens/semantic/link.json";
import fieldTokens from "@statrys/tokens/semantic/field.json";
import focusTokens from "@statrys/tokens/semantic/focus.json";
import scrollbarTokens from "@statrys/tokens/semantic/scrollbar.json";
import gradientTokens from "@statrys/tokens/semantic/gradient.json";
import miscTokens from "@statrys/tokens/semantic/misc.json";

type TokenLeaf = { value: string | number; type: string; comment?: string };
type TokenTree = { [key: string]: TokenTree | TokenLeaf };

function isLeaf(node: unknown): node is TokenLeaf {
  return !!node && typeof node === "object" && "value" in (node as object) && "type" in (node as object);
}

function flatten(tree: TokenTree, prefix: string[], out: Record<string, TokenLeaf>) {
  for (const [key, node] of Object.entries(tree)) {
    if (isLeaf(node)) out[[...prefix, key].join(".")] = node;
    else flatten(node as TokenTree, [...prefix, key], out);
  }
  return out;
}

// Every primitive, flattened, so semantic tokens' `{a.b.c}` refs resolve.
const PRIMITIVES: Record<string, TokenLeaf> = {};
flatten(neutralTokens as unknown as TokenTree, [], PRIMITIVES);
flatten(brandTokens as unknown as TokenTree, [], PRIMITIVES);
flatten(statusTokens as unknown as TokenTree, [], PRIMITIVES);
flatten({ alpha: { black: alphaBlack.alpha.black, brand: alphaBrand.alpha.brand, white: alphaWhite.alpha.white } } as unknown as TokenTree, [], PRIMITIVES);
flatten(typographyTokens as unknown as TokenTree, [], PRIMITIVES);

// Every semantic token, flattened, so cross-references (e.g. field.json -> bg.*) resolve too.
const SEMANTICS: Record<string, TokenLeaf> = {};
flatten(bgTokens as unknown as TokenTree, [], SEMANTICS);
flatten(textTokens as unknown as TokenTree, [], SEMANTICS);
flatten(iconTokens as unknown as TokenTree, [], SEMANTICS);
flatten(borderTokens as unknown as TokenTree, [], SEMANTICS);
flatten(buttonTokens as unknown as TokenTree, [], SEMANTICS);
flatten(linkTokens as unknown as TokenTree, [], SEMANTICS);
flatten(fieldTokens as unknown as TokenTree, [], SEMANTICS);
flatten(focusTokens as unknown as TokenTree, [], SEMANTICS);
flatten(scrollbarTokens as unknown as TokenTree, [], SEMANTICS);
flatten(gradientTokens as unknown as TokenTree, [], SEMANTICS);
flatten(miscTokens as unknown as TokenTree, [], SEMANTICS);
flatten(typographySemanticTokens as unknown as TokenTree, [], SEMANTICS);

function resolve(value: string | number): string {
  if (typeof value !== "string") return String(value);
  const ref = /^\{(.+)\}$/.exec(value);
  if (!ref) return value;
  const hit = PRIMITIVES[ref[1]] ?? SEMANTICS[ref[1]];
  return hit ? resolve(hit.value) : value;
}

function Leaf({ path, token }: { path: string; token: TokenLeaf }) {
  const resolved = resolve(token.value);
  const label = (
    <div>
      <div style={{ fontWeight: 600, fontFamily: "monospace", fontSize: 13 }}>{path}</div>
      <div style={{ fontFamily: "monospace", fontSize: 12, color: "#666", maxWidth: 560, wordBreak: "break-word" }}>
        {String(token.value) === resolved ? String(token.value) : `${token.value} → ${resolved}`}
      </div>
      {token.comment && <div style={{ fontSize: 11, color: "#999" }}>{token.comment}</div>}
    </div>
  );

  if (token.type === "color") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 6, border: "1px solid #e5e5e5", background: resolved, flexShrink: 0 }} />
        {label}
      </div>
    );
  }
  if (token.type === "gradient") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 96, height: 40, borderRadius: 6, border: "1px solid #e5e5e5", background: resolved, flexShrink: 0 }} />
        {label}
      </div>
    );
  }
  if (token.type === "shadow") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 60, height: 40, borderRadius: 6, background: "#fff", boxShadow: resolved, flexShrink: 0 }} />
        {label}
      </div>
    );
  }
  if (token.type === "dimension") {
    const px = parseFloat(resolved) || 0;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: Math.min(px, 200), height: 12, background: "#ff4a15", borderRadius: 2, flexShrink: 0 }} />
        {label}
      </div>
    );
  }
  if (token.type === "fontFamily") {
    return (
      <div>
        <div style={{ fontFamily: resolved, fontSize: 22 }}>The quick brown fox — Ag</div>
        {label}
      </div>
    );
  }
  if (token.type === "fontWeight") {
    return (
      <div>
        <div style={{ fontFamily: resolve("{font.primary}"), fontWeight: resolved as unknown as number, fontSize: 22 }}>
          The quick brown fox
        </div>
        {label}
      </div>
    );
  }
  if (token.type === "fontSize") {
    return (
      <div>
        <div style={{ fontFamily: resolve("{font.primary}"), fontSize: resolved, lineHeight: 1.2 }}>Ag Statrys</div>
        {label}
      </div>
    );
  }
  // number / duration / cubicBezier / transition / other — text-only row
  return <div>{label}</div>;
}

function TokenNodes({ prefix, tree }: { prefix: string; tree: TokenTree }) {
  return (
    <>
      {Object.entries(tree).map(([key, node]) => {
        const path = `${prefix}.${key}`;
        return isLeaf(node) ? (
          <Leaf key={path} path={path} token={node} />
        ) : (
          <TokenNodes key={path} prefix={path} tree={node as TokenTree} />
        );
      })}
    </>
  );
}

function Section({ title, prefix, tree }: { title: string; prefix: string; tree: TokenTree }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h3 style={{ fontSize: 16, marginBottom: 12, borderBottom: "1px solid #eee", paddingBottom: 6 }}>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TokenNodes prefix={prefix} tree={tree} />
      </div>
    </section>
  );
}

function Intro() {
  return (
    <p style={{ color: "#666" }}>
      Values sourced from <code>apa-statrys/accounting</code>, shared across{" "}
      <code>web-ds</code> and <code>app-ds</code> — see{" "}
      <a href="https://github.com/Pailin26/statrys-tokens">statrys-tokens</a>. Single theme
      only (no dark mode defined upstream yet).
    </p>
  );
}

// Keyed to match App.tsx's NAV ids exactly — one page per sidebar item.
const PAGES: Record<string, { title: string; render: () => JSX.Element }> = {
  colors: {
    title: "Colors",
    render: () => (
      <>
        <Section title="Neutral" prefix="neutral" tree={neutralTokens.neutral} />
        <Section title="Beige" prefix="beige" tree={neutralTokens.beige} />
        <Section title="Brand" prefix="brand" tree={brandTokens.brand} />
        <Section title="Green (success)" prefix="green" tree={statusTokens.green} />
        <Section title="Red (error)" prefix="red" tree={statusTokens.red} />
        <Section title="Yellow (warning)" prefix="yellow" tree={statusTokens.yellow} />
        <Section title="Blue (info)" prefix="blue" tree={statusTokens.blue} />
        <Section title="Alpha — Black" prefix="alpha.black" tree={alphaBlack.alpha.black} />
        <Section title="Alpha — White" prefix="alpha.white" tree={alphaWhite.alpha.white} />
        <Section title="Alpha — Brand" prefix="alpha.brand" tree={alphaBrand.alpha.brand} />
      </>
    ),
  },
  spacing: {
    title: "Spacing",
    render: () => <Section title="Spacing" prefix="space" tree={spacingTokens.space} />,
  },
  radius: {
    title: "Radius",
    render: () => (
      <>
        <Section title="Radius" prefix="radius" tree={radiusTokens.radius} />
        <Section title="Border width" prefix="borderWidth" tree={radiusTokens.borderWidth} />
      </>
    ),
  },
  effects: {
    title: "Effects",
    render: () => (
      <>
        <Section title="Shadow" prefix="shadow" tree={effectTokens.shadow} />
        <Section title="Blur" prefix="blur" tree={{ blur: effectTokens.blur } as unknown as TokenTree} />
      </>
    ),
  },
  motion: {
    title: "Motion",
    render: () => (
      <>
        <Section title="Duration" prefix="duration" tree={motionTokens.duration} />
        <Section title="Easing" prefix="easing" tree={motionTokens.easing} />
        <Section title="Transition" prefix="transition" tree={motionTokens.transition} />
      </>
    ),
  },
  "z-index": {
    title: "Z-index",
    render: () => <Section title="Z-index" prefix="zIndex" tree={zIndexTokens.zIndex} />,
  },
  typography: {
    title: "Typography",
    render: () => (
      <>
        <Section title="Font family" prefix="font" tree={typographyTokens.font} />
        <Section title="Font weight" prefix="fontWeight" tree={typographyTokens.fontWeight} />
        <Section title="Font size" prefix="fontSize" tree={typographyTokens.fontSize} />
      </>
    ),
  },
  bg: { title: "Background", render: () => <Section title="Background" prefix="bg" tree={bgTokens.bg} /> },
  text: { title: "Text", render: () => <Section title="Text" prefix="text" tree={textTokens.text} /> },
  icon: { title: "Icon", render: () => <Section title="Icon" prefix="icon" tree={iconTokens.icon} /> },
  border: { title: "Border", render: () => <Section title="Border" prefix="border" tree={borderTokens.border} /> },
  button: { title: "Button", render: () => <Section title="Button" prefix="button" tree={buttonTokens.button} /> },
  link: { title: "Link", render: () => <Section title="Link" prefix="link" tree={linkTokens.link} /> },
  field: { title: "Field", render: () => <Section title="Field" prefix="field" tree={fieldTokens.field} /> },
  focus: { title: "Focus", render: () => <Section title="Focus" prefix="focus" tree={focusTokens.focus} /> },
  scrollbar: {
    title: "Scrollbar",
    render: () => <Section title="Scrollbar" prefix="scrollbar" tree={scrollbarTokens.scrollbar} />,
  },
  gradient: {
    title: "Gradient",
    render: () => <Section title="Gradient" prefix="gradient" tree={gradientTokens.gradient} />,
  },
  misc: { title: "Misc", render: () => <Section title="Misc" prefix="misc" tree={miscTokens.misc} /> },
  "typography-semantic": {
    title: "Typography",
    render: () => (
      <Section title="Typography" prefix="typography" tree={typographySemanticTokens.typography} />
    ),
  },
};

export function Foundation({ item }: { item: string }) {
  const page = PAGES[item];
  if (!page) return <div style={{ maxWidth: 900 }}>Unknown page: {item}</div>;
  return (
    <div style={{ maxWidth: 900 }}>
      <h1>{page.title}</h1>
      <Intro />
      {page.render()}
    </div>
  );
}
