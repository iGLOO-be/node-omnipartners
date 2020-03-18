/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserChildCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserChildrenCreate
// ====================================================

export interface UserChildrenCreate_userChildCreate_result_user_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserChildrenCreate_userChildCreate_result_user_children {
  __typename: "UserChild";
  birthday: any | null;
  gender: string;
  guid: string;
  firstName: string;
}

export interface UserChildrenCreate_userChildCreate_result_user {
  __typename: "User";
  owner: UserChildrenCreate_userChildCreate_result_user_owner;
  children: UserChildrenCreate_userChildCreate_result_user_children[];
}

export interface UserChildrenCreate_userChildCreate_result {
  __typename: "UserAndChild";
  user: UserChildrenCreate_userChildCreate_result_user;
}

export interface UserChildrenCreate_userChildCreate_error_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserChildrenCreate_userChildCreate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserChildrenCreate_userChildCreate_error_validationErrors_errors[];
}

export interface UserChildrenCreate_userChildCreate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserChildrenCreate_userChildCreate_error_validationErrors[] | null;
}

export interface UserChildrenCreate_userChildCreate {
  __typename: "UserChildResult";
  result: UserChildrenCreate_userChildCreate_result | null;
  error: UserChildrenCreate_userChildCreate_error | null;
}

export interface UserChildrenCreate {
  userChildCreate: UserChildrenCreate_userChildCreate;
}

export interface UserChildrenCreateVariables {
  userChildCreateInput: UserChildCreateInput;
  token: string;
}
