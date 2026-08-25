import React from "react";
import styles from "./Table.module.css";

export type TableBodyProps = {
  /** Table.Row elements. */
  children: React.ReactNode;
  className?: string;
};

export function TableBody({ children, className }: TableBodyProps) {
  return (
    <div role="rowgroup" className={[styles.body, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
