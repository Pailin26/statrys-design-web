import figma from "@figma/code-connect";
import { XClose } from "./XClose";

figma.connect(
  XClose,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=1646-164",
  {
    props: {
      size: figma.enum("size", { sm: "sm", md: "md" }),
      inverse: figma.boolean("inverse"),
      // Figma's "state" (Default/Hover) is a real CSS :hover pseudo-class here, not a prop.
    },
    example: ({ size, inverse }) => <XClose size={size} inverse={inverse} onClick={() => {}} />,
  }
);
