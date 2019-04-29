import { FieldProps } from "formik";
import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GetBreeds, GetBreedsVariables } from "./__generated__/GetBreeds";

const GetBreedsQuery = gql`
  query GetBreeds($lang: String!) {
    metadataAnimalBreeds(lang: $lang) {
      id
      name
    }
  }
`;

export const BreedSelector = (props?: FieldProps) => {
  const { data } = useQuery<GetBreeds, GetBreedsVariables>(GetBreedsQuery, {
    variables: {
      lang: "fr",
    },
  });
  const breeds = (data && data.metadataAnimalBreeds) || [];
  const field = props && props.field;
  return (
    <>
      <label htmlFor="breed" style={{ display: "block" }}>
        Breed
      </label>
      <select {...field} style={{ marginBottom: 15 }}>
        {breeds.map(breed => (
          <option id={breed.id}>{breed.name}</option>
        ))}
      </select>
    </>
  );
};
