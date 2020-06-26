/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataAnimalSpecialNeeds
// ====================================================

export interface MetadataAnimalSpecialNeeds_metadataAnimalSpecialNeeds {
  __typename: "AnimalSpecialNeed";
  reference: string;
  name: string;
  pathologies: string[];
}

export interface MetadataAnimalSpecialNeeds {
  metadataAnimalSpecialNeeds: MetadataAnimalSpecialNeeds_metadataAnimalSpecialNeeds[];
}

export interface MetadataAnimalSpecialNeedsVariables {
  lang: string;
}
