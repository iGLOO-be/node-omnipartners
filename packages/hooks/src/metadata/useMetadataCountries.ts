import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  MetadataCountries,
  MetadataCountriesVariables,
} from "./__generated__/MetadataCountries";

const MetadataCountriesQuery = gql`
  query MetadataCountries($lang: String!) {
    metadataCountries(lang: $lang) {
      name
      code
    }
  }
`;

export const useMetadataCountries = (lang: string) => {
  const res = useQuery<MetadataCountries, MetadataCountriesVariables>(
    MetadataCountriesQuery,
    {
      variables: {
        lang,
      },
    },
  );

  return {
    ...res,
    data:
      (res.data &&
        res.data.metadataCountries.map(country => ({
          value: country.code,
          label: country.name,
        }))) ||
      [],
  };
};
