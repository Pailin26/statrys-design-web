import React from "react";
import { X } from "lucide-react";
import styles from "./XClose.module.css";

export type XCloseSize = "sm" | "md";

export type XCloseProps = {
  size?: XCloseSize;
  /** Light-on-dark palette for dark surfaces (e.g. ToastMessage). */
  inverse?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  className?: string;
};

const GLYPH_SIZE: Record<XCloseSize, number> = { sm: 10, md: 16 };

export function XClose({ size = "sm", inverse = false, onClick, "aria-label": ariaLabel = "Close", className }: XCloseProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={[styles.base, styles[size], inverse && styles.inverse, className].filter(Boolean).join(" ")}
    >
      <X size={GLYPH_SIZE[size]} strokeWidth={1.67} />
    </button>
  );
}
