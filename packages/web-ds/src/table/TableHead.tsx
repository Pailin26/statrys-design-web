import React from "react";
import styles from "./Table.module.css";

export type TableHeadProps = {
  /** Table.HeaderCell elements, one per column. */
  children: React.ReactNode;
  className?: string;
};

export function TableHead({ children, className }: TableHeadProps) {
  return (
    <div role="rowgroup" className={className}>
      <div role="row" className={styles.head}>
        {children}
      </div>
    </div>
  );
}
