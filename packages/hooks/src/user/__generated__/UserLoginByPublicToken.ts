/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserLoginByPublicToken
// ====================================================

export interface UserLoginByPublicToken_userLoginByPublicToken_result_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserLoginByPublicToken_userLoginByPublicToken_result {
  __typename: "User";
  token: string;
  owner: UserLoginByPublicToken_userLoginByPublicToken_result_owner;
}

export interface UserLoginByPublicToken_userLoginByPublicToken_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserLoginByPublicToken_userLoginByPublicToken {
  __typename: "UserResult";
  result: UserLoginByPublicToken_userLoginByPublicToken_result | null;
  error: UserLoginByPublicToken_userLoginByPublicToken_error | null;
}

export interface UserLoginByPublicToken {
  userLoginByPublicToken: UserLoginByPublicToken_userLoginByPublicToken;
}

export interface UserLoginByPublicTokenVariables {
  userContextData?: any | null;
  token: string;
}
