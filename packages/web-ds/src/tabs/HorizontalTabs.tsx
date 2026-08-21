import React from "react";
import { Tab } from "./Tab";
import styles from "./HorizontalTabs.module.css";

export type TabItem = {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
};

export type HorizontalTabsProps = {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  size?: "md" | "lg";
  variant?: "button" | "underline";
};

export function HorizontalTabs({ items, activeId, onChange, size = "md", variant = "button" }: HorizontalTabsProps) {
  return (
    <div role="tablist" className={[styles.list, styles[variant]].join(" ")}>
      {items.map((item) => (
        <Tab
          key={item.id}
          size={size}
          variant={variant}
          active={item.id === activeId}
          icon={item.icon}
          badge={item.badge}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </Tab>
      ))}
    </div>
  );
}
