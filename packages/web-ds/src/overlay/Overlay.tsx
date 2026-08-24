import React from "react";
import styles from "./Overlay.module.css";

export type OverlayProps = {
  onClick?: () => void;
  className?: string;
};

// Full-bleed dark scrim behind a Modal (or any other floating surface).
// Purely presentational — no portal, no exit animation of its own; the
// caller mounts/unmounts it and, if it wants an exit fade, wraps it in its
// own transition (same "no positioning/animation of its own" convention as
// Tooltip). It does fade itself IN on mount via --overlay-duration, since
// that's the one thing every caller wants for free.
export function Overlay({ onClick, className }: OverlayProps) {
  return <div className={[styles.overlay, className].filter(Boolean).join(" ")} onClick={onClick} aria-hidden />;
}
