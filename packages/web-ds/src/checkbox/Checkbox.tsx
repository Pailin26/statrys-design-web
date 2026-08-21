import React from "react";
import { Check, Minus } from "lucide-react";
import styles from "./Checkbox.module.css";

export type CheckboxProps = {
  label: string;
  description?: string;
  size?: "sm" | "md";
  selected?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (selected: boolean) => void;
};

export function Checkbox({
  label,
  description,
  size = "sm",
  selected = false,
  indeterminate = false,
  disabled = false,
  onChange,
}: CheckboxProps) {
  return (
    <label className={[styles.root, description && styles.withDescription].filter(Boolean).join(" ")}>
      <span className={[styles.wrapper, styles[size]].join(" ")}>
        <input
          type="checkbox"
          className={styles.input}
          checked={selected}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
        />
        <span
          className={[styles.box, styles[size], selected && styles.selected, indeterminate && styles.indeterminate]
            .filter(Boolean)
            .join(" ")}
        >
          {selected && (indeterminate ? <Minus className={styles.icon} /> : <Check className={styles.icon} />)}
        </span>
      </span>
      <span className={styles.text}>
        <span className={[styles.label, description && styles.labelWithDescription].filter(Boolean).join(" ")}>
          {label}
        </span>
        {description && <span className={styles.description}>{description}</span>}
      </span>
    </label>
  );
}
