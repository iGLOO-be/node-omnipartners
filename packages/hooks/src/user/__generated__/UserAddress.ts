/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserAddress
// ====================================================

export interface UserAddress_user_result_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserAddress_user_result_addresses {
  __typename: "UserAddress";
  id: number;
  street1: string | null;
  postalCode: string | null;
  country: string | null;
  streetnum: string | null;
  city: string | null;
  isDefault: boolean;
}

export interface UserAddress_user_result {
  __typename: "User";
  token: string;
  owner: UserAddress_user_result_owner;
  addresses: UserAddress_user_result_addresses[];
}

export interface UserAddress_user_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserAddress_user {
  __typename: "UserResult";
  result: UserAddress_user_result | null;
  error: UserAddress_user_error | null;
}

export interface UserAddress {
  user: UserAddress_user | null;
}

export interface UserAddressVariables {
  token: string;
}
