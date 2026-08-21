import figma from "@figma/code-connect";
import { Radio } from "./Radio";

figma.connect(
  Radio,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=3081-4828",
  {
    props: {
      selected: figma.boolean("selected"),
      size: figma.enum("size", { sm: "sm", md: "md" }),
      disabled: figma.enum("state", { Disabled: true }),
    },
    example: ({ selected, size, disabled }) => <Radio selected={selected} size={size} disabled={disabled} />,
  }
);
