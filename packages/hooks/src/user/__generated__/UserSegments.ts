/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserSegments
// ====================================================

export interface UserSegments_user_result_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserSegments_user_result_segments {
  __typename: "UserSegment";
  handle: string;
  id: number;
}

export interface UserSegments_user_result {
  __typename: "User";
  token: string;
  owner: UserSegments_user_result_owner;
  segments: UserSegments_user_result_segments[];
}

export interface UserSegments_user_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserSegments_user {
  __typename: "UserResult";
  result: UserSegments_user_result | null;
  error: UserSegments_user_error | null;
}

export interface UserSegments {
  user: UserSegments_user | null;
}

export interface UserSegmentsVariables {
  token: string;
}
