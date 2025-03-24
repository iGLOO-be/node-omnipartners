/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserPets
// ====================================================

export interface UserPets_user_result_owner {
  __typename: "UserOwner";
  id: string;
  guid: string;
}

export interface UserPets_user_result_pets_breedDetails {
  __typename: "UserBreedDetail";
  name: string | null;
}

export interface UserPets_user_result_pets {
  __typename: "UserPet";
  id: string;
  guid: string;
  name: string;
  gender: string | null;
  dob: string | null;
  neutered: boolean;
  type: string | null;
  breed: string | null;
  breedDetails: UserPets_user_result_pets_breedDetails | null;
  pictureUrl: string;
}

export interface UserPets_user_result {
  __typename: "User";
  id: string;
  token: string;
  owner: UserPets_user_result_owner;
  pets: UserPets_user_result_pets[];
}

export interface UserPets_user_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserPets_user {
  __typename: "UserResult";
  result: UserPets_user_result | null;
  error: UserPets_user_error | null;
}

export interface UserPets {
  user: UserPets_user | null;
}

export interface UserPetsVariables {
  token: string;
}
