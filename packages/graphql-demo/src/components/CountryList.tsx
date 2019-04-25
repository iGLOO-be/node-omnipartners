import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GetCountries, GetCountriesVariables } from "./__generated__/GetCountries";

const GetCountriesQuery = gql`
  query GetCountries($lang: String!) {
    countries(lang: $lang) {
      name
      code
    }
  }
`;

export const CountryList = () => {
  const { data, error, loading } = useQuery<
    GetCountries,
    GetCountriesVariables
  >(GetCountriesQuery, {
    variables: {
      lang: "fr",
    },
  });
  const countries = (data && data.countries) || [];

  return (
    <table>
      <tr>
        <th>Code</th>
        <th>Name</th>
      </tr>
      {countries.map(country => (
        <tr>
          <td>{country.code}</td>
          <td>{country.name}</td>
        </tr>
      ))}
    </table>
  );
};
