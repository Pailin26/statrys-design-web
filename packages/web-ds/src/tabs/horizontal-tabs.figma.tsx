import figma from "@figma/code-connect";
import { HorizontalTabs } from "./HorizontalTabs";

figma.connect(
  HorizontalTabs,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=2725-16713",
  {
    props: {
      size: figma.enum("Size", {
        md: "md",
        lg: "lg",
      }),
      variant: figma.enum("Style", {
        Button: "button",
        Underline: "underline",
      }),
    },
    example: ({ size, variant }) => (
      <HorizontalTabs
        items={[
          { id: "one", label: "Tab one", badge: 2 },
          { id: "two", label: "Tab two" },
          { id: "three", label: "Tab three" },
        ]}
        activeId="one"
        onChange={() => {}}
        size={size}
        variant={variant}
      />
    ),
  }
);
