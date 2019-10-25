/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserPetsFragment
// ====================================================

export interface UserPetsFragment_owner {
  __typename: "UserOwner";
  guid: string;
}

export interface UserPetsFragment_pets {
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

export interface UserPetsFragment {
  __typename: "User";
  owner: UserPetsFragment_owner;
  pets: UserPetsFragment_pets[];
}
