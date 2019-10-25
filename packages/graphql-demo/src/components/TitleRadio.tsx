import { useMetadataUserTitles } from "@igloo-be-omnipartners/hooks";
import { Field } from "formik";
import React from "react";
import { RadioButton } from "../layout/RadioButton";

export const TitleRadio = () => {
  const { items, loading } = useMetadataUserTitles("fr");

  if (loading) {
    return <span>"Loading ..."</span>;
  }

  return (
    <div style={{ marginBottom: 15 }}>
      Civility
      {items.map(title => (
        <Field
          key={title.value}
          component={RadioButton}
          name="title"
          id={title.value}
          label={title.label}
        />
      ))}
    </div>
  );
};
