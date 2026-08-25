import figma from "@figma/code-connect";
import { Sidebar } from "./Sidebar";

figma.connect(
  Sidebar,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=2523-2026",
  {
    props: {
      accountType: figma.enum("Type", {
        "CC + BA": "ccBa",
        "CC Only": "ccOnly",
      }),
      expanded: figma.enum("State", { Hover: true, Default: false }),
    },
    example: ({ accountType, expanded }) => (
      <Sidebar accountType={accountType} expanded={expanded} activeKey="dashboard" onNavigate={(key) => console.log(key)} />
    ),
  }
);
