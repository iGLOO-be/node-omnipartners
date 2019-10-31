/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoyaltyRetrieveBalance
// ====================================================

export interface LoyaltyRetrieveBalance_loyaltyRetrieveBalance {
  __typename: "LoyaltyBalance";
  user_total_points: string;
  user_guid: string;
  user_hold_points: string;
  status: string;
}

export interface LoyaltyRetrieveBalance {
  loyaltyRetrieveBalance: LoyaltyRetrieveBalance_loyaltyRetrieveBalance;
}

export interface LoyaltyRetrieveBalanceVariables {
  token: string;
  program_id: string;
  card_program_id?: string | null;
}
