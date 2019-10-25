/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserPetUpdateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserPetsUpdate
// ====================================================

export interface UserPetsUpdate_userPetUpdate_result_user_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserPetsUpdate_userPetUpdate_result_user_pets {
  __typename: "UserPet";
  guid: string;
  name: string;
  gender: string | null;
  dob: string | null;
  neutered: boolean;
  type: string;
  breed: string;
  pictureUrl: string;
}

export interface UserPetsUpdate_userPetUpdate_result_user {
  __typename: "User";
  owner: UserPetsUpdate_userPetUpdate_result_user_owner;
  pets: UserPetsUpdate_userPetUpdate_result_user_pets[];
}

export interface UserPetsUpdate_userPetUpdate_result {
  __typename: "UserAndPet";
  user: UserPetsUpdate_userPetUpdate_result_user;
}

export interface UserPetsUpdate_userPetUpdate_error_validationErrors_errors {
  __typename: "ValidationError";
  message: string;
  validator: string;
}

export interface UserPetsUpdate_userPetUpdate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserPetsUpdate_userPetUpdate_error_validationErrors_errors[];
}

export interface UserPetsUpdate_userPetUpdate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserPetsUpdate_userPetUpdate_error_validationErrors[] | null;
}

export interface UserPetsUpdate_userPetUpdate {
  __typename: "UserPetUpdateResult";
  result: UserPetsUpdate_userPetUpdate_result | null;
  error: UserPetsUpdate_userPetUpdate_error | null;
}

export interface UserPetsUpdate {
  userPetUpdate: UserPetsUpdate_userPetUpdate;
}

export interface UserPetsUpdateVariables {
  token: string;
  userPetInput: UserPetUpdateInput;
}
