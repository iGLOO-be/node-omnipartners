/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserPetCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserPetsCreate
// ====================================================

export interface UserPetsCreate_userPetCreate_result_user_owner {
  __typename: "UserOwner";
  id: string;
  guid: string;
}

export interface UserPetsCreate_userPetCreate_result_user_pets_breedDetails {
  __typename: "UserBreedDetail";
  name: string | null;
}

export interface UserPetsCreate_userPetCreate_result_user_pets {
  __typename: "UserPet";
  id: string;
  guid: string;
  name: string;
  gender: string | null;
  dob: string | null;
  neutered: boolean;
  type: string | null;
  breed: string | null;
  breedDetails: UserPetsCreate_userPetCreate_result_user_pets_breedDetails | null;
  pictureUrl: string;
}

export interface UserPetsCreate_userPetCreate_result_user {
  __typename: "User";
  id: string;
  owner: UserPetsCreate_userPetCreate_result_user_owner;
  pets: UserPetsCreate_userPetCreate_result_user_pets[];
}

export interface UserPetsCreate_userPetCreate_result_pet_breedDetails {
  __typename: "UserBreedDetail";
  name: string | null;
}

export interface UserPetsCreate_userPetCreate_result_pet {
  __typename: "UserPet";
  id: string;
  guid: string;
  name: string;
  gender: string | null;
  dob: string | null;
  neutered: boolean;
  type: string | null;
  breed: string | null;
  breedDetails: UserPetsCreate_userPetCreate_result_pet_breedDetails | null;
  pictureUrl: string;
}

export interface UserPetsCreate_userPetCreate_result {
  __typename: "UserAndPet";
  user: UserPetsCreate_userPetCreate_result_user;
  pet: UserPetsCreate_userPetCreate_result_pet;
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
