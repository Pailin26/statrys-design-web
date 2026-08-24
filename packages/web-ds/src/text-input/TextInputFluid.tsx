import React, { useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";
import styles from "./TextInputFluid.module.css";

export type TextInputFluidProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  tooltip?: string;
  dropdown?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Paints the focused border without real focus — Showcase-only, same convention as
   *  accounting's TextField/Search forceFocus. */
  forceFocus?: boolean;
};

export function TextInputFluid({
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  tooltip,
  dropdown = false,
  size = "sm",
  disabled = false,
  forceFocus = false,
}: TextInputFluidProps) {
  const [realFocused, setRealFocused] = useState(false);
  const focused = realFocused || forceFocus;
  const hasError = Boolean(error);
  const hasValue = value.length > 0;
  const floating = !disabled && (focused || hasValue || hasError);

  return (
    <div className={styles.root}>
      <div
        className={[
          styles.field,
          styles[size],
          disabled && styles.disabled,
          hasError && styles.error,
          !disabled && !hasError && focused && styles.focused,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.content}>
          {floating && (
            <div className={styles.row}>
              <span className={[styles.floatingLabel, hasError && styles.errorText].filter(Boolean).join(" ")}>
                {label}
              </span>
              {tooltip && <CircleHelp className={styles.tooltipIconSm} aria-label={tooltip} title={tooltip} />}
            </div>
          )}
          <div className={styles.row}>
            <input
              className={styles.input}
              value={value}
              disabled={disabled}
              placeholder={floating ? placeholder : label}
              onFocus={() => setRealFocused(true)}
              onBlur={() => setRealFocused(false)}
              onChange={(event) => onChange(event.target.value)}
            />
            {!floating && tooltip && (
              <CircleHelp className={styles.tooltipIcon} aria-label={tooltip} title={tooltip} />
            )}
          </div>
        </div>
        {dropdown && <ChevronDown className={styles.dropdownIcon} />}
      </div>
      {(hint || error) && (
        <p className={[styles.hint, hasError && styles.errorText, disabled && styles.disabledText].filter(Boolean).join(" ")}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
