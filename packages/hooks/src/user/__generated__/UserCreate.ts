/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserCreate
// ====================================================

export interface UserCreate_userCreate_result_owner {
  __typename: "UserOwner";
  id: string;
  guid: string;
}

export interface UserCreate_userCreate_result {
  __typename: "User";
  id: string;
  token: string;
  owner: UserCreate_userCreate_result_owner;
}

export interface UserCreate_userCreate_error_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserCreate_userCreate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserCreate_userCreate_error_validationErrors_errors[];
}

export interface UserCreate_userCreate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserCreate_userCreate_error_validationErrors[] | null;
}

export interface UserCreate_userCreate {
  __typename: "UserUpdateResult";
  result: UserCreate_userCreate_result | null;
  error: UserCreate_userCreate_error | null;
}

export interface UserCreate {
  userCreate: UserCreate_userCreate;
}

export interface UserCreateVariables {
  userInput: UserCreateInput;
}
