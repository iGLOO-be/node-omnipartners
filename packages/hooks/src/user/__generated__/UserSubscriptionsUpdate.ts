/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserUpdateSubscriptionsInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserSubscriptionsUpdate
// ====================================================

export interface UserSubscriptionsUpdate_userUpdateSubscriptions_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserSubscriptionsUpdate_userUpdateSubscriptions_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserSubscriptionsUpdate_userUpdateSubscriptions_validationErrors_errors[];
}

export interface UserSubscriptionsUpdate_userUpdateSubscriptions {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserSubscriptionsUpdate_userUpdateSubscriptions_validationErrors[] | null;
}

export interface UserSubscriptionsUpdate {
  userUpdateSubscriptions: UserSubscriptionsUpdate_userUpdateSubscriptions | null;
}

export interface UserSubscriptionsUpdateVariables {
  updateSubscriptionsInput: UserUpdateSubscriptionsInput;
  token: string;
}
