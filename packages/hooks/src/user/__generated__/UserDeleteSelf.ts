/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserDeleteSelf
// ====================================================

export interface UserDeleteSelf_userDeleteSelf {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserDeleteSelf {
  userDeleteSelf: UserDeleteSelf_userDeleteSelf | null;
}

export interface UserDeleteSelfVariables {
  token: string;
}
