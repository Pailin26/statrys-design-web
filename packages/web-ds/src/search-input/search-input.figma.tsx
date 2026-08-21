import figma from "@figma/code-connect";
import { SearchInput } from "./SearchInput";

figma.connect(
  SearchInput,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=818-2874",
  {
    props: {
      placeholder: figma.string("placeholder"),
      size: figma.enum("size", { sm: "sm", md: "md", lg: "lg" }),
      disabled: figma.enum("state", { Disabled: true }),
    },
    example: ({ placeholder, size, disabled }) => (
      <SearchInput value="" onChange={() => {}} placeholder={placeholder} size={size} disabled={disabled} />
    ),
  }
);
