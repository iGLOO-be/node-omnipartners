import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  MetadataAnimalUniverses,
  MetadataAnimalUniversesVariables,
} from "./__generated__/MetadataAnimalUniverses";

export * from "./__generated__/MetadataAnimalUniverses";

const MetadataAnimalUniversesQuery = gql`
  query MetadataAnimalUniverses($lang: String!) {
    metadataAnimalUniverses(lang: $lang) {
      id
      name
      species
    }
  }
`;

export const useMetadataAnimalUniverses = (
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

  const res = useQuery<
    MetadataAnimalUniverses,
    MetadataAnimalUniversesVariables
  >(MetadataAnimalUniversesQuery, {
    variables: {
      lang,
    },
    skip,
  });

  const data = (res.data && res.data.metadataAnimalUniverses) || [];

  const temp = !!type
    ? data.filter((d) => d.species.toLowerCase().match(type || ""))
    : data;

  const items = temp.map((d) => ({
    label: d.name,
    value: d.id,
  }));

  return {
    ...res,
    items,
  };
};
