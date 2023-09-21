/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserPetFragment
// ====================================================

export interface UserPetFragment_breedDetails {
  __typename: "UserBreedDetail";
  name: string | null;
}

export interface UserPetFragment {
  __typename: "UserPet";
  id: string;
  guid: string;
  name: string;
  gender: string | null;
  dob: string | null;
  neutered: boolean;
  type: string;
  breed: string | null;
  breedDetails: UserPetFragment_breedDetails | null;
  pictureUrl: string;
}
