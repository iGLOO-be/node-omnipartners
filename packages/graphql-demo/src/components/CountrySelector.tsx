import { useQuery } from "@apollo/react-hooks";
import { FieldProps } from "formik";
import gql from "graphql-tag";
import React from "react";
import {
  GetCountries,
  GetCountriesVariables,
} from "./__generated__/GetCountries";

const GetCountriesQuery = gql`
  query GetCountries($lang: String!) {
    metadataCountries(lang: $lang) {
      name
      code
    }
  }
`;

export const CountrySelector = ({ field }: Partial<FieldProps>) => {
  const { data } = useQuery<GetCountries, GetCountriesVariables>(
    GetCountriesQuery,
    {
      variables: {
        lang: "fr",
      },
    },
  );
  const countries = (data && data.metadataCountries) || [];

  return (
    <div style={{ marginBottom: 15 }}>
      <label htmlFor="country" style={{ display: "block" }}>
        Country
      </label>
      <select {...field}>
        {countries.map(country => (
          <option key={country.code} id={country.code}>{`${country.code} - ${
            country.name
          }`}</option>
        ))}
      </select>
    </div>
  );
};
