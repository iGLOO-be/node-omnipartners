import { FieldProps } from "formik";
import React from "react";

export const SimpleInput = ({ field, form, ...inputProps }: FieldProps) => (
  <div style={{ marginBottom: 15 }}>
    <div>
      <label htmlFor={field.name}>{field.name}</label>
    </div>
    <input {...field} {...inputProps} id={field.name} />
  </div>
);
