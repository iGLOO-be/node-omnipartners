/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserChildrenFragment
// ====================================================

export interface UserChildrenFragment_children {
  __typename: "UserChild";
  birthday: any | null;
  gender: string;
  guid: string;
  firstName: string;
}

export interface UserChildrenFragment {
  __typename: "User";
  children: UserChildrenFragment_children[];
}
