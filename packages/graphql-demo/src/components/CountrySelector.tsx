import { useMetadataCountries } from "@igloo-be-omnipartners/hooks";
import { FieldProps } from "formik";
import React from "react";

export const CountrySelector = ({ field }: Partial<FieldProps>) => {
  const { items } = useMetadataCountries("fr");
  return (
    <div style={{ marginBottom: 15 }}>
      <label htmlFor="country" style={{ display: "block" }}>
        Country
      </label>
      <select {...field}>
        {items.map(item => (
          <option
            key={item.value}
            id={item.value}
          >{`${item.value} - ${item.label}`}</option>
        ))}
      </select>
    </div>
  );
};
