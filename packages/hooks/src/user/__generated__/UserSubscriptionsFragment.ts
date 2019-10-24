/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserSubscriptionsFragment
// ====================================================

export interface UserSubscriptionsFragment_owner {
  __typename: "UserOwner";
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
