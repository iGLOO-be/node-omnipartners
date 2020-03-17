/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataSubscriptions
// ====================================================

export interface MetadataSubscriptions_metadataSubscriptions {
  __typename: "Subscription";
  name: string;
  code: string;
}

export interface MetadataSubscriptions {
  metadataSubscriptions: MetadataSubscriptions_metadataSubscriptions[];
}

export interface MetadataSubscriptionsVariables {
  lang: string;
}
