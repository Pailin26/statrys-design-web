import figma from "@figma/code-connect";
import { Checkbox } from "./Checkbox";

figma.connect(
  Checkbox,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=3417-179",
  {
    props: {
      label: figma.string("label"),
      description: figma.boolean("showDescription", {
        true: "Save my login details for next time",
        false: undefined,
      }),
    },
    example: ({ label, description }) => <Checkbox label={label} description={description} />,
  }
);
