/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataAnimalBreeds
// ====================================================

export interface MetadataAnimalBreeds_metadataAnimalBreeds {
  __typename: "AnimalBreed";
  id: string;
  name: string;
  other: boolean;
}

export interface MetadataAnimalBreeds {
  metadataAnimalBreeds: MetadataAnimalBreeds_metadataAnimalBreeds[];
}

export interface MetadataAnimalBreedsVariables {
  lang: string;
  type?: string | null;
}
