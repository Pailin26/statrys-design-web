import figma from "@figma/code-connect";
import { Banner } from "./Banner";

figma.connect(
  Banner,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=3443-2895",
  {
    props: {
      color: figma.enum("color", {
        Success: "success",
        Warning: "warning",
        Error: "error",
        Info: "info",
      }),
      // Figma's "type" enum ("Title + Text" | "Text only") — title is only
      // meaningful (and only rendered) for "Title + Text".
      title: figma.enum("type", {
        "Title + Text": figma.string("title"),
        "Text only": undefined,
      }),
      text: figma.string("text"),
      fullWidth: figma.boolean("fullWidth"),
    },
    example: ({ color, title, text, fullWidth }) => (
      <Banner color={color} title={title} text={text} fullWidth={fullWidth} onLinkClick={() => {}} onDismiss={() => {}} />
    ),
  }
);
