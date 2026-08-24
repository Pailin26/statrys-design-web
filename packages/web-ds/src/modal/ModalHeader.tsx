import React from "react";
import { XClose } from "../x-close/XClose";
import styles from "./Modal.module.css";

export type ModalHeaderProps = {
  title: string;
  /** Supporting text under the title — omit for a title-only header. */
  description?: string;
  /** Close (×) button — shown only when provided. */
  onClose?: () => void;
  className?: string;
};

export function ModalHeader({ title, description, onClose, className }: ModalHeaderProps) {
  return (
    <div className={[styles.header, className].filter(Boolean).join(" ")}>
      <div className={styles.headerText}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {onClose && <XClose size="md" onClick={onClose} aria-label="Close" />}
    </div>
  );
}
