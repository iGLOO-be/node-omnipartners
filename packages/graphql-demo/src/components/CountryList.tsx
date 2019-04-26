import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo-hooks";
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

export const CountryList = () => {
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
    <>
      <select>
        {countries.map(country => (
          <option id={country.code}>{`${country.code} - ${
            country.name
          }`}</option>
        ))}
      </select>
    </>
  );
};
