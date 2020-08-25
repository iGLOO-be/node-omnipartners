/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserPublicSubscriptionsUpdateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserPublicSubscriptionsUpdate
// ====================================================

export interface UserPublicSubscriptionsUpdate_userPublicSubscriptionsUpdate_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserPublicSubscriptionsUpdate_userPublicSubscriptionsUpdate_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserPublicSubscriptionsUpdate_userPublicSubscriptionsUpdate_validationErrors_errors[];
}

export interface UserPublicSubscriptionsUpdate_userPublicSubscriptionsUpdate {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserPublicSubscriptionsUpdate_userPublicSubscriptionsUpdate_validationErrors[] | null;
}

export interface UserPublicSubscriptionsUpdate {
  userPublicSubscriptionsUpdate: UserPublicSubscriptionsUpdate_userPublicSubscriptionsUpdate | null;
}

export interface UserPublicSubscriptionsUpdateVariables {
  input: UserPublicSubscriptionsUpdateInput;
  userGuid: string;
  userEmail: string;
}
