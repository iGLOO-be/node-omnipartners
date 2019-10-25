/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserChildUpdateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserChildrenUpdate
// ====================================================

export interface UserChildrenUpdate_userChildUpdate_result_user_children {
  __typename: "UserChild";
  birthday: any | null;
  gender: string;
  guid: string;
  firstName: string;
}

export interface UserChildrenUpdate_userChildUpdate_result_user {
  __typename: "User";
  children: UserChildrenUpdate_userChildUpdate_result_user_children[];
}

export interface UserChildrenUpdate_userChildUpdate_result {
  __typename: "UserAndChild";
  user: UserChildrenUpdate_userChildUpdate_result_user;
}

export interface UserChildrenUpdate_userChildUpdate_error_validationErrors_errors {
  __typename: "ValidationError";
  message: string;
  validator: string;
}

export interface UserChildrenUpdate_userChildUpdate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserChildrenUpdate_userChildUpdate_error_validationErrors_errors[];
}

export interface UserChildrenUpdate_userChildUpdate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserChildrenUpdate_userChildUpdate_error_validationErrors[] | null;
}

export interface UserChildrenUpdate_userChildUpdate {
  __typename: "UserChildResult";
  result: UserChildrenUpdate_userChildUpdate_result | null;
  error: UserChildrenUpdate_userChildUpdate_error | null;
}

export interface UserChildrenUpdate {
  userChildUpdate: UserChildrenUpdate_userChildUpdate;
}

export interface UserChildrenUpdateVariables {
  token: string;
  userChildUpdateInput: UserChildUpdateInput;
}
