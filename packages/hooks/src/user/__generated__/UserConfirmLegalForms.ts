/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserConfirmLegalForms
// ====================================================

export interface UserConfirmLegalForms_userConfirmLegalForms {
  __typename: "GenericValidationError";
  message: string;
  code: string;
}

export interface UserConfirmLegalForms {
  userConfirmLegalForms: UserConfirmLegalForms_userConfirmLegalForms | null;
}

export interface UserConfirmLegalFormsVariables {
  token: string;
  legalForms: string[];
  confirmedPlace: string;
}
