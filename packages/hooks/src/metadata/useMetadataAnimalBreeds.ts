import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  MetadataAnimalBreeds,
  MetadataAnimalBreedsVariables,
} from "./__generated__/MetadataAnimalBreeds";

const MetadataAnimalBreedsQuery = gql`
  query MetadataAnimalBreeds($lang: String!) {
    metadataAnimalBreeds(lang: $lang) {
      id
      name
    }
  }
`;

export const useMetadataAnimalBreeds = (lang: string) => {
  const res = useQuery<
    MetadataAnimalBreeds,
    MetadataAnimalBreedsVariables
  >(MetadataAnimalBreedsQuery, {
    variables: {
      lang,
    },
  });

  const items =
    (res.data &&
      res.data.metadataAnimalBreeds &&
      res.data.metadataAnimalBreeds.map(d => ({
        label: d.id,
        value: d.name,
      }))) ||
    [];

  return {
    ...res,
    items,
  };
};
