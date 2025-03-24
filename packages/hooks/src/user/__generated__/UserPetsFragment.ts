/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserPetsFragment
// ====================================================

export interface UserPetsFragment_owner {
  __typename: "UserOwner";
  id: string;
  guid: string;
}

export interface UserPetsFragment_pets_breedDetails {
  __typename: "UserBreedDetail";
  name: string | null;
}

export interface UserPetsFragment_pets {
  __typename: "UserPet";
  id: string;
  guid: string;
  name: string;
  gender: string | null;
  dob: string | null;
  neutered: boolean;
  type: string | null;
  breed: string | null;
  breedDetails: UserPetsFragment_pets_breedDetails | null;
  pictureUrl: string;
}

export interface UserPetsFragment {
  __typename: "User";
  owner: UserPetsFragment_owner;
  pets: UserPetsFragment_pets[];
}
