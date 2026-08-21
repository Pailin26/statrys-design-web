import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(
  Button,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=537-1561",
  {
    props: {
      variant: figma.enum("Hierarchy", {
        Primary: "primary",
        Secondary: "secondary",
        Tertiary: "tertiary",
      }),
      size: figma.enum("Size", {
        sm: "sm",
        md: "md",
        lg: "lg",
      }),
      inverse: figma.boolean("Inverse"),
      disabled: figma.enum("State", { Disable: true }),
      shape: figma.enum("Shape", {
        Rec: "rec",
        Rounded: "rounded",
      }),
    },
    example: ({ variant, size, inverse, disabled, shape }) => (
      <Button variant={variant} size={size} inverse={inverse} disabled={disabled} shape={shape}>
        Label
      </Button>
    ),
  }
);
