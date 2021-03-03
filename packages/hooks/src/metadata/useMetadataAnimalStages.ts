import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  MetadataAnimalStages,
  MetadataAnimalStagesVariables,
} from "./__generated__/MetadataAnimalStages";

export * from "./__generated__/MetadataAnimalStages";

const MetadataAnimalStagesQuery = gql`
  query MetadataAnimalStages($lang: String!, $type: String) {
    metadataAnimalStages(lang: $lang, type: $type) {
      code
      name
      species
    }
  }
`;

export const useMetadataAnimalStages = (
  optionsOrLang:
    | string
    | {
        lang: string;
        type?: string;
        skip?: boolean;
      },
  type?: string,
) => {
  const lang =
    typeof optionsOrLang === "object" ? optionsOrLang.lang : optionsOrLang;
  const skip = typeof optionsOrLang === "object" ? optionsOrLang.skip : false;
  type = typeof optionsOrLang === "object" ? optionsOrLang.type : type;

  const res = useQuery<MetadataAnimalStages, MetadataAnimalStagesVariables>(
    MetadataAnimalStagesQuery,
    {
      variables: {
        lang,
        type,
      },
      skip,
    },
  );

  const items =
    (res.data &&
      res.data.metadataAnimalStages &&
      res.data.metadataAnimalStages.map((d) => ({
        label: d.name,
        value: d.code,
      }))) ||
    [];

  return {
    ...res,
    items,
  };
};
