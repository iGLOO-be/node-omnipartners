/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { DealSubscribeInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DealSubscribe
// ====================================================

export interface DealSubscribe_dealSubscribe_validationErrors_errors {
  __typename: "ValidationError";
  message: string;
  validator: string;
}

export interface DealSubscribe_dealSubscribe_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: DealSubscribe_dealSubscribe_validationErrors_errors[];
}

export interface DealSubscribe_dealSubscribe {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: DealSubscribe_dealSubscribe_validationErrors[] | null;
}

export interface DealSubscribe {
  dealSubscribe: DealSubscribe_dealSubscribe | null;
}

export interface DealSubscribeVariables {
  dealSubscribeInput: DealSubscribeInput;
  token: string;
}
