import React from "react";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { TableRow } from "./TableRow";
import { TableHeaderCell } from "./TableHeaderCell";
import { TableCell } from "./TableCell";
import styles from "./Table.module.css";

export type TableProps = {
  /** Table.Head, then Table.Body. */
  children: React.ReactNode;
  className?: string;
};

// A generic, content-agnostic row/column layout — rounded card with a
// labeled header row above a stack of data rows. Composed from Table.Head
// (one Table.HeaderCell per column), Table.Body (Table.Row, each holding
// one Table.Cell per column). A cell's children can be anything — plain
// text, an icon + label, a badge, an icon button — Table only owns spacing,
// alignment, and column widths, never cell content or its typography.
function TableRoot({ children, className }: TableProps) {
  return (
    <div role="table" className={[styles.table, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
});
