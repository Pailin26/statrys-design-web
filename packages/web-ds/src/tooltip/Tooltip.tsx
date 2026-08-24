import React from "react";
import styles from "./Tooltip.module.css";

export type TooltipArrow = "none" | "top" | "bottom" | "bottom-left" | "bottom-right" | "left" | "right";

export type TooltipProps = {
  title: string;
  /** Supporting text under the title — enables the wide two-line layout. */
  description?: string;
  /** Dark bubble for light surfaces (default beige bubble is for dark surfaces). */
  inverse?: boolean;
  /** Which side the arrow sits on / points toward. */
  arrow?: TooltipArrow;
  className?: string;
};

// Rounded 16x8.5 triangle from Figma, drawn pointing down; rotated per direction —
// same path @statrys/app-ds's Tooltip uses for this exact Figma component, so both
// platforms render the identical shape instead of two hand-traced approximations.
const ARROW_PATH =
  "M14.0711 0C14.962 0 15.4081 1.07714 14.7782 1.70711L8.70711 7.77818C8.31658 8.16871 7.68342 8.16871 7.29289 7.77818L1.22183 1.70711C0.591867 1.07714 1.03803 0 1.92894 0H14.0711Z";

function Arrow({ dir, className }: { dir: "up" | "down" | "left" | "right"; className: string }) {
  const sideways = dir === "left" || dir === "right";
  const transform =
    dir === "up"
      ? "rotate(180 8 4.2574)"
      : dir === "left"
        ? "translate(8.5147 0) rotate(90)"
        : dir === "right"
          ? "translate(0 16) rotate(-90)"
          : undefined;
  return (
    <svg
      className={className}
      width={sideways ? 8.5147 : 16}
      height={sideways ? 16 : 8.5147}
      viewBox={sideways ? "0 0 8.5147 16" : "0 0 16 8.5147"}
      fill="none"
      aria-hidden="true"
    >
      <path d={ARROW_PATH} fill="currentColor" transform={transform} />
    </svg>
  );
}

const ARROW_MARGIN_CLASS: Record<TooltipArrow, string> = {
  none: "",
  top: styles.arrowMarginTop,
  bottom: styles.arrowMarginBottom,
  "bottom-left": `${styles.arrowMarginBottom} ${styles.arrowOffsetLeft}`,
  "bottom-right": `${styles.arrowMarginBottom} ${styles.arrowOffsetRight}`,
  left: styles.arrowMarginLeft,
  right: styles.arrowMarginRight,
};

export function Tooltip({ title, description, inverse = false, arrow = "none", className }: TooltipProps) {
  const arrowBefore = arrow === "top" || arrow === "left";
  const arrowDir = arrow === "top" ? "up" : arrow === "left" ? "left" : arrow === "right" ? "right" : "down";
  const sideways = arrow === "left" || arrow === "right";
  const arrowClassName = [styles.arrow, inverse && styles.arrowInverse, ARROW_MARGIN_CLASS[arrow]]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={[
        styles.root,
        sideways ? styles.row : styles.column,
        arrow === "bottom-left" && styles.alignStart,
        arrow === "bottom-right" && styles.alignEnd,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {arrowBefore && <Arrow dir={arrowDir} className={arrowClassName} />}
      <div
        className={[styles.bubble, inverse && styles.bubbleInverse, description ? styles.bubbleWithDescription : styles.bubbleTitleOnly]
          .filter(Boolean)
          .join(" ")}
      >
        <p className={[styles.title, inverse && styles.titleInverse, !description && styles.titleOnly].filter(Boolean).join(" ")}>
          {title}
        </p>
        {description && (
          <p className={[styles.description, inverse && styles.descriptionInverse].filter(Boolean).join(" ")}>{description}</p>
        )}
      </div>
      {!arrowBefore && arrow !== "none" && <Arrow dir={arrowDir} className={arrowClassName} />}
    </div>
  );
}
