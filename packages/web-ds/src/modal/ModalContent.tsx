import React from "react";
import styles from "./Modal.module.css";

export type ModalContentProps = {
  children: React.ReactNode;
  /** Extra breathing room above the content — Figma's "PaddingTop" slot (one space-12 spacer). */
  paddingTop?: boolean;
  /** Extra breathing room below the content — Figma's "PaddingBottom" slot (one space-12 spacer). */
  paddingBottom?: boolean;
  className?: string;
};

export function ModalContent({ children, paddingTop = false, paddingBottom = false, className }: ModalContentProps) {
  return (
    <div className={[styles.content, className].filter(Boolean).join(" ")}>
      {paddingTop && <div className={styles.spacer} />}
      <div className={styles.contentRow}>{children}</div>
      {paddingBottom && <div className={styles.spacer} />}
    </div>
  );
}
