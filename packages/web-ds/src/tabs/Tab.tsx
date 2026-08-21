import React from "react";
import styles from "./Tab.module.css";

export type TabProps = {
  size?: "md" | "lg";
  active?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
};

export function Tab({ size = "md", active = false, icon, badge, children, onClick }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={[styles.tab, styles[size], active && styles.active].filter(Boolean).join(" ")}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {badge !== undefined && <span className={styles.badge}>{badge}</span>}
    </button>
  );
}
