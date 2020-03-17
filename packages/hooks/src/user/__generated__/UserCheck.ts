/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserCheck
// ====================================================

export interface UserCheck_result_result_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserCheck_result_result {
  __typename: "User";
  owner: UserCheck_result_result_owner;
}

export interface UserCheck_result_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserCheck_result {
  __typename: "UserResult";
  result: UserCheck_result_result | null;
  error: UserCheck_result_error | null;
}

export interface UserCheck {
  result: UserCheck_result | null;
}

export interface UserCheckVariables {
  token: string;
}
