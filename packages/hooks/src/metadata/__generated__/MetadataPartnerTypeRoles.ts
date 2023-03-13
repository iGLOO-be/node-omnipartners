/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MetadataPartnerTypeRoles
// ====================================================

export interface MetadataPartnerTypeRoles_metadataPartnerTypeRoles {
  __typename: "PartnerTypeRole";
  code: string;
  name: string;
  type: string;
  relationship: string;
}

export interface MetadataPartnerTypeRoles {
  metadataPartnerTypeRoles: MetadataPartnerTypeRoles_metadataPartnerTypeRoles[];
}

export interface MetadataPartnerTypeRolesVariables {
  partnerType?: string | null;
}
