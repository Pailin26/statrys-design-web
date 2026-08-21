import React from "react";
import styles from "./Link.module.css";

export type LinkProps = {
  size?: "sm" | "md" | "lg";
  /** Dark-surface variant — cream text (Figma "Inverse"). */
  inverse?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  href?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function Link({
  size = "md",
  inverse = false,
  disabled = false,
  iconLeft,
  iconRight,
  href,
  children,
  onClick,
}: LinkProps) {
  return (
    <a
      className={[styles.base, styles[size], inverse && styles.inverse, disabled && styles.disabled]
        .filter(Boolean)
        .join(" ")}
      // A disabled <a> has no native semantics of its own — drop href so it
      // isn't reachable/navigable, and aria-disabled + pointer-events (in
      // CSS) cover the rest.
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      onClick={disabled ? (event) => event.preventDefault() : onClick}
    >
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </a>
  );
}
