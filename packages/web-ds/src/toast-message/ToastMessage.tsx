import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "../link/Link";
import { XClose } from "../x-close/XClose";
import styles from "./ToastMessage.module.css";

export type ToastVariant = "default" | "success" | "error" | "warning";

// Filled status glyphs — Figma's icons here are a solid colored disc/triangle
// + white mark, not an outline icon like Banner's circle-check/octagon-alert/
// triangle-alert, so they're drawn directly (currentColor fill, same rounded
// mark geometry @statrys/app-ds's ToastMessage already ported from this same
// Figma component) rather than substituted with a differently-styled icon.
function SuccessIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx={10} cy={10} r={10} fill="currentColor" />
      <path d="M5.8 10.3L8.4 12.9L14.2 7.1" stroke="white" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ErrorIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx={10} cy={10} r={10} fill="currentColor" />
      <rect x={9.2} y={5} width={1.6} height={6.5} rx={0.8} fill="white" />
      <circle cx={10} cy={14} r={1} fill="white" />
    </svg>
  );
}
function WarningIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.3L18 17H2L10 2.3Z" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
      <rect x={9.2} y={7.5} width={1.6} height={5} rx={0.8} fill="white" />
      <circle cx={10} cy={14.3} r={1} fill="white" />
    </svg>
  );
}

const ICONS: Record<Exclude<ToastVariant, "default">, React.ComponentType> = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
};

export type ToastMessageProps = {
  variant?: ToastVariant;
  title: string;
  subtitle?: string;
  /** Optional trailing "View Details"-style link — omit for a plain toast. */
  action?: { label: string; onClick: () => void };
  onClose: () => void;
  className?: string;
};

// Dark inverse surface, an optional leading status icon, title + optional
// subtitle, an optional trailing link, and a close button. Purely
// presentational — no positioning, auto-hide timer, or enter/exit animation
// of its own; the caller mounts and places it.
export function ToastMessage({ variant = "default", title, subtitle, action, onClose, className }: ToastMessageProps) {
  const Icon = variant === "default" ? null : ICONS[variant];

  return (
    <div className={[styles.toast, variant !== "default" && styles[variant], className].filter(Boolean).join(" ")}>
      {Icon && (
        <span className={styles.icon}>
          <Icon />
        </span>
      )}
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <p className={styles.title}>{title}</p>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {action && (
          <Link size="sm" inverse iconRight={<ArrowUpRight size={16} strokeWidth={1.67} />} onClick={action.onClick}>
            {action.label}
          </Link>
        )}
      </div>
      <XClose size="sm" inverse onClick={onClose} aria-label="Dismiss" />
    </div>
  );
}
