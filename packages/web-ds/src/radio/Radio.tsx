import React from "react";
import styles from "./Radio.module.css";

export type RadioProps = {
  selected?: boolean;
  size?: "sm" | "md";
  disabled?: boolean;
  onChange?: () => void;
  name?: string;
  value?: string;
  "aria-label"?: string;
};

export function Radio({ selected = false, size = "sm", disabled = false, onChange, name, value, "aria-label": ariaLabel }: RadioProps) {
  return (
    <span className={[styles.wrapper, styles[size]].join(" ")}>
      <input
        type="radio"
        className={styles.input}
        checked={selected}
        disabled={disabled}
        onChange={() => onChange?.()}
        name={name}
        value={value}
        aria-label={ariaLabel}
      />
      <span className={[styles.circle, styles[size], selected && styles.selected].filter(Boolean).join(" ")}>
        {selected && <span className={[styles.dot, styles[size]].join(" ")} />}
      </span>
    </span>
  );
}
