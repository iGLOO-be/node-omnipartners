import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  MetadataAnimalPathologies,
  MetadataAnimalPathologiesVariables,
} from "./__generated__/MetadataAnimalPathologies";

export * from "./__generated__/MetadataAnimalPathologies";

const MetadataAnimalPathologiesQuery = gql`
  query MetadataAnimalPathologies($lang: String!) {
    metadataAnimalPathologies(lang: $lang) {
      name
      code
    }
  }
`;

export const useMetadataAnimalPathologies = (
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
  const res = useQuery<
    MetadataAnimalPathologies,
    MetadataAnimalPathologiesVariables
  >(MetadataAnimalPathologiesQuery, {
    variables: {
      lang,
    },
    skip,
  });

  return {
    ...res,
    items:
      (res.data &&
        res.data.metadataAnimalPathologies.map(pathology => ({
          value: pathology.code,
          label: pathology.name,
        }))) ||
      [],
  };
};
