import { useMetadataAnimalBreeds } from "@igloo-be-omnipartners/hooks";
import { FieldProps } from "formik";
import React from "react";

export const BreedSelector = ({ field }: Partial<FieldProps>) => {
  const { items } = useMetadataAnimalBreeds("fr")

  return (
    <>
      <label htmlFor="breed" style={{ display: "block" }}>
        Breed
      </label>
      <select {...field} style={{ marginBottom: 15 }}>
        {items.map(item => (
          <option key={item.value} value={item.value} id={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};
