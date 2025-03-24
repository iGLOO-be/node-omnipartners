/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserPetDeleteInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserPetsDelete
// ====================================================

export interface UserPetsDelete_userPetDelete_result_owner {
  __typename: "UserOwner";
  id: string;
  guid: string;
}

export interface UserPetsDelete_userPetDelete_result_pets_breedDetails {
  __typename: "UserBreedDetail";
  name: string | null;
}

export interface UserPetsDelete_userPetDelete_result_pets {
  __typename: "UserPet";
  id: string;
  guid: string;
  name: string;
  gender: string | null;
  dob: string | null;
  neutered: boolean;
  type: string | null;
  breed: string | null;
  breedDetails: UserPetsDelete_userPetDelete_result_pets_breedDetails | null;
  pictureUrl: string;
}

export interface UserPetsDelete_userPetDelete_result {
  __typename: "User";
  owner: UserPetsDelete_userPetDelete_result_owner;
  pets: UserPetsDelete_userPetDelete_result_pets[];
}

export interface UserPetsDelete_userPetDelete_error {
  __typename: "GenericError";
  message: string;
  code: string;
}

export interface UserPetsDelete_userPetDelete {
  __typename: "UserResult";
  result: UserPetsDelete_userPetDelete_result | null;
  error: UserPetsDelete_userPetDelete_error | null;
}

export interface UserPetsDelete {
  userPetDelete: UserPetsDelete_userPetDelete;
}

export interface UserPetsDeleteVariables {
  token: string;
  userPetDeleteInput: UserPetDeleteInput;
}
