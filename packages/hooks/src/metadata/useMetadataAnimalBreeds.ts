import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { groupBy } from "lodash";
import {
  MetadataAnimalBreeds,
  MetadataAnimalBreedsVariables,
} from "./__generated__/MetadataAnimalBreeds";

export * from "./__generated__/MetadataAnimalBreeds";

const MetadataAnimalBreedsQuery = gql`
  query MetadataAnimalBreeds($lang: String!, $type: String) {
    metadataAnimalBreeds(lang: $lang, type: $type) {
      id
      name
      other
    }
  }
`;

export const useMetadataAnimalBreeds = (
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

  const res = useQuery<MetadataAnimalBreeds, MetadataAnimalBreedsVariables>(
    MetadataAnimalBreedsQuery,
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
      res.data.metadataAnimalBreeds &&
      res.data.metadataAnimalBreeds.map(d => ({
        label: d.name,
        value: d.id,
        isOther: d.other,
      }))) ||
    [];

  const { true: otherBreeds = [], false: regularBreeds = [] } = groupBy(
    items,
    "isOther",
  );

  return {
    ...res,
    items,
    otherBreeds,
    regularBreeds,
  };
};
