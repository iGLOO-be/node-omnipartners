/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserFavouritesFragment
// ====================================================

export interface UserFavouritesFragment_owner {
  __typename: "UserOwner";
  id: string;
  guid: string;
}

export interface UserFavouritesFragment_favourites {
  __typename: "UserFavourites";
  id: string;
  date: string;
  type: string;
  content: string;
  source: string;
}

export interface UserFavouritesFragment {
  __typename: "User";
  owner: UserFavouritesFragment_owner;
  favourites: UserFavouritesFragment_favourites[];
}
