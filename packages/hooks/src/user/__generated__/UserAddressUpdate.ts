/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserAddressUpdateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserAddressUpdate
// ====================================================

export interface UserAddressUpdate_userAddressUpdate_result_user_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserAddressUpdate_userAddressUpdate_result_user_addresses {
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
  phone: string | null;
}

export interface UserAddressUpdate_userAddressUpdate_result_user {
  __typename: "User";
  owner: UserAddressUpdate_userAddressUpdate_result_user_owner;
  addresses: UserAddressUpdate_userAddressUpdate_result_user_addresses[];
}

export interface UserAddressUpdate_userAddressUpdate_result {
  __typename: "UserAndAddress";
  user: UserAddressUpdate_userAddressUpdate_result_user;
}

export interface UserAddressUpdate_userAddressUpdate_error_validationErrors_errors {
  __typename: "ValidationError";
  message: string;
  validator: string;
}

export interface UserAddressUpdate_userAddressUpdate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserAddressUpdate_userAddressUpdate_error_validationErrors_errors[];
}

export interface UserAddressUpdate_userAddressUpdate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserAddressUpdate_userAddressUpdate_error_validationErrors[] | null;
}

export interface UserAddressUpdate_userAddressUpdate {
  __typename: "UserAddressUpdateResult";
  result: UserAddressUpdate_userAddressUpdate_result | null;
  error: UserAddressUpdate_userAddressUpdate_error | null;
}

export interface UserAddressUpdate {
  userAddressUpdate: UserAddressUpdate_userAddressUpdate;
}

export interface UserAddressUpdateVariables {
  token: string;
  userAddressInput: UserAddressUpdateInput;
}
