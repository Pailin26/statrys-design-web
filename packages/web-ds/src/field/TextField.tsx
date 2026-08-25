import React from "react";
import { ChevronDown } from "lucide-react";
import styles from "./TextField.module.css";

export type TextFieldOption = { value: string; label: string };

export type TextFieldAffordance = {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
};

export type TextFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "tel" | "email" | "number";
  disabled?: boolean;
  /** Flags the field as invalid — red border/background, independent of focus/value. */
  error?: boolean;
  /** "Left Icon" type — a leading icon inside the field. */
  leadingIcon?: React.ReactNode;
  /** "Date picker" type (or any other decorative/clickable trailing icon). Opening an actual calendar is left to the caller. */
  trailingIcon?: React.ReactNode;
  onTrailingIconClick?: () => void;
  /** "Mobile Number"/"Currency" type — a clickable code chip before the input (flag/icon + code + chevron). Opening the actual picker is left to onClick, same as onTrailingIconClick. */
  prefix?: TextFieldAffordance;
  /** "Unit" type — a clickable chip after the input. */
  suffix?: TextFieldAffordance;
  /** "Dropdown" type — renders as a real native <select> instead of a text input. */
  options?: TextFieldOption[];
  id?: string;
  className?: string;
};

export function TextField({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  error = false,
  leadingIcon,
  trailingIcon,
  onTrailingIconClick,
  prefix,
  suffix,
  options,
  id,
  className,
}: TextFieldProps) {
  const isSelect = Boolean(options && options.length > 0);

  return (
    <div
      className={[styles.container, disabled && styles.disabled, error && !disabled && styles.error, className]
        .filter(Boolean)
        .join(" ")}
    >
      {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}

      {prefix && (
        <button
          type="button"
          className={styles.chip}
          onMouseDown={(event) => event.preventDefault()}
          onClick={prefix.onClick}
          disabled={disabled}
        >
          {prefix.icon && <span className={styles.chipIcon}>{prefix.icon}</span>}
          <span>{prefix.label}</span>
          <ChevronDown className={styles.chevron} />
        </button>
      )}

      {isSelect ? (
        <select
          id={id}
          className={[styles.input, !value && styles.placeholder].filter(Boolean).join(" ")}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options!.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          className={styles.input}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      {isSelect && <ChevronDown className={styles.dropdownChevron} />}

      {suffix && (
        <button
          type="button"
          className={styles.chip}
          onMouseDown={(event) => event.preventDefault()}
          onClick={suffix.onClick}
          disabled={disabled}
        >
          <span>{suffix.label}</span>
          <ChevronDown className={styles.chevron} />
        </button>
      )}

      {!isSelect &&
        trailingIcon &&
        (onTrailingIconClick ? (
          <button
            type="button"
            className={styles.iconButton}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onTrailingIconClick}
            disabled={disabled}
          >
            {trailingIcon}
          </button>
        ) : (
          <span className={styles.icon}>{trailingIcon}</span>
        ))}
    </div>
  );
}
