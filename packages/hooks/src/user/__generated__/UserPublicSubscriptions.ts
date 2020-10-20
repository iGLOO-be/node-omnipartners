/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserPublicSubscriptions
// ====================================================

export interface UserPublicSubscriptions_userPublicSubscriptions_result {
  __typename: "UserPublicSubscriptionsUser";
  subscriptions: string[];
}

export interface UserPublicSubscriptions_userPublicSubscriptions_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserPublicSubscriptions_userPublicSubscriptions {
  __typename: "UserPublicSubscriptionsResult";
  result: UserPublicSubscriptions_userPublicSubscriptions_result | null;
  error: UserPublicSubscriptions_userPublicSubscriptions_error | null;
}

export interface UserPublicSubscriptions {
  userPublicSubscriptions: UserPublicSubscriptions_userPublicSubscriptions | null;
}

export interface UserPublicSubscriptionsVariables {
  publicToken: string;
  userEmail: string;
}
