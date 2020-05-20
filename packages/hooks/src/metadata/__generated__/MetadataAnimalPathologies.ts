/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataAnimalPathologies
// ====================================================

export interface MetadataAnimalPathologies_metadataAnimalPathologies {
  __typename: "AnimalPathology";
  name: string;
  code: string;
}

export interface MetadataAnimalPathologies {
  metadataAnimalPathologies: MetadataAnimalPathologies_metadataAnimalPathologies[];
}

export interface MetadataAnimalPathologiesVariables {
  lang: string;
}
