/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataAnimalTypes
// ====================================================

export interface MetadataAnimalTypes_metadataAnimalTypes {
  __typename: "AnimalType";
  code: string;
  name: string | null;
}

export interface MetadataAnimalTypes {
  metadataAnimalTypes: MetadataAnimalTypes_metadataAnimalTypes[];
}

export interface MetadataAnimalTypesVariables {
  lang: string;
}
