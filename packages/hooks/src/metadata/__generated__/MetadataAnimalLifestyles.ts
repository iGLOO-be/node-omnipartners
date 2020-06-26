/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataAnimalLifestyles
// ====================================================

export interface MetadataAnimalLifestyles_metadataAnimalLifestyles {
  __typename: "AnimalLifestyle";
  code: string;
  name: string;
  species: string | null;
}

export interface MetadataAnimalLifestyles {
  metadataAnimalLifestyles: MetadataAnimalLifestyles_metadataAnimalLifestyles[];
}

export interface MetadataAnimalLifestylesVariables {
  lang: string;
}
