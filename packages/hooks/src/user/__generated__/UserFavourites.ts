/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFavourites
// ====================================================

export interface UserFavourites_user_result_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserFavourites_user_result_favourites {
  __typename: "UserFavourites";
  id: string;
  date: string;
  type: string;
  content: string;
  source: string;
}

export interface UserFavourites_user_result {
  __typename: "User";
  owner: UserFavourites_user_result_owner;
  favourites: UserFavourites_user_result_favourites[];
}

export interface UserFavourites_user_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserFavourites_user {
  __typename: "UserResult";
  result: UserFavourites_user_result | null;
  error: UserFavourites_user_error | null;
}

export interface UserFavourites {
  user: UserFavourites_user | null;
}

export interface UserFavouritesVariables {
  token: string;
  source?: string | null;
  type?: string | null;
}
