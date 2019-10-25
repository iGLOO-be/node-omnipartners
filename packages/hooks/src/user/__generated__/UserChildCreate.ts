/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserChildCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserChildCreate
// ====================================================

export interface UserChildCreate_userChildCreate_result_user_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserChildCreate_userChildCreate_result_user_children {
  __typename: "UserChild";
  birthday: any | null;
  gender: string;
  guid: string;
  firstName: string;
}

export interface UserChildCreate_userChildCreate_result_user {
  __typename: "User";
  owner: UserChildCreate_userChildCreate_result_user_owner;
  children: UserChildCreate_userChildCreate_result_user_children[];
}

export interface UserChildCreate_userChildCreate_result_child {
  __typename: "UserChild";
  guid: string;
  birthday: any | null;
  firstName: string;
  gender: string;
}

export interface UserChildCreate_userChildCreate_result {
  __typename: "UserAndChild";
  user: UserChildCreate_userChildCreate_result_user;
  child: UserChildCreate_userChildCreate_result_child;
}

export interface UserChildCreate_userChildCreate_error_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserChildCreate_userChildCreate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserChildCreate_userChildCreate_error_validationErrors_errors[];
}

export interface UserChildCreate_userChildCreate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserChildCreate_userChildCreate_error_validationErrors[] | null;
}

export interface UserChildCreate_userChildCreate {
  __typename: "UserChildResult";
  result: UserChildCreate_userChildCreate_result | null;
  error: UserChildCreate_userChildCreate_error | null;
}

export interface UserChildCreate {
  userChildCreate: UserChildCreate_userChildCreate;
}

export interface UserChildCreateVariables {
  token: string;
  userChildCreateInput: UserChildCreateInput;
}
