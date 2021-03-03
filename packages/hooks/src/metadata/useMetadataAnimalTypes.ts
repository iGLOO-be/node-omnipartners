import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  MetadataAnimalTypes,
  MetadataAnimalTypesVariables,
} from "./__generated__/MetadataAnimalTypes";

export * from "./__generated__/MetadataAnimalTypes";

const MetadataAnimalTypesQuery = gql`
  query MetadataAnimalTypes($lang: String!) {
    metadataAnimalTypes(lang: $lang) {
      code
      name
    }
  }
`;

export const useMetadataAnimalTypes = (
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

  const res = useQuery<MetadataAnimalTypes, MetadataAnimalTypesVariables>(
    MetadataAnimalTypesQuery,
    {
      variables: {
        lang,
      },
      skip,
    },
  );

  const items =
    (res.data &&
      res.data.metadataAnimalTypes &&
      res.data.metadataAnimalTypes.map((d) => ({
        label: d.name,
        value: d.code,
      }))) ||
    [];

  return {
    ...res,
    items,
  };
};
