/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataAnimalUniverses
// ====================================================

export interface MetadataAnimalUniverses_metadataAnimalUniverses {
  __typename: "AnimalUniverse";
  id: string;
  name: string;
  species: string;
}

export interface MetadataAnimalUniverses {
  metadataAnimalUniverses: MetadataAnimalUniverses_metadataAnimalUniverses[];
}

export interface MetadataAnimalUniversesVariables {
  lang: string;
}
