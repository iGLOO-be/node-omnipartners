import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  MetadataAnimalLifestyles,
  MetadataAnimalLifestylesVariables,
} from "./__generated__/MetadataAnimalLifestyles";

export * from "./__generated__/MetadataAnimalLifestyles";

const MetadataAnimalLifestylesQuery = gql`
  query MetadataAnimalLifestyles($lang: String, $type: String) {
    metadataAnimalLifestyles(lang: $lang, type: $type) {
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
        type?: string;
        skip?: boolean;
      },
) => {
  const lang =
    typeof optionsOrLang === "object" ? optionsOrLang.lang : optionsOrLang;
  const skip = typeof optionsOrLang === "object" ? optionsOrLang.skip : false;
  const type = typeof optionsOrLang === "object" ? optionsOrLang.type : null;

  const res = useQuery<
    MetadataAnimalLifestyles,
    MetadataAnimalLifestylesVariables
  >(MetadataAnimalLifestylesQuery, {
    variables: {
      lang,
      type,
    },
    skip,
  });

  const items =
    (res.data &&
      res.data.metadataAnimalLifestyles &&
      res.data.metadataAnimalLifestyles.map((d) => ({
        label: d.name,
        value: d.code,
      }))) ||
    [];

  return {
    ...res,
    items,
  };
};
