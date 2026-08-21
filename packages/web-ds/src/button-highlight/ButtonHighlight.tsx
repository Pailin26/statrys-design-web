import React from "react";
import styles from "./ButtonHighlight.module.css";

export type ButtonHighlightProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
};

export function ButtonHighlight({
  variant = "primary",
  size = "md",
  disabled = false,
  iconLeft,
  iconRight,
  children,
  onClick,
}: ButtonHighlightProps) {
  return (
    <button
      className={[styles.base, styles[variant], styles[size]].filter(Boolean).join(" ")}
      disabled={disabled}
      onClick={onClick}
    >
      {iconLeft}
      <span className={variant === "secondary" ? styles.secondaryLabel : undefined}>{children}</span>
      {iconRight}
    </button>
  );
}
