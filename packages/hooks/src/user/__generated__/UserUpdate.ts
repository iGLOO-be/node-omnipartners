/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserUpdateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserUpdate
// ====================================================

export interface UserUpdate_userUpdate_result_owner {
  __typename: "UserOwner";
  guid: string;
  firstName: string | null;
  lastName: string | null;
  title: string | null;
  email: string | null;
  mobilePhone: string | null;
  country: string | null;
}

export interface UserUpdate_userUpdate_result {
  __typename: "User";
  owner: UserUpdate_userUpdate_result_owner;
}

export interface UserUpdate_userUpdate_error_validationErrors_errors {
  __typename: "ValidationError";
  message: string;
  validator: string;
}

export interface UserUpdate_userUpdate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserUpdate_userUpdate_error_validationErrors_errors[];
}

export interface UserUpdate_userUpdate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserUpdate_userUpdate_error_validationErrors[] | null;
}

export interface UserUpdate_userUpdate {
  __typename: "UserUpdateResult";
  result: UserUpdate_userUpdate_result | null;
  error: UserUpdate_userUpdate_error | null;
}

export interface UserUpdate {
  userUpdate: UserUpdate_userUpdate;
}

export interface UserUpdateVariables {
  token: string;
  userInput: UserUpdateInput;
}
