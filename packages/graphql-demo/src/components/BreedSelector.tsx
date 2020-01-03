import { useMetadataAnimalBreeds } from "@igloo-be-omnipartners/hooks";
import { FieldProps } from "formik";
import React from "react";

export const BreedSelector = ({ field }: Partial<FieldProps>) => {
  const { items } = useMetadataAnimalBreeds("fr");

  return (
    <>
      <label htmlFor="breed" style={{ display: "block" }}>
        All breeds
      </label>
      <select {...field} style={{ marginBottom: 15 }}>
        {items.map(item => (
          <option key={item.value} value={item.value} id={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <label htmlFor="breed" style={{ display: "block" }}>
        Regular breeds
      </label>
      <select {...field} style={{ marginBottom: 15 }}>
        {items
          .filter(breed => !breed.isOther)
          .map(item => (
            <option key={item.value} value={item.value} id={item.value}>
              {item.label}
            </option>
          ))}
      </select>
      <label htmlFor="breed" style={{ display: "block" }}>
        Other Breeds
      </label>
      <select {...field} style={{ marginBottom: 15 }}>
        {items
          .filter(breed => breed.isOther)
          .map(item => (
            <option key={item.value} value={item.value} id={item.value}>
              {item.label}
            </option>
          ))}
      </select>
    </>
  );
};
