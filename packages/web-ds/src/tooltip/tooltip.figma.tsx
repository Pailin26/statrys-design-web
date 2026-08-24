import figma from "@figma/code-connect";
import { Tooltip } from "./Tooltip";

figma.connect(
  Tooltip,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=2432-14400",
  {
    props: {
      title: figma.string("title"),
      description: figma.boolean("supportingText", {
        true: figma.string("description"),
        false: undefined,
      }),
      inverse: figma.boolean("inverse"),
      arrow: figma.enum("arrow", {
        None: "none",
        "Top center": "top",
        "Bottom center": "bottom",
        "Bottom left": "bottom-left",
        "Bottom right": "bottom-right",
        Left: "left",
        Right: "right",
      }),
    },
    example: ({ title, description, inverse, arrow }) => (
      <Tooltip title={title} description={description} inverse={inverse} arrow={arrow} />
    ),
  }
);
