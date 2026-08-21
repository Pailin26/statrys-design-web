import React from "react";
import styles from "./Button.module.css";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Dark-surface variant — cream fill / cream outline / cream text (Figma "Inverse"). Not available for Shape=Square/Circle — Figma has no inverse icon-only variants. */
  inverse?: boolean;
  onClick?: () => void;
};

type ButtonRecProps = ButtonBaseProps & {
  /** Figma Shape=Rec (default) or Rounded — a labeled button. */
  shape?: "rec" | "rounded";
  children: React.ReactNode;
};

type ButtonIconProps = ButtonBaseProps & {
  /** Figma Shape=Square or Circle — an icon-only button, no label. */
  shape: "square" | "circle";
  icon: React.ReactNode;
  "aria-label": string;
};

export type ButtonProps = ButtonRecProps | ButtonIconProps;

function isIconShape(props: ButtonProps): props is ButtonIconProps {
  return props.shape === "square" || props.shape === "circle";
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", disabled = false, inverse = false, onClick } = props;
  const shape = props.shape ?? "rec";

  const className = [styles.base, styles[variant], styles[size], styles[shape], inverse && styles.inverse]
    .filter(Boolean)
    .join(" ");

  if (isIconShape(props)) {
    return (
      <button className={className} disabled={disabled} onClick={onClick} aria-label={props["aria-label"]}>
        {props.icon}
      </button>
    );
  }

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {props.children}
    </button>
  );
}
