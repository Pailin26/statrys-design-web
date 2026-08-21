import figma from "@figma/code-connect";
import { ButtonHighlight } from "./ButtonHighlight";

figma.connect(
  ButtonHighlight,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=1847-8095",
  {
    props: {
      variant: figma.enum("Hierarchy", {
        Primary: "primary",
        Secondary: "secondary",
      }),
      size: figma.enum("Size", {
        sm: "sm",
        md: "md",
        lg: "lg",
      }),
      disabled: figma.enum("State", { Disable: true }),
    },
    example: ({ variant, size, disabled }) => (
      <ButtonHighlight variant={variant} size={size} disabled={disabled}>
        Label
      </ButtonHighlight>
    ),
  }
);
