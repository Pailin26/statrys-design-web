import React from "react";
import { Button } from "../button/Button";
import styles from "./Modal.module.css";

export type ModalFooterProps = {
  primaryLabel: string;
  onPrimary?: () => void;
  /** Secondary (outline) button — shown only when a label is provided. */
  secondaryLabel?: string;
  onSecondary?: () => void;
  /** Figma "filled" — both buttons stretch to split the row evenly instead of
   *  sitting auto-width at the end. */
  filled?: boolean;
  className?: string;
};

export function ModalFooter({
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  filled = false,
  className,
}: ModalFooterProps) {
  // Button has no className prop to stretch it directly, so "filled" wraps
  // each button in a flex:1 container instead (styles.filledButton also
  // stretches Button's own <button> to fill that wrapper).
  const wrap = (node: React.ReactNode) => (filled ? <div className={styles.filledButton}>{node}</div> : node);

  return (
    <div className={[styles.footer, filled && styles.footerFilled, className].filter(Boolean).join(" ")}>
      {secondaryLabel &&
        wrap(
          <Button variant="secondary" size="md" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        )}
      {wrap(
        <Button variant="primary" size="md" onClick={onPrimary}>
          {primaryLabel}
        </Button>
      )}
    </div>
  );
}
