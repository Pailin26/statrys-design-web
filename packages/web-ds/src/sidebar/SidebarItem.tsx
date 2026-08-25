import React from "react";
import styles from "./SidebarItem.module.css";

export type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  /** Whether the parent Sidebar is currently in its expanded (hover/focus/pinned) layout — controls
   *  whether the label is visible. Driven entirely by Sidebar, not this component's own state. */
  expanded: boolean;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
};

/** A single Sidebar row (Figma "LeftNavigationMenu", node 1979-6544). */
export function SidebarItem({ icon, label, expanded, active = false, disabled = false, href, onClick }: SidebarItemProps) {
  const className = [styles.item, active && styles.active, disabled && styles.disabled].filter(Boolean).join(" ");
  const content = (
    <>
      <span className={styles.icon}>{icon}</span>
      <span className={[styles.label, expanded && styles.labelVisible].filter(Boolean).join(" ")}>{label}</span>
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={className} aria-current={active ? "page" : undefined} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={className} disabled={disabled} aria-current={active ? "page" : undefined} onClick={onClick}>
      {content}
    </button>
  );
}

export default SidebarItem;
