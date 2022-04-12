/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataLanguages
// ====================================================

export interface MetadataLanguages_metadataLanguages {
  __typename: "Language";
  name: string | null;
  code: string;
}

export interface MetadataLanguages {
  metadataLanguages: MetadataLanguages_metadataLanguages[];
}

export interface MetadataLanguagesVariables {
  lang: string;
}
