/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DealVisiblePartnerForUser
// ====================================================

export interface DealVisiblePartnerForUser_dealVisiblePartnerForUser_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  page: number;
  /**
   * Paginate limit
   */
  limit: number | null;
  count: number;
}

export interface DealVisiblePartnerForUser_dealVisiblePartnerForUser_result {
  __typename: "DealVisiblePartnerForUserResultData";
  id: string;
  extid: string;
  name: string;
  street1: string | null;
  street2: string | null;
  streetnum: string | null;
  postal_code: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
}

export interface DealVisiblePartnerForUser_dealVisiblePartnerForUser {
  __typename: "DealVisiblePartnerForUserResult";
  pageInfo: DealVisiblePartnerForUser_dealVisiblePartnerForUser_pageInfo;
  result: DealVisiblePartnerForUser_dealVisiblePartnerForUser_result[];
}

export interface DealVisiblePartnerForUser {
  dealVisiblePartnerForUser: DealVisiblePartnerForUser_dealVisiblePartnerForUser | null;
}

export interface DealVisiblePartnerForUserVariables {
  token: string;
  deal_ref: string;
  search?: string | null;
  favorite_only?: boolean | null;
  partner_lat?: number | null;
  partner_lng?: number | null;
  radius?: number | null;
}
