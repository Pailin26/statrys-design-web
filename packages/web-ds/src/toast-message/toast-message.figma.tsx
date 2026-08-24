import figma from "@figma/code-connect";
import { ToastMessage } from "./ToastMessage";

figma.connect(
  ToastMessage,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=215-4052",
  {
    props: {
      variant: figma.enum("state", {
        Default: "default",
        Success: "success",
        Error: "error",
        Warning: "warning",
      }),
      title: figma.string("title"),
      // Figma's "showSubtitle" toggle — subtitle here is only meaningful (and
      // only rendered) when there's actually a value to show.
      subtitle: figma.boolean("showSubtitle", {
        true: figma.string("subtitle"),
        false: undefined,
      }),
    },
    example: ({ variant, title, subtitle }) => (
      <ToastMessage
        variant={variant}
        title={title}
        subtitle={subtitle}
        action={{ label: "View Details", onClick: () => {} }}
        onClose={() => {}}
      />
    ),
  }
);
