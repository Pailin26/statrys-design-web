import React from "react";
import { Sidebar, SidebarProps } from "../sidebar/Sidebar";
import { PageHeader, PageHeaderProps } from "../page-header/PageHeader";
import styles from "./DashboardTemplate.module.css";

export type DashboardTemplateProps = {
  sidebarProps: SidebarProps;
  pageHeaderProps: PageHeaderProps;
  title: string;
  children?: React.ReactNode;
};

/**
 * DashboardTemplate — the app-shell page layout combining Sidebar + PageHeader (Figma "Template",
 * node 2523-11049). Sidebar renders as a fixed overlay; `sidebarOffset` reserves the collapsed
 * rail's width so page content isn't hidden under it.
 */
export function DashboardTemplate({ sidebarProps, pageHeaderProps, title, children }: DashboardTemplateProps) {
  return (
    <div className={styles.root}>
      <Sidebar {...sidebarProps} />
      <div className={styles.page}>
        <PageHeader {...pageHeaderProps} />
        <main className={styles.main}>
          <h1 className={styles.title}>{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardTemplate;
