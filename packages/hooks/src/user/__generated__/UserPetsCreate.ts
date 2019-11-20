/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserPetCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserPetsCreate
// ====================================================

export interface UserPetsCreate_userPetCreate_result_user_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserPetsCreate_userPetCreate_result_user_pets_breedDetails {
  __typename: "UserBreedDetail";
  name: string;
}

export interface UserPetsCreate_userPetCreate_result_user_pets {
  __typename: "UserPet";
  guid: string;
  name: string;
  gender: string | null;
  dob: string | null;
  neutered: boolean;
  type: string;
  breed: string;
  breedDetails: UserPetsCreate_userPetCreate_result_user_pets_breedDetails;
  pictureUrl: string;
}

export interface UserPetsCreate_userPetCreate_result_user {
  __typename: "User";
  owner: UserPetsCreate_userPetCreate_result_user_owner;
  pets: UserPetsCreate_userPetCreate_result_user_pets[];
}

export interface UserPetsCreate_userPetCreate_result {
  __typename: "UserAndPet";
  user: UserPetsCreate_userPetCreate_result_user;
}

export interface UserPetsCreate_userPetCreate_error_validationErrors_errors {
  __typename: "ValidationError";
  validator: string;
  message: string;
}

export interface UserPetsCreate_userPetCreate_error_validationErrors {
  __typename: "FieldValidationError";
  field: string;
  errors: UserPetsCreate_userPetCreate_error_validationErrors_errors[];
}

export interface UserPetsCreate_userPetCreate_error {
  __typename: "GenericValidationError";
  message: string;
  code: string;
  validationErrors: UserPetsCreate_userPetCreate_error_validationErrors[] | null;
}

export interface UserPetsCreate_userPetCreate {
  __typename: "UserPetUpdateResult";
  result: UserPetsCreate_userPetCreate_result | null;
  error: UserPetsCreate_userPetCreate_error | null;
}

export interface UserPetsCreate {
  userPetCreate: UserPetsCreate_userPetCreate;
}

export interface UserPetsCreateVariables {
  userPetInput: UserPetCreateInput;
  token: string;
}
