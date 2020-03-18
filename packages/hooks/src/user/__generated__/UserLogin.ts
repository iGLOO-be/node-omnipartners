/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserLogin
// ====================================================

export interface UserLogin_userLogin_result_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserLogin_userLogin_result {
  __typename: "User";
  token: string;
  owner: UserLogin_userLogin_result_owner;
}

export interface UserLogin_userLogin_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserLogin_userLogin {
  __typename: "UserResult";
  result: UserLogin_userLogin_result | null;
  error: UserLogin_userLogin_error | null;
}

export interface UserLogin {
  userLogin: UserLogin_userLogin;
}

export interface UserLoginVariables {
  userContextData?: any | null;
  identifier: string;
  password: string;
}
