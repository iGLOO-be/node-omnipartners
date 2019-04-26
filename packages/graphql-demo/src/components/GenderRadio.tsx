import { Field } from "formik";
import React from "react";
import { RadioButton } from "../layout/RadioButton";

export const GenderRadio = () => {
  const genders = ["M", "F"];
  return (
    <div style={{ marginBottom: 15 }}>
      Civility
      {genders.map(gender => (
        <Field
          key={gender}
          component={RadioButton}
          name="gender"
          id={gender}
          label={gender}
        />
      ))}
    </div>
  );
};
