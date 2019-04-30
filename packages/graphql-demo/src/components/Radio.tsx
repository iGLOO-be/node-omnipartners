import { Field } from "formik";
import React from "react";
import { RadioButton } from "../layout/RadioButton";

export const Radio = ({
  choices,
  label,
  name,
}: {
  choices: string[];
  label: string;
  name: string;
}) => {
  return (
    <div style={{ marginBottom: 15 }}>
      {label}
      {choices.map(choice => (
        <Field
          key={choice}
          component={RadioButton}
          name={name}
          id={choice}
          label={choice}
        />
      ))}
    </div>
  );
};
