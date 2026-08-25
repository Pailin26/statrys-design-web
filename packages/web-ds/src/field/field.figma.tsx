import figma from "@figma/code-connect";
import { Calendar, ChevronDown } from "lucide-react";
import { Field } from "./Field";

// Assembled Field (Fields node) — label/caption chrome around a Field.TextField.
figma.connect(
  Field,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=4011-4962",
  {
    props: {
      label: figma.string("label"),
      mandatory: figma.boolean("mandatory"),
      showCaption: figma.boolean("showCaption"),
      caption: figma.string("caption"),
      disabled: figma.enum("state", { Disabled: true }),
      error: figma.enum("state", { Error: true }),
    },
    example: ({ label, mandatory, showCaption, caption, disabled, error }) => (
      <Field label={label} mandatory={mandatory} hint={showCaption ? caption : undefined} error={error ? caption : undefined}>
        <Field.TextField value="" onChange={() => {}} placeholder="Input text" disabled={disabled} error={error} />
      </Field>
    ),
  }
);

// Field.TextField, in isolation — the TextFields node's Text/Left Icon/Dropdown/
// Date picker/Mobile Number/Currency/Unit types are all this one component.
figma.connect(
  Field.TextField,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=4011-4993",
  {
    props: {
      placeholder: figma.string("inputText"),
      disabled: figma.enum("state", { Disabled: true }),
      error: figma.enum("state", { Error: true }),
      type: figma.enum("type", {
        Text: "text",
        "Left Icon": "left-icon",
        Dropdown: "dropdown",
        "Date picker": "date-picker",
        "Mobile Number": "mobile-number",
        Currency: "currency",
        Unit: "unit",
      }),
    },
    example: ({ placeholder, disabled, error, type }) => {
      if (type === "left-icon") {
        return (
          <Field.TextField
            value=""
            onChange={() => {}}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            leadingIcon={<ChevronDown />}
          />
        );
      }
      if (type === "date-picker") {
        return (
          <Field.TextField
            value=""
            onChange={() => {}}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            trailingIcon={<Calendar />}
            onTrailingIconClick={() => {}}
          />
        );
      }
      if (type === "dropdown") {
        return (
          <Field.TextField
            value=""
            onChange={() => {}}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            options={[{ value: "1", label: "Option" }]}
          />
        );
      }
      if (type === "mobile-number") {
        return (
          <Field.TextField
            value=""
            onChange={() => {}}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            type="tel"
            prefix={{ label: "+1", onClick: () => {} }}
          />
        );
      }
      if (type === "currency") {
        return (
          <Field.TextField
            value=""
            onChange={() => {}}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            type="number"
            prefix={{ label: "USD", onClick: () => {} }}
          />
        );
      }
      if (type === "unit") {
        return (
          <Field.TextField
            value=""
            onChange={() => {}}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            suffix={{ label: "Unit", onClick: () => {} }}
          />
        );
      }
      return <Field.TextField value="" onChange={() => {}} placeholder={placeholder} disabled={disabled} error={error} />;
    },
  }
);

// Field.TextArea, in isolation.
figma.connect(
  Field.TextArea,
  "https://www.figma.com/design/abElBYcwuc5skfPX1c7FlP/-WEB--Design-System?node-id=4011-5301",
  {
    props: {
      placeholder: figma.string("inputText"),
      disabled: figma.enum("state", { Disabled: true }),
      error: figma.enum("state", { Error: true }),
    },
    example: ({ placeholder, disabled, error }) => (
      <Field.TextArea value="" onChange={() => {}} placeholder={placeholder} disabled={disabled} error={error} />
    ),
  }
);
