/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserCheck
// ====================================================

export interface UserCheck_result_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserCheck_result {
  __typename: "UserResult";
  error: UserCheck_result_error | null;
}

export interface UserCheck {
  result: UserCheck_result | null;
}

export interface UserCheckVariables {
  token: string;
}
