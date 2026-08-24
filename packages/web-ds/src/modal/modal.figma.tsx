import figma from "@figma/code-connect";
import { Modal } from "./Modal";

// Assembled Modal (Header + Content + Footer) — the composition example.
figma.connect(
  Modal,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=2734-18960",
  {
    example: () => (
      <Modal>
        <Modal.Header title="Title" description="Description" onClose={() => {}} />
        <Modal.Content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Modal.Content>
        <Modal.Footer primaryLabel="Button" secondaryLabel="Button" onPrimary={() => {}} onSecondary={() => {}} />
      </Modal>
    ),
  }
);

// ModalHeader, in isolation.
figma.connect(
  Modal.Header,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=2734-18630",
  {
    props: {
      title: figma.string("Title"),
      description: figma.string("Description"),
    },
    example: ({ title, description }) => <Modal.Header title={title} description={description} onClose={() => {}} />,
  }
);

// ModalContent, in isolation.
figma.connect(
  Modal.Content,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=2734-18629",
  {
    props: {
      paddingTop: figma.boolean("paddingTop"),
      paddingBottom: figma.boolean("paddingBottom"),
    },
    example: ({ paddingTop, paddingBottom }) => (
      <Modal.Content paddingTop={paddingTop} paddingBottom={paddingBottom}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Modal.Content>
    ),
  }
);

// ModalBottom (footer), in isolation.
figma.connect(
  Modal.Footer,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=2734-18698",
  {
    props: {
      filled: figma.boolean("filled"),
      showSecondaryButton: figma.boolean("showSecondaryButton"),
    },
    example: ({ filled, showSecondaryButton }) => (
      <Modal.Footer
        primaryLabel="Button"
        onPrimary={() => {}}
        secondaryLabel={showSecondaryButton ? "Button" : undefined}
        onSecondary={() => {}}
        filled={filled}
      />
    ),
  }
);
