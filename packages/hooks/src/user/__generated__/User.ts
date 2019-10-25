/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_result_owner {
  __typename: "UserOwner";
  guid: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  mobilePhone: string | null;
  title: string | null;
  country: string | null;
  dob: string | null;
  gender: string | null;
}

export interface User_user_result {
  __typename: "User";
  token: string;
  owner: User_user_result_owner;
}

export interface User_user_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface User_user {
  __typename: "UserResult";
  result: User_user_result | null;
  error: User_user_error | null;
}

export interface User {
  user: User_user | null;
}

export interface UserVariables {
  token: string;
}
