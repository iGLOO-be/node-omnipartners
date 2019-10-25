import { useQuery } from "@apollo/react-hooks";
import { FieldProps } from "formik";
import gql from "graphql-tag";
import React from "react";
import { GetBreeds, GetBreedsVariables } from "./__generated__/GetBreeds";

const GetBreedsQuery = gql`
  query GetBreeds($lang: String!) {
    metadataAnimalBreeds(lang: $lang) {
      id
      name
    }
  }
`;

export const BreedSelector = ({ field }: Partial<FieldProps>) => {
  const { data } = useQuery<GetBreeds, GetBreedsVariables>(GetBreedsQuery, {
    variables: {
      lang: "fr",
    },
  });
  const breeds = (data && data.metadataAnimalBreeds) || [];
  return (
    <>
      <label htmlFor="breed" style={{ display: "block" }}>
        Breed
      </label>
      <select {...field} style={{ marginBottom: 15 }}>
        {breeds.map(breed => (
          <option key={breed.id} value={breed.id} id={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>
    </>
  );
};
