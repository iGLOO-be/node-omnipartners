/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserSubscriptions
// ====================================================

export interface UserSubscriptions_user_result_owner {
  __typename: "UserOwner";
  id: string;
  guid: string;
}

export interface UserSubscriptions_user_result_preferences {
  __typename: "UserPreferences";
  subscriptions: string[];
}

export interface UserSubscriptions_user_result {
  __typename: "User";
  id: string;
  token: string;
  owner: UserSubscriptions_user_result_owner;
  preferences: UserSubscriptions_user_result_preferences;
}

export interface UserSubscriptions_user_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserSubscriptions_user {
  __typename: "UserResult";
  result: UserSubscriptions_user_result | null;
  error: UserSubscriptions_user_error | null;
}

export interface UserSubscriptions {
  user: UserSubscriptions_user | null;
}

export interface UserSubscriptionsVariables {
  token: string;
}
