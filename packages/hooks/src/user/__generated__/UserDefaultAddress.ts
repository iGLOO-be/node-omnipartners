/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDefaultAddress
// ====================================================

export interface UserDefaultAddress_user_result_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserDefaultAddress_user_result_addresses {
  __typename: "UserAddress";
  id: number;
  street1: string | null;
  postalCode: string | null;
  country: string | null;
  streetnum: string | null;
  city: string | null;
  isDefault: boolean;
}

export interface UserDefaultAddress_user_result {
  __typename: "User";
  token: string;
  owner: UserDefaultAddress_user_result_owner;
  addresses: UserDefaultAddress_user_result_addresses[];
}

export interface UserDefaultAddress_user_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserDefaultAddress_user {
  __typename: "UserResult";
  result: UserDefaultAddress_user_result | null;
  error: UserDefaultAddress_user_error | null;
}

export interface UserDefaultAddress {
  user: UserDefaultAddress_user | null;
}

export interface UserDefaultAddressVariables {
  token: string;
}
