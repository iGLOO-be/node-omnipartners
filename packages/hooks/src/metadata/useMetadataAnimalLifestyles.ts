import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  MetadataAnimalLifestyles,
  MetadataAnimalLifestylesVariables,
} from "./__generated__/MetadataAnimalLifestyles";

export * from "./__generated__/MetadataAnimalLifestyles";

const MetadataAnimalLifestylesQuery = gql`
  query MetadataAnimalLifestyles($lang: String!) {
    metadataAnimalLifestyles(lang: $lang) {
      code
      name
      species
    }
  }
`;

export const useMetadataAnimalLifestyles = (
  optionsOrLang:
    | string
    | {
        lang: string;
        skip?: boolean;
      },
) => {
  const lang =
    typeof optionsOrLang === "object" ? optionsOrLang.lang : optionsOrLang;
  const skip = typeof optionsOrLang === "object" ? optionsOrLang.skip : false;

  const res = useQuery<MetadataAnimalLifestyles, MetadataAnimalLifestylesVariables>(
    MetadataAnimalLifestylesQuery,
    {
      variables: {
        lang,
      },
      skip,
    },
  );

  const items =
    (res.data &&
      res.data.metadataAnimalLifestyles &&
      res.data.metadataAnimalLifestyles.map(d => ({
        label: d.name,
        value: d.code,
      }))) ||
    [];

  return {
    ...res,
    items,
  };
};
