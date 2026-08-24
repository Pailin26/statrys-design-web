import { useEffect, useState } from "react";
import { Foundation } from "./sections/Foundation";
import { WebDS } from "./sections/WebDS";
import { TabBar } from "./TabBar";

export type Tab = "foundation" | "components";

type NavGroup = { group: string; items: { id: string; label: string }[] };

const TABS: { id: Tab; label: string }[] = [
  { id: "foundation", label: "Foundation" },
  { id: "components", label: "Components" },
];

const NAV: Record<Tab, NavGroup[]> = {
  foundation: [
    {
      group: "Primitives",
      items: [
        { id: "colors", label: "Colors" },
        { id: "spacing", label: "Spacing" },
        { id: "radius", label: "Radius" },
        { id: "effects", label: "Effects" },
        { id: "motion", label: "Motion" },
        { id: "z-index", label: "Z-index" },
        { id: "typography", label: "Typography" },
      ],
    },
    {
      group: "Semantic",
      items: [
        { id: "bg", label: "Background" },
        { id: "text", label: "Text" },
        { id: "icon", label: "Icon" },
        { id: "border", label: "Border" },
        { id: "button", label: "Button" },
        { id: "link", label: "Link" },
        { id: "field", label: "Field" },
        { id: "focus", label: "Focus" },
        { id: "scrollbar", label: "Scrollbar" },
        { id: "gradient", label: "Gradient" },
        { id: "misc", label: "Misc" },
        { id: "typography-semantic", label: "Typography" },
      ],
    },
  ],
  components: [
    {
      group: "Forms and input",
      items: [
        { id: "button", label: "Button" },
        { id: "button-highlight", label: "Button Highlight" },
        { id: "checkbox", label: "Checkbox" },
        { id: "radio", label: "Radio" },
        { id: "toggle", label: "Toggle" },
        { id: "search-input", label: "Search Input" },
        { id: "text-input-fluid", label: "Text Input Fluid" },
      ],
    },
    {
      group: "Navigation",
      items: [
        { id: "link", label: "Link" },
        { id: "horizontal-tabs", label: "Horizontal Tabs" },
      ],
    },
    {
      group: "Feedback",
      items: [
        { id: "tooltip", label: "Tooltip" },
        { id: "banner", label: "Banner" },
        { id: "toast-message", label: "Toast Message" },
        { id: "x-close", label: "X Close" },
      ],
    },
  ],
};

function firstItem(tab: Tab): string {
  return NAV[tab][0].items[0].id;
}

function parseHash(): { tab: Tab; item: string } {
  const [rawTab, rawItem] = window.location.hash.replace("#", "").split("/");
  const tab: Tab = rawTab === "components" ? rawTab : "foundation";
  const validItem = NAV[tab].some((g) => g.items.some((i) => i.id === rawItem));
  return { tab, item: validItem ? rawItem : firstItem(tab) };
}

function useRoute() {
  const [route, setRoute] = useState(parseHash());
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = (tab: Tab, item?: string) => {
    const next = { tab, item: item ?? firstItem(tab) };
    window.location.hash = `${next.tab}/${next.item}`;
    setRoute(next);
  };
  return { route, go };
}

export function App() {
  const { route, go } = useRoute();

  return (
    <div className="shell">
      <header className="topnav">
        <div className="topnav-mark" />
        <div className="topnav-title">Statrys Design System — Web</div>
        <TabBar
          variant="top"
          tabs={TABS.map((t) => t.id)}
          active={route.tab}
          onChange={(id) => go(id)}
        />
      </header>
      <div className="body">
        <nav className="sidebar">
          {NAV[route.tab].map((g) => (
            <div className="nav-group" key={g.group}>
              <div className="nav-group-label">{g.group}</div>
              {g.items.map((item) => (
                <button
                  key={item.id}
                  className={"nav-item" + (route.item === item.id ? " active" : "")}
                  onClick={() => go(route.tab, item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <main className="content">
          {route.tab === "foundation" && <Foundation item={route.item} />}
          {route.tab === "components" && <WebDS item={route.item} />}
        </main>
      </div>
    </div>
  );
}
