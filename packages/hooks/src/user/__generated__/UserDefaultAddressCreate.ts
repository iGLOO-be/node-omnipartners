/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserAddressCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserDefaultAddressCreate
// ====================================================

export interface UserDefaultAddressCreate_userAddressCreate_result_user_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserDefaultAddressCreate_userAddressCreate_result_user_addresses {
  __typename: "UserAddress";
  id: number;
  street1: string | null;
  postalCode: string | null;
  country: string | null;
  streetnum: string | null;
  city: string | null;
  isDefault: boolean;
}

export interface UserDefaultAddressCreate_userAddressCreate_result_user {
  __typename: "User";
  owner: UserDefaultAddressCreate_userAddressCreate_result_user_owner;
  addresses: UserDefaultAddressCreate_userAddressCreate_result_user_addresses[];
}

export interface UserDefaultAddressCreate_userAddressCreate_result {
  __typename: "UserAndAddress";
  user: UserDefaultAddressCreate_userAddressCreate_result_user;
}

export interface UserDefaultAddressCreate_userAddressCreate_error_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserDefaultAddressCreate_userAddressCreate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserDefaultAddressCreate_userAddressCreate_error_validationErrors_errors[];
}

export interface UserDefaultAddressCreate_userAddressCreate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserDefaultAddressCreate_userAddressCreate_error_validationErrors[] | null;
}

export interface UserDefaultAddressCreate_userAddressCreate {
  __typename: "UserAddressUpdateResult";
  result: UserDefaultAddressCreate_userAddressCreate_result | null;
  error: UserDefaultAddressCreate_userAddressCreate_error | null;
}

export interface UserDefaultAddressCreate {
  userAddressCreate: UserDefaultAddressCreate_userAddressCreate;
}

export interface UserDefaultAddressCreateVariables {
  userAddressInput: UserAddressCreateInput;
  token: string;
}
