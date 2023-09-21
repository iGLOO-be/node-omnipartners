/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserSegmentsFragment
// ====================================================

export interface UserSegmentsFragment_owner {
  __typename: "UserOwner";
  id: string;
  guid: string;
}

export interface UserSegmentsFragment_segments {
  __typename: "UserSegment";
  handle: string;
  id: number;
}

export interface UserSegmentsFragment {
  __typename: "User";
  owner: UserSegmentsFragment_owner;
  segments: UserSegmentsFragment_segments[];
}
