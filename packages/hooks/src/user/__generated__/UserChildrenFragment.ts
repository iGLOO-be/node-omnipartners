/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserChildrenFragment
// ====================================================

export interface UserChildrenFragment_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserChildrenFragment_children {
  __typename: "UserChild";
  birthday: any | null;
  gender: string;
  guid: string;
  firstName: string;
}

export interface UserChildrenFragment {
  __typename: "User";
  owner: UserChildrenFragment_owner;
  children: UserChildrenFragment_children[];
}
