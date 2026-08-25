import React from "react";
import styles from "./Table.module.css";
import { ALIGN_CLASS, type TableAlign } from "./TableHeaderCell";

export type TableCellProps = {
  /** Anything — plain text, an icon + label, a badge, an icon button. Table only lays the cell out; it never dictates content or typography. */
  children: React.ReactNode;
  /** Must match the sibling Table.HeaderCell's width for this column. */
  width?: string;
  align?: TableAlign;
  className?: string;
};

export function TableCell({ children, width, align = "left", className }: TableCellProps) {
  return (
    <div
      role="cell"
      className={[styles.cell, width ? styles.fixed : styles.grow, ALIGN_CLASS[align], className].filter(Boolean).join(" ")}
      style={width ? { width } : undefined}
    >
      {children}
    </div>
  );
}
