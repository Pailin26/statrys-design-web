import figma from "@figma/code-connect";
import { Toggle } from "./Toggle";

figma.connect(
  Toggle,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=3784-2555",
  {
    props: {
      selected: figma.boolean("selected"),
      disabled: figma.enum("state", { Disabled: true }),
    },
    example: ({ selected, disabled }) => <Toggle selected={selected} disabled={disabled} />,
  }
);
