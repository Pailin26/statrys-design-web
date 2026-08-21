import React from "react";
import { LucideProvider } from "lucide-react";

export type IconProviderProps = {
  children: React.ReactNode;
};

/**
 * Wrap the app root with this once so every Lucide icon rendered anywhere —
 * inside web-ds components or in consumer code — defaults to strokeWidth=1
 * (Lucide's own default is 2) without each usage having to pass it
 * explicitly. Import icons directly from "lucide-react"; this only sets the
 * shared default, it doesn't re-export the icon set.
 */
export function IconProvider({ children }: IconProviderProps) {
  return <LucideProvider strokeWidth={1}>{children}</LucideProvider>;
}
