/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserFavouritesCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserFavouritesCreate
// ====================================================

export interface UserFavouritesCreate_userFavouritesCreate_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserFavouritesCreate_userFavouritesCreate_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserFavouritesCreate_userFavouritesCreate_validationErrors_errors[];
}

export interface UserFavouritesCreate_userFavouritesCreate {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserFavouritesCreate_userFavouritesCreate_validationErrors[] | null;
}

export interface UserFavouritesCreate {
  userFavouritesCreate: UserFavouritesCreate_userFavouritesCreate | null;
}

export interface UserFavouritesCreateVariables {
  userFavouritesCreateInput: UserFavouritesCreateInput;
  token: string;
}
