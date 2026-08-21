import { useEffect, useRef, useState } from "react";

export type TabBarProps<T extends string> = {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  variant?: "top" | "inline";
};

export function TabBar<T extends string>({ tabs, active, onChange, variant = "inline" }: TabBarProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeEl = container.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (activeEl) setIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
  }, [active, tabs]);

  return (
    <div className={`tabbar tabbar-${variant}`} ref={containerRef}>
      {tabs.map((tab) => (
        <button
          key={tab}
          data-tab={tab}
          className={"tabbar-item" + (tab === active ? " active" : "")}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
      {indicator && (
        <div className="tabbar-indicator" style={{ left: indicator.left, width: indicator.width }} />
      )}
    </div>
  );
}
