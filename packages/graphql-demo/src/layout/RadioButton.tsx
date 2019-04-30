import { FieldProps } from "formik";
import React from "react";
import { Merge } from "type-fest";

export const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
}: Merge<FieldProps, { id: string; label: string }>) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
