import React from "react";
import { ModalHeader } from "./ModalHeader";
import { ModalContent } from "./ModalContent";
import { ModalFooter } from "./ModalFooter";
import styles from "./Modal.module.css";

export type ModalProps = {
  /** Modal.Header / Modal.Content / Modal.Footer, in that order. */
  children: React.ReactNode;
  className?: string;
};

// The dialog card — fixed, viewport-centered, above Overlay's z-index.
// Composed from Modal.Header / Modal.Content / Modal.Footer; mount an
// Overlay alongside it (a sibling, not a child) for the dimmed backdrop.
function ModalRoot({ children, className }: ModalProps) {
  return <div className={[styles.modal, className].filter(Boolean).join(" ")} role="dialog" aria-modal="true">{children}</div>;
}

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
});
