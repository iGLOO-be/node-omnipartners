/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserFavouritesDelete
// ====================================================

export interface UserFavouritesDelete_userFavouritesDelete_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserFavouritesDelete_userFavouritesDelete_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserFavouritesDelete_userFavouritesDelete_validationErrors_errors[];
}

export interface UserFavouritesDelete_userFavouritesDelete {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserFavouritesDelete_userFavouritesDelete_validationErrors[] | null;
}

export interface UserFavouritesDelete {
  userFavouritesDelete: UserFavouritesDelete_userFavouritesDelete | null;
}

export interface UserFavouritesDeleteVariables {
  id: string;
  token: string;
}
