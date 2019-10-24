/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserToken
// ====================================================

export interface UserToken_user_result {
  __typename: "User";
  token: string;
}

export interface UserToken_user {
  __typename: "UserResult";
  result: UserToken_user_result | null;
}

export interface UserToken {
  user: UserToken_user | null;
}

export interface UserTokenVariables {
  token: string;
}
