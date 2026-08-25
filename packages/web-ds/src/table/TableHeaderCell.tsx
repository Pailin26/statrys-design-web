import React from "react";
import styles from "./Table.module.css";

export type TableAlign = "left" | "center" | "right";

export type TableHeaderCellProps = {
  children: React.ReactNode;
  /** Pins this column to a fixed width; omit to share remaining space evenly with other unpinned columns. */
  width?: string;
  align?: TableAlign;
  className?: string;
};

export const ALIGN_CLASS: Record<TableAlign, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
};

export function TableHeaderCell({ children, width, align = "left", className }: TableHeaderCellProps) {
  return (
    <div
      role="columnheader"
      className={[styles.headerCellSizing, width ? styles.fixed : styles.grow, ALIGN_CLASS[align], styles.headerCell, className]
        .filter(Boolean)
        .join(" ")}
      style={width ? { width } : undefined}
    >
      {children}
    </div>
  );
}
