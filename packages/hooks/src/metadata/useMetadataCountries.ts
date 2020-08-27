import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  MetadataCountries,
  MetadataCountriesVariables,
} from "./__generated__/MetadataCountries";

export * from "./__generated__/MetadataCountries";

const MetadataCountriesQuery = gql`
  query MetadataCountries($lang: String!) {
    metadataCountries(lang: $lang) {
      name
      code
    }
  }
`;

export const useMetadataCountries = (
  optionsOrLang:
    | string
    | {
        skip?: boolean;
        lang: string;
      },
) => {
  const lang =
    typeof optionsOrLang === "object" ? optionsOrLang.lang : optionsOrLang;
  const skip = typeof optionsOrLang === "object" ? optionsOrLang.skip : false;
  const res = useQuery<MetadataCountries, MetadataCountriesVariables>(
    MetadataCountriesQuery,
    {
      variables: {
        lang,
      },
      skip,
    },
  );

  return {
    ...res,
    items:
      (res.data &&
        res.data.metadataCountries.map((country) => ({
          value: country.code,
          label: country.name,
        }))) ||
      [],
  };
};
