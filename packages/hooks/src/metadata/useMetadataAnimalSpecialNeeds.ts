import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  MetadataAnimalSpecialNeeds,
  MetadataAnimalSpecialNeedsVariables,
} from "./__generated__/MetadataAnimalSpecialNeeds";

export * from "./__generated__/MetadataAnimalSpecialNeeds";

const MetadataAnimalSpecialNeedsQuery = gql`
  query MetadataAnimalSpecialNeeds($lang: String) {
    metadataAnimalSpecialNeeds(lang: $lang) {
      reference
      name
      pathologies
    }
  }
`;

export const useMetadataAnimalSpecialNeeds = (
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

  const res = useQuery<
    MetadataAnimalSpecialNeeds,
    MetadataAnimalSpecialNeedsVariables
  >(MetadataAnimalSpecialNeedsQuery, {
    variables: {
      lang,
    },
    skip,
  });

  const items =
    (res.data &&
      res.data.metadataAnimalSpecialNeeds &&
      res.data.metadataAnimalSpecialNeeds.map((d) => ({
        label: d.name,
        value: d.reference,
      }))) ||
    [];

  return {
    ...res,
    items,
  };
};
