/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserLoginByAccessToken
// ====================================================

export interface UserLoginByAccessToken_userLoginByAccessToken_result_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserLoginByAccessToken_userLoginByAccessToken_result {
  __typename: "User";
  token: string;
  owner: UserLoginByAccessToken_userLoginByAccessToken_result_owner;
}

export interface UserLoginByAccessToken_userLoginByAccessToken_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserLoginByAccessToken_userLoginByAccessToken {
  __typename: "UserResult";
  result: UserLoginByAccessToken_userLoginByAccessToken_result | null;
  error: UserLoginByAccessToken_userLoginByAccessToken_error | null;
}

export interface UserLoginByAccessToken {
  userLoginByAccessToken: UserLoginByAccessToken_userLoginByAccessToken;
}

export interface UserLoginByAccessTokenVariables {
  userContextData?: any | null;
  access_token: string;
}
