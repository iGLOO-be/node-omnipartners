/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PartnerLocatorInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: PartnerLocator
// ====================================================

export interface PartnerLocator_findPartners {
  __typename: "Partner";
  extId: string;
  lat: string | null;
  lng: string | null;
  partnerGroups: string[] | null;
}

export interface PartnerLocator {
  findPartners: PartnerLocator_findPartners[] | null;
}

export interface PartnerLocatorVariables {
  partnerLocatorInput: PartnerLocatorInput;
}
