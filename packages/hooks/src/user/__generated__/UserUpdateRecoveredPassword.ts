/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserUpdateRecoveredPassword
// ====================================================

export interface UserUpdateRecoveredPassword_userUpdateRecoveredPassword_validationErrors_errors {
  __typename: "ValidationError";
  message: string;
  validator: string;
}

export interface UserUpdateRecoveredPassword_userUpdateRecoveredPassword_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserUpdateRecoveredPassword_userUpdateRecoveredPassword_validationErrors_errors[];
}

export interface UserUpdateRecoveredPassword_userUpdateRecoveredPassword {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserUpdateRecoveredPassword_userUpdateRecoveredPassword_validationErrors[] | null;
}

export interface UserUpdateRecoveredPassword {
  userUpdateRecoveredPassword: UserUpdateRecoveredPassword_userUpdateRecoveredPassword | null;
}

export interface UserUpdateRecoveredPasswordVariables {
  token: string;
  password: string;
}
