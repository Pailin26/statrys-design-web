import React, { useState } from "react";
import { LayoutGrid, Wallet, ArrowLeftRight, UserRound, Shield, CreditCard, Sheet, Network, Building2, Users, Mail, FileText, SendToBack } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import statrysIcon from "./assets/statrys-icon.svg";
import statrysWordmark from "./assets/statrys-wordmark.svg";
import styles from "./Sidebar.module.css";

export type SidebarAccountType = "ccBa" | "ccOnly";

export type SidebarProps = {
  /** "ccBa" (Corporate Card + Business Account, Figma "CC + BA") shows the full nav; "ccOnly"
   *  (Figma "CC Only") shows the smaller card-only nav. */
  accountType?: SidebarAccountType;
  activeKey: string;
  onNavigate: (key: string) => void;
  /** Render each item as a real link instead of a button — return the URL for a given item key. */
  getHref?: (key: string) => string | undefined;
  /** Force the wide, labels-visible layout open regardless of hover/focus — e.g. a pinned mode.
   *  Hover and keyboard focus inside the nav always expand it either way. */
  expanded?: boolean;
};

type NavItemData = { key: string; icon: React.ReactNode; label: string };

/* "Team"'s Figma icon is a Streamline glyph, not part of the DS's lucide-react icon set — Network
   is used as the closest lucide equivalent (same "org structure" meaning), same kind of documented
   substitution as Badge's gradient fallback during the app-ds port. */
const CC_BA_PRIMARY: NavItemData[] = [
  { key: "dashboard", icon: <LayoutGrid size={20} />, label: "Dashboard" },
  { key: "accounts", icon: <Wallet size={20} />, label: "Accounts" },
  { key: "transactions", icon: <ArrowLeftRight size={20} />, label: "Transactions" },
  { key: "payees", icon: <UserRound size={20} />, label: "Payees" },
  { key: "secure-fx-risk", icon: <Shield size={20} />, label: "Secure FX Risk" },
  { key: "cards", icon: <CreditCard size={20} />, label: "Cards" },
  { key: "accounting", icon: <Sheet size={20} />, label: "Accounting" },
  { key: "team", icon: <Network size={20} />, label: "Team" },
];

const CC_BA_SECONDARY: NavItemData[] = [
  { key: "company-profile", icon: <Building2 size={20} />, label: "Company Profile" },
  { key: "organisation", icon: <Users size={20} />, label: "Organisation" },
  { key: "mailroom", icon: <Mail size={20} />, label: "Mailroom" },
  { key: "documents", icon: <FileText size={20} />, label: "Documents" },
  { key: "integrations", icon: <SendToBack size={20} />, label: "Integrations" },
];

const CC_ONLY_PRIMARY: NavItemData[] = [
  { key: "dashboard", icon: <LayoutGrid size={20} />, label: "Dashboard" },
  { key: "company-profile", icon: <Building2 size={20} />, label: "Company Profile" },
  { key: "organisation", icon: <Users size={20} />, label: "Organisation" },
  { key: "mailroom", icon: <Mail size={20} />, label: "Mailroom" },
  { key: "documents", icon: <FileText size={20} />, label: "Documents" },
];

/**
 * Sidebar — app-shell left navigation (Figma "LeftNavigation", nodes 1979-6544 + 2523-2026). A
 * narrow icon-only rail that expands to a wide frosted-glass panel with labels on hover or
 * keyboard focus (Figma "State: Default | Hover") — pass `expanded` to pin it open instead.
 */
export function Sidebar({ accountType = "ccBa", activeKey, onNavigate, getHref, expanded }: SidebarProps) {
  const [interactionExpanded, setInteractionExpanded] = useState(false);
  const isExpanded = expanded || interactionExpanded;

  const primary = accountType === "ccBa" ? CC_BA_PRIMARY : CC_ONLY_PRIMARY;
  const secondary = accountType === "ccBa" ? CC_BA_SECONDARY : null;

  const renderItem = (item: NavItemData) => (
    <SidebarItem
      key={item.key}
      icon={item.icon}
      label={item.label}
      expanded={isExpanded}
      active={item.key === activeKey}
      href={getHref?.(item.key)}
      onClick={() => onNavigate(item.key)}
    />
  );

  return (
    <nav
      className={[styles.root, isExpanded && styles.expanded].filter(Boolean).join(" ")}
      aria-label="Primary"
      onMouseEnter={() => setInteractionExpanded(true)}
      onMouseLeave={() => setInteractionExpanded(false)}
      onFocus={() => setInteractionExpanded(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setInteractionExpanded(false);
      }}
    >
      <div className={styles.logoSection}>
        <img src={statrysIcon} alt={isExpanded ? "" : "Statrys"} aria-hidden={isExpanded} className={styles.logoIcon} />
        <img
          src={statrysWordmark}
          alt="Statrys"
          className={[styles.logoWordmark, isExpanded && styles.logoWordmarkVisible].filter(Boolean).join(" ")}
        />
      </div>
      <div className={styles.group}>{primary.map(renderItem)}</div>
      {secondary && <div className={styles.group}>{secondary.map(renderItem)}</div>}
    </nav>
  );
}

export default Sidebar;
