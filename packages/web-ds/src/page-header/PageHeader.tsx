import React from "react";
import { ChevronDown, Bell } from "lucide-react";
import styles from "./PageHeader.module.css";

export type PageHeaderAction = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export type PageHeaderProps = {
  /** Business-account switcher label (Figma "BusinessAccount"). */
  companyName: string;
  onCompanyClick?: () => void;
  /** The single solid (Figma "QuickActionButton" bg=btn-primary) action, e.g. "Make a payment". */
  primaryAction?: PageHeaderAction;
  /** The subtle pill actions after it, e.g. "Convert Funds" / "Add account". */
  secondaryActions?: PageHeaderAction[];
  /** Shows the unread dot on the notification bell. */
  unread?: boolean;
  onNotificationsClick?: () => void;
  /** Profile avatar initials, e.g. "JM". */
  profileInitials: string;
  onProfileClick?: () => void;
};

/** PageHeader — dashboard top bar (Figma "PageHeader", node 2523-10057). */
export function PageHeader({
  companyName,
  onCompanyClick,
  primaryAction,
  secondaryActions = [],
  unread = false,
  onNotificationsClick,
  profileInitials,
  onProfileClick,
}: PageHeaderProps) {
  return (
    <header className={styles.root}>
      <button type="button" className={styles.switcher} onClick={onCompanyClick}>
        <span className={styles.switcherText}>{companyName}</span>
        <span className={styles.switcherIcon}>
          <ChevronDown size={20} />
        </span>
      </button>

      <div className={styles.actions}>
        {primaryAction && (
          <button type="button" className={styles.primaryAction} onClick={primaryAction.onClick}>
            {primaryAction.icon && <span className={styles.actionIcon}>{primaryAction.icon}</span>}
            {primaryAction.label}
          </button>
        )}
        {secondaryActions.map((action, i) => (
          <button key={i} type="button" className={styles.secondaryAction} onClick={action.onClick}>
            {action.icon && <span className={styles.actionIcon}>{action.icon}</span>}
            {action.label}
          </button>
        ))}
        <button type="button" className={styles.notification} onClick={onNotificationsClick} aria-label="Notifications">
          <Bell size={20} />
          {unread && <span className={styles.dot} aria-hidden />}
        </button>
        <button type="button" className={styles.profile} onClick={onProfileClick} aria-label="Profile">
          {profileInitials}
        </button>
      </div>
    </header>
  );
}

export default PageHeader;
