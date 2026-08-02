import React from "react";
import { Button } from "@statrys/web-ds";

/**
 * Custom Component Lib — components specific to Product A that compose
 * Core DS primitives. If another project ends up needing the exact same
 * component, promote it into packages/web-ds instead of copying it again
 * (see docs/contributing.md).
 */
export function SummaryCard({
  title,
  onAction,
}: {
  title: string;
  onAction?: () => void;
}) {
  return (
    <div className="summary-card">
      <h3>{title}</h3>
      <Button variant="secondary" size="sm" onClick={onAction}>
        View details
      </Button>
    </div>
  );
}
