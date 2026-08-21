import figma from "@figma/code-connect";
import { Link } from "./Link";

figma.connect(
  Link,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=2153-6347",
  {
    props: {
      size: figma.enum("Size", {
        sm: "sm",
        md: "md",
        lg: "lg",
      }),
      inverse: figma.boolean("Inverse"),
      disabled: figma.enum("State", { Disabled: true }),
      text: figma.string("text"),
    },
    example: ({ size, inverse, disabled, text }) => (
      <Link size={size} inverse={inverse} disabled={disabled}>
        {text}
      </Link>
    ),
  }
);
