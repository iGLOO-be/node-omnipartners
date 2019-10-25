/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserAddressUpdateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserDefaultAddressUpdate
// ====================================================

export interface UserDefaultAddressUpdate_userAddressUpdate_result_user_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserDefaultAddressUpdate_userAddressUpdate_result_user_addresses {
  __typename: "UserAddress";
  id: number;
  street1: string | null;
  postalCode: string | null;
  country: string | null;
  streetnum: string | null;
  city: string | null;
  isDefault: boolean;
}

export interface UserDefaultAddressUpdate_userAddressUpdate_result_user {
  __typename: "User";
  owner: UserDefaultAddressUpdate_userAddressUpdate_result_user_owner;
  addresses: UserDefaultAddressUpdate_userAddressUpdate_result_user_addresses[];
}

export interface UserDefaultAddressUpdate_userAddressUpdate_result {
  __typename: "UserAndAddress";
  user: UserDefaultAddressUpdate_userAddressUpdate_result_user;
}

export interface UserDefaultAddressUpdate_userAddressUpdate_error_validationErrors_errors {
  __typename: "ValidationError";
  message: string;
  validator: string;
}

export interface UserDefaultAddressUpdate_userAddressUpdate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserDefaultAddressUpdate_userAddressUpdate_error_validationErrors_errors[];
}

export interface UserDefaultAddressUpdate_userAddressUpdate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserDefaultAddressUpdate_userAddressUpdate_error_validationErrors[] | null;
}

export interface UserDefaultAddressUpdate_userAddressUpdate {
  __typename: "UserAddressUpdateResult";
  result: UserDefaultAddressUpdate_userAddressUpdate_result | null;
  error: UserDefaultAddressUpdate_userAddressUpdate_error | null;
}

export interface UserDefaultAddressUpdate {
  userAddressUpdate: UserDefaultAddressUpdate_userAddressUpdate;
}

export interface UserDefaultAddressUpdateVariables {
  token: string;
  userAddressInput: UserAddressUpdateInput;
}
