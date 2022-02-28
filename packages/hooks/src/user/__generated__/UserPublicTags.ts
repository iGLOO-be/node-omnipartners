/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserPublicTags
// ====================================================

export interface UserPublicTags_userPublicTags_result {
  __typename: "UserPublicTagsUser";
  tags: string[];
}

export interface UserPublicTags_userPublicTags_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserPublicTags_userPublicTags {
  __typename: "UserPublicTagsResult";
  result: UserPublicTags_userPublicTags_result | null;
  error: UserPublicTags_userPublicTags_error | null;
}

export interface UserPublicTags {
  userPublicTags: UserPublicTags_userPublicTags | null;
}

export interface UserPublicTagsVariables {
  publicToken: string;
  userEmail: string;
}
