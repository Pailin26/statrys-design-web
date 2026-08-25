import React, { useRef, useState } from "react";
import { Search, X, Mic } from "lucide-react";
import styles from "./SearchInput.module.css";

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Flags the field as invalid — red border, independent of focus/value. */
  error?: boolean;
  /** Voice-search action. When provided, a mic button shows whenever the clear button isn't (i.e. not focused with a value). */
  onMicClick?: () => void;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  disabled = false,
  error = false,
  onMicClick,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const showClear = focused && value.length > 0;

  return (
    <div
      className={[styles.container, disabled && styles.disabled, error && !disabled && styles.error]
        .filter(Boolean)
        .join(" ")}
    >
      <Search className={styles.icon} />
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {showClear ? (
        <button
          type="button"
          className={styles.action}
          // Without this, clicking the button blurs the input first, which
          // unmounts this very button (showClear flips to false) before the
          // click finishes — so onClick never fires. Keeping focus on the
          // input across the mousedown avoids that race.
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
        >
          <X className={styles.actionIcon} />
        </button>
      ) : (
        onMicClick && (
          <button
            type="button"
            className={styles.action}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onMicClick}
            disabled={disabled}
            aria-label="Search by voice"
          >
            <Mic className={styles.actionIcon} />
          </button>
        )
      )}
    </div>
  );
}
