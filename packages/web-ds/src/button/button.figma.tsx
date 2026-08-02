import figma from "@figma/code-connect";
import { Button } from "./Button";

// Fill in the Figma component URL once Button is published in the web library.
figma.connect(Button, "<FIGMA_COMPONENT_URL>", {
  props: {
    variant: figma.enum("Variant", {
      Primary: "primary",
      Secondary: "secondary",
      Ghost: "ghost",
    }),
    disabled: figma.boolean("Disabled"),
  },
  example: ({ variant, disabled }) => (
    <Button variant={variant} disabled={disabled}>
      Label
    </Button>
  ),
});
