import React from "react";
import styles from "./Table.module.css";

export type TableRowProps = {
  /** Table.Cell elements, one per column, in the same order/widths as Table.Head's Table.HeaderCells. */
  children: React.ReactNode;
  /** Makes the row clickable — adds hover feedback and keyboard (Enter/Space) activation. */
  onClick?: () => void;
  className?: string;
};

export function TableRow({ children, onClick, className }: TableRowProps) {
  const interactive = Boolean(onClick);

  return (
    <div
      role="row"
      className={[styles.row, interactive && styles.interactive, className].filter(Boolean).join(" ")}
      onClick={onClick}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
