import React from "react";
import styles from "./Toggle.module.css";

export type ToggleProps = {
  selected?: boolean;
  disabled?: boolean;
  onChange?: (selected: boolean) => void;
  "aria-label"?: string;
};

export function Toggle({ selected = false, disabled = false, onChange, "aria-label": ariaLabel }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={selected}
      aria-label={ariaLabel}
      disabled={disabled}
      className={[styles.track, selected && styles.selected].filter(Boolean).join(" ")}
      onClick={() => onChange?.(!selected)}
    >
      <span className={styles.knob} />
    </button>
  );
}
