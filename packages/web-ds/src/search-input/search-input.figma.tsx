import figma from "@figma/code-connect";
import { SearchInput } from "./SearchInput";

figma.connect(
  SearchInput,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=4011-5322",
  {
    props: {
      disabled: figma.enum("state", { Disabled: true }),
      error: figma.enum("state", { Error: true }),
      showAction: figma.boolean("showAction"),
    },
    example: ({ disabled, error, showAction }) => (
      <SearchInput
        value=""
        onChange={() => {}}
        placeholder="Search"
        disabled={disabled}
        error={error}
        onMicClick={showAction ? () => {} : undefined}
      />
    ),
  }
);
