/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserAddressFragment
// ====================================================

export interface UserAddressFragment_owner {
  __typename: "UserOwner";
  id: string;
  guid: string;
}

export interface UserAddressFragment_addresses {
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

export interface UserAddressFragment {
  __typename: "User";
  owner: UserAddressFragment_owner;
  addresses: UserAddressFragment_addresses[];
}
