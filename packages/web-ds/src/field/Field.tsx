import React from "react";
import { TextField } from "./TextField";
import { TextArea } from "./TextArea";
import styles from "./Field.module.css";

export type FieldProps = {
  label: string;
  mandatory?: boolean;
  /** Helper text below the control. Replaced by `error` when present. */
  hint?: string;
  /** Presence (not a boolean) is the error state. Replaces `hint` and turns the asterisk/caption red. */
  error?: string;
  /** Field.TextField, Field.TextArea, or a native select — Figma's Fields node always wraps exactly one TextFields-shaped control, not arbitrary content. */
  children: React.ReactNode;
  className?: string;
};

// Label + optional "*" + a control + a hint/error caption below it. In
// Figma, "Fields" (node 4011-4962) and "TextFields" (4011-4993) are the
// same component — Fields always wraps exactly one TextFields instance, not
// an arbitrary slot — so TextField/TextArea are exposed only as
// Field.TextField/Field.TextArea, the same compound pattern as
// Modal.Header/Content/Footer, rather than as standalone top-level exports.
// A <label> wrapping the control gives implicit label-for-control
// association for free — no id/htmlFor wiring needed.
function FieldRoot({ label, mandatory = false, hint, error, children, className }: FieldProps) {
  const caption = error || hint;

  return (
    <label className={[styles.root, className].filter(Boolean).join(" ")}>
      <span className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        {mandatory && <span className={[styles.label, error && styles.error].filter(Boolean).join(" ")}>*</span>}
      </span>
      {children}
      {caption && <p className={[styles.caption, error && styles.error].filter(Boolean).join(" ")}>{caption}</p>}
    </label>
  );
}

export const Field = Object.assign(FieldRoot, {
  TextField,
  TextArea,
});
