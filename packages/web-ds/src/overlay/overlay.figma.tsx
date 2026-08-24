import figma from "@figma/code-connect";
import { Overlay } from "./Overlay";

figma.connect(
  Overlay,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=1510-8634",
  {
    example: () => <Overlay onClick={() => {}} />,
  }
);
