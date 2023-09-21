/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserFavouritesDelete
// ====================================================

export interface UserFavouritesDelete_userFavouritesDelete_result_user_owner {
  __typename: "UserOwner";
  id: string;
  guid: string;
}

export interface UserFavouritesDelete_userFavouritesDelete_result_user_favourites {
  __typename: "UserFavourites";
  id: string;
  date: string;
  type: string;
  content: string;
  source: string;
}

export interface UserFavouritesDelete_userFavouritesDelete_result_user {
  __typename: "User";
  id: string;
  owner: UserFavouritesDelete_userFavouritesDelete_result_user_owner;
  favourites: UserFavouritesDelete_userFavouritesDelete_result_user_favourites[];
}

export interface UserFavouritesDelete_userFavouritesDelete_result {
  __typename: "UserAndFavourites";
  user: UserFavouritesDelete_userFavouritesDelete_result_user;
}

export interface UserFavouritesDelete_userFavouritesDelete_error_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserFavouritesDelete_userFavouritesDelete_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserFavouritesDelete_userFavouritesDelete_error_validationErrors_errors[];
}

export interface UserFavouritesDelete_userFavouritesDelete_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserFavouritesDelete_userFavouritesDelete_error_validationErrors[] | null;
}

export interface UserFavouritesDelete_userFavouritesDelete {
  __typename: "UserFavouritesResult";
  result: UserFavouritesDelete_userFavouritesDelete_result | null;
  error: UserFavouritesDelete_userFavouritesDelete_error | null;
}

export interface UserFavouritesDelete {
  userFavouritesDelete: UserFavouritesDelete_userFavouritesDelete;
}

export interface UserFavouritesDeleteVariables {
  id: string;
  token: string;
  source?: string | null;
  type?: string | null;
}
