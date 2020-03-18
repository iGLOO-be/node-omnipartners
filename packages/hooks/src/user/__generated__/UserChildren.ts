/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserChildren
// ====================================================

export interface UserChildren_user_result_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserChildren_user_result_children {
  __typename: "UserChild";
  birthday: any | null;
  gender: string;
  guid: string;
  firstName: string;
}

export interface UserChildren_user_result {
  __typename: "User";
  owner: UserChildren_user_result_owner;
  children: UserChildren_user_result_children[];
}

export interface UserChildren_user_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserChildren_user {
  __typename: "UserResult";
  result: UserChildren_user_result | null;
  error: UserChildren_user_error | null;
}

export interface UserChildren {
  user: UserChildren_user | null;
}

export interface UserChildrenVariables {
  token: string;
}
