/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserSubscriptionsFragment
// ====================================================

export interface UserSubscriptionsFragment_owner {
  __typename: "UserOwner";
  id: string;
  guid: string;
}

export interface UserSubscriptionsFragment_preferences {
  __typename: "UserPreferences";
  subscriptions: string[];
}

export interface UserSubscriptionsFragment {
  __typename: "User";
  owner: UserSubscriptionsFragment_owner;
  preferences: UserSubscriptionsFragment_preferences;
}
