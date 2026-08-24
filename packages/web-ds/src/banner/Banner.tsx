import React from "react";
import { CircleCheck, TriangleAlert, OctagonAlert, Info, X } from "lucide-react";
import { Link } from "../link/Link";
import styles from "./Banner.module.css";

export type BannerColor = "success" | "warning" | "error" | "info";

const ICONS: Record<BannerColor, typeof CircleCheck> = {
  success: CircleCheck,
  warning: TriangleAlert,
  error: OctagonAlert,
  info: Info,
};

export type BannerProps = {
  color: BannerColor;
  text: string;
  /** Bold headline above `text` (Figma "Title + Text") — omit for "Text only". */
  title?: string;
  /** Trailing text link — shown when `onLinkClick` is provided. */
  linkLabel?: string;
  onLinkClick?: () => void;
  /** Dismiss (×) button — shown when provided. */
  onDismiss?: () => void;
  /** Full-bleed page-width bar (square corners, bottom border only) instead of the
   *  default rounded card (border on all sides) — Figma's "fullWidth" variant. */
  fullWidth?: boolean;
  className?: string;
};

export function Banner({
  color,
  text,
  title,
  linkLabel = "View Details",
  onLinkClick,
  onDismiss,
  fullWidth = false,
  className,
}: BannerProps) {
  const Icon = ICONS[color];

  return (
    <div
      className={[styles.banner, styles[color], fullWidth ? styles.fullWidth : styles.card, className]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon className={styles.icon} size={16} strokeWidth={1.67} />
      <div className={styles.body}>
        <div className={styles.textGroup}>
          {title && <p className={styles.title}>{title}</p>}
          <p className={title ? styles.textCaption : styles.text}>{text}</p>
        </div>
        {onLinkClick && (
          <Link size="sm" onClick={onLinkClick}>
            {linkLabel}
          </Link>
        )}
      </div>
      {onDismiss && (
        <button type="button" className={styles.close} onClick={onDismiss} aria-label="Dismiss">
          <X size={20} strokeWidth={1.67} />
        </button>
      )}
    </div>
  );
}
