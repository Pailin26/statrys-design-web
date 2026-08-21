import React from "react";
import styles from "./Button.module.css";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Dark-surface variant — cream fill / cream outline / cream text (Figma "Inverse"). */
  inverse?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  inverse = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={[styles.base, styles[variant], styles[size], inverse && styles.inverse]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
