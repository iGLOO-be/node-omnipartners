/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataAnimalStages
// ====================================================

export interface MetadataAnimalStages_metadataAnimalStages {
  __typename: "AnimalStage";
  code: string;
  name: string;
  species: string;
}

export interface MetadataAnimalStages {
  metadataAnimalStages: MetadataAnimalStages_metadataAnimalStages[];
}

export interface MetadataAnimalStagesVariables {
  lang: string;
  type?: string | null;
}
