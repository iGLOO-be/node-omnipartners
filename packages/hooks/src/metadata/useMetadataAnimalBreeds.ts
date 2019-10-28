import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
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
    }
  }
`;

export const useMetadataAnimalBreeds = (lang: string, type?: string) => {
  const res = useQuery<MetadataAnimalBreeds, MetadataAnimalBreedsVariables>(
    MetadataAnimalBreedsQuery,
    {
      variables: {
        lang,
        type,
      },
    },
  );

  const items =
    (res.data &&
      res.data.metadataAnimalBreeds &&
      res.data.metadataAnimalBreeds.map(d => ({
        label: d.name,
        value: d.id,
      }))) ||
    [];

  return {
    ...res,
    items,
  };
};
