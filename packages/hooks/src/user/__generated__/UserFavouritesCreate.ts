/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserFavouritesCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserFavouritesCreate
// ====================================================

export interface UserFavouritesCreate_userFavouritesCreate_result_user_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserFavouritesCreate_userFavouritesCreate_result_user_favourites {
  __typename: "UserFavourites";
  id: string;
  date: string;
  type: string;
  content: string;
  source: string;
}

export interface UserFavouritesCreate_userFavouritesCreate_result_user {
  __typename: "User";
  owner: UserFavouritesCreate_userFavouritesCreate_result_user_owner;
  favourites: UserFavouritesCreate_userFavouritesCreate_result_user_favourites[];
}

export interface UserFavouritesCreate_userFavouritesCreate_result {
  __typename: "UserAndFavourites";
  user: UserFavouritesCreate_userFavouritesCreate_result_user;
}

export interface UserFavouritesCreate_userFavouritesCreate_error_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserFavouritesCreate_userFavouritesCreate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserFavouritesCreate_userFavouritesCreate_error_validationErrors_errors[];
}

export interface UserFavouritesCreate_userFavouritesCreate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserFavouritesCreate_userFavouritesCreate_error_validationErrors[] | null;
}

export interface UserFavouritesCreate_userFavouritesCreate {
  __typename: "UserFavouritesResult";
  result: UserFavouritesCreate_userFavouritesCreate_result | null;
  error: UserFavouritesCreate_userFavouritesCreate_error | null;
}

export interface UserFavouritesCreate {
  userFavouritesCreate: UserFavouritesCreate_userFavouritesCreate;
}

export interface UserFavouritesCreateVariables {
  userFavouritesCreateInput: UserFavouritesCreateInput;
  token: string;
  source?: string | null;
  type?: string | null;
}
