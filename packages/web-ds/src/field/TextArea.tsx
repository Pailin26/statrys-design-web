import React from "react";
import styles from "./TextArea.module.css";

export type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Flags the field as invalid — red border/background, independent of focus/value. */
  error?: boolean;
  rows?: number;
  id?: string;
  className?: string;
};

export function TextArea({ value, onChange, placeholder, disabled = false, error = false, rows, id, className }: TextAreaProps) {
  return (
    <textarea
      id={id}
      className={[styles.textarea, error && !disabled && styles.error, className].filter(Boolean).join(" ")}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
