import figma from "@figma/code-connect";
import { Send } from "lucide-react";
import { PageHeader } from "./PageHeader";

figma.connect(
  PageHeader,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=2523-10057",
  {
    example: () => (
      <PageHeader
        companyName="ACME Corporation"
        primaryAction={{ label: "Make a payment", icon: <Send size={20} />, onClick: () => {} }}
        secondaryActions={[
          { label: "Convert Funds", onClick: () => {} },
          { label: "Add account", onClick: () => {} },
        ]}
        unread
        profileInitials="JM"
      />
    ),
  }
);
