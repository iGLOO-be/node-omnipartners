/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DealCheckSecureCode
// ====================================================

export interface DealCheckSecureCode_dealCheckSecureCode_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface DealCheckSecureCode_dealCheckSecureCode_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: DealCheckSecureCode_dealCheckSecureCode_validationErrors_errors[];
}

export interface DealCheckSecureCode_dealCheckSecureCode {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: DealCheckSecureCode_dealCheckSecureCode_validationErrors[] | null;
}

export interface DealCheckSecureCode {
  dealCheckSecureCode: DealCheckSecureCode_dealCheckSecureCode | null;
}

export interface DealCheckSecureCodeVariables {
  code: string;
  deal_ref: string;
}
