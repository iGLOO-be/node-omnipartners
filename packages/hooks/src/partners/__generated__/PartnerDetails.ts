/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PartnerDetails
// ====================================================

export interface PartnerDetails_partnerDetails {
  __typename: "Partner";
  extId: string;
  lat: string | null;
  lng: string | null;
  street1: string | null;
  postalCode: string | null;
  city: string | null;
  name: string | null;
  type: string | null;
  streetnum: string | null;
  partnerGroups: string[] | null;
}

export interface PartnerDetails {
  partnerDetails: PartnerDetails_partnerDetails[] | null;
}

export interface PartnerDetailsVariables {
  extId: string;
}
