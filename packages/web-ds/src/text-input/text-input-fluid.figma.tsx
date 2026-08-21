import figma from "@figma/code-connect";
import { TextInputFluid } from "./TextInputFluid";

figma.connect(
  TextInputFluid,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=1085-5372",
  {
    props: {
      label: figma.string("label"),
      placeholder: figma.string("placeholder"),
      hintText: figma.string("hintText"),
      hint: figma.boolean("hint"),
      tooltip: figma.boolean("tooltip", { true: "Help text", false: undefined }),
      dropdown: figma.boolean("dropdown"),
      size: figma.enum("size", { sm: "sm", md: "md", lg: "lg" }),
      disabled: figma.enum("state", { Disable: true }),
      error: figma.enum("state", { Error: "This field has an error" }),
    },
    example: ({ label, placeholder, hintText, hint, tooltip, dropdown, size, disabled, error }) => (
      <TextInputFluid
        label={label}
        value=""
        onChange={() => {}}
        placeholder={placeholder}
        hint={hint ? hintText : undefined}
        tooltip={tooltip}
        dropdown={dropdown}
        size={size}
        disabled={disabled}
        error={error}
      />
    ),
  }
);
