/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserDefaultAddressFragment
// ====================================================

export interface UserDefaultAddressFragment_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserDefaultAddressFragment_addresses {
  __typename: "UserAddress";
  id: number;
  street1: string | null;
  postalCode: string | null;
  country: string | null;
  streetnum: string | null;
  city: string | null;
  isDefault: boolean;
}

export interface UserDefaultAddressFragment {
  __typename: "User";
  owner: UserDefaultAddressFragment_owner;
  addresses: UserDefaultAddressFragment_addresses[];
}
