/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataLegalForms
// ====================================================

export interface MetadataLegalForms_metadataLegalForms {
  __typename: "LegalForm";
  name: string;
  code: string;
  description: string | null;
  url: string | null;
}

export interface MetadataLegalForms {
  metadataLegalForms: MetadataLegalForms_metadataLegalForms[];
}

export interface MetadataLegalFormsVariables {
  lang: string;
  codes: string;
}
