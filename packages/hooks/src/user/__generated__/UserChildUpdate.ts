/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserChildUpdateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserChildUpdate
// ====================================================

export interface UserChildUpdate_userChildUpdate_result_user_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserChildUpdate_userChildUpdate_result_user_children {
  __typename: "UserChild";
  birthday: any | null;
  gender: string;
  guid: string;
  firstName: string;
}

export interface UserChildUpdate_userChildUpdate_result_user {
  __typename: "User";
  owner: UserChildUpdate_userChildUpdate_result_user_owner;
  children: UserChildUpdate_userChildUpdate_result_user_children[];
}

export interface UserChildUpdate_userChildUpdate_result_child {
  __typename: "UserChild";
  guid: string;
  birthday: any | null;
  firstName: string;
  gender: string;
}

export interface UserChildUpdate_userChildUpdate_result {
  __typename: "UserAndChild";
  user: UserChildUpdate_userChildUpdate_result_user;
  child: UserChildUpdate_userChildUpdate_result_child;
}

export interface UserChildUpdate_userChildUpdate_error_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserChildUpdate_userChildUpdate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserChildUpdate_userChildUpdate_error_validationErrors_errors[];
}

export interface UserChildUpdate_userChildUpdate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserChildUpdate_userChildUpdate_error_validationErrors[] | null;
}

export interface UserChildUpdate_userChildUpdate {
  __typename: "UserChildResult";
  result: UserChildUpdate_userChildUpdate_result | null;
  error: UserChildUpdate_userChildUpdate_error | null;
}

export interface UserChildUpdate {
  userChildUpdate: UserChildUpdate_userChildUpdate;
}

export interface UserChildUpdateVariables {
  token: string;
  userChildUpdateInput: UserChildUpdateInput;
}
