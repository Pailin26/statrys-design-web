import figma from "@figma/code-connect";
import { Send } from "lucide-react";
import { DashboardTemplate } from "./DashboardTemplate";

figma.connect(
  DashboardTemplate,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=2523-11049",
  {
    example: () => (
      <DashboardTemplate
        title="Page Title"
        sidebarProps={{ accountType: "ccBa", activeKey: "dashboard", onNavigate: () => {} }}
        pageHeaderProps={{
          companyName: "ACME Corporation",
          primaryAction: { label: "Make a payment", icon: <Send size={20} />, onClick: () => {} },
          secondaryActions: [
            { label: "Convert Funds", onClick: () => {} },
            { label: "Add account", onClick: () => {} },
          ],
          unread: true,
          profileInitials: "JM",
        }}
      />
    ),
  }
);
