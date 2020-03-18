/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataUserTitles
// ====================================================

export interface MetadataUserTitles_metadataUserTitles {
  __typename: "UserTitle";
  name: string;
  code: string;
}

export interface MetadataUserTitles {
  metadataUserTitles: MetadataUserTitles_metadataUserTitles[];
}

export interface MetadataUserTitlesVariables {
  lang: string;
}
