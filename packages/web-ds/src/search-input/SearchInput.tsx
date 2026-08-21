import React from "react";
import { Search, X } from "lucide-react";
import styles from "./SearchInput.module.css";

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
};

export function SearchInput({ value, onChange, placeholder = "Search", size = "sm", disabled = false }: SearchInputProps) {
  const hasValue = value.length > 0;
  return (
    <div
      className={[styles.container, styles[size], disabled && styles.disabled, hasValue && styles.filled]
        .filter(Boolean)
        .join(" ")}
    >
      <Search className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {hasValue && !disabled && (
        <button type="button" className={styles.clear} onClick={() => onChange("")} aria-label="Clear search">
          <X className={styles.clearIcon} />
        </button>
      )}
    </div>
  );
}
