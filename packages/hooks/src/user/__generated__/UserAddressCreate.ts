/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserAddressCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserAddressCreate
// ====================================================

export interface UserAddressCreate_userAddressCreate_result_user_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserAddressCreate_userAddressCreate_result_user_addresses {
  __typename: "UserAddress";
  id: number;
  name: string | null;
  street1: string | null;
  street2: string | null;
  postalCode: string | null;
  country: string | null;
  streetnum: string | null;
  city: string | null;
  isDefault: boolean;
  type: string | null;
}

export interface UserAddressCreate_userAddressCreate_result_user {
  __typename: "User";
  owner: UserAddressCreate_userAddressCreate_result_user_owner;
  addresses: UserAddressCreate_userAddressCreate_result_user_addresses[];
}

export interface UserAddressCreate_userAddressCreate_result {
  __typename: "UserAndAddress";
  user: UserAddressCreate_userAddressCreate_result_user;
}

export interface UserAddressCreate_userAddressCreate_error_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserAddressCreate_userAddressCreate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserAddressCreate_userAddressCreate_error_validationErrors_errors[];
}

export interface UserAddressCreate_userAddressCreate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserAddressCreate_userAddressCreate_error_validationErrors[] | null;
}

export interface UserAddressCreate_userAddressCreate {
  __typename: "UserAddressUpdateResult";
  result: UserAddressCreate_userAddressCreate_result | null;
  error: UserAddressCreate_userAddressCreate_error | null;
}

export interface UserAddressCreate {
  userAddressCreate: UserAddressCreate_userAddressCreate;
}

export interface UserAddressCreateVariables {
  userAddressInput: UserAddressCreateInput;
  token: string;
}
