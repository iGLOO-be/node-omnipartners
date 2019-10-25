/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataCountries
// ====================================================

export interface MetadataCountries_metadataCountries {
  __typename: "Country";
  name: string;
  code: string;
}

export interface MetadataCountries {
  metadataCountries: MetadataCountries_metadataCountries[];
}

export interface MetadataCountriesVariables {
  lang: string;
}
