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
};

export function HorizontalTabs({ items, activeId, onChange, size = "md" }: HorizontalTabsProps) {
  return (
    <div role="tablist" className={styles.list}>
      {items.map((item) => (
        <Tab
          key={item.id}
          size={size}
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
