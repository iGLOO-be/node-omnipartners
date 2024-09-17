/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserUpdatePlacesOfPurchaseInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserPlacesOfPurchaseUpdate
// ====================================================

export interface UserPlacesOfPurchaseUpdate_userUpdatePlacesOfPurchase_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserPlacesOfPurchaseUpdate_userUpdatePlacesOfPurchase_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserPlacesOfPurchaseUpdate_userUpdatePlacesOfPurchase_validationErrors_errors[];
}

export interface UserPlacesOfPurchaseUpdate_userUpdatePlacesOfPurchase {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserPlacesOfPurchaseUpdate_userUpdatePlacesOfPurchase_validationErrors[] | null;
}

export interface UserPlacesOfPurchaseUpdate {
  userUpdatePlacesOfPurchase: UserPlacesOfPurchaseUpdate_userUpdatePlacesOfPurchase | null;
}

export interface UserPlacesOfPurchaseUpdateVariables {
  updatePlacesOfPurchaseInput: UserUpdatePlacesOfPurchaseInput;
  token: string;
}
