/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserRecoverPassword
// ====================================================

export interface UserRecoverPassword_userRecoverPassword {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserRecoverPassword {
  userRecoverPassword: UserRecoverPassword_userRecoverPassword | null;
}

export interface UserRecoverPasswordVariables {
  email: string;
}
