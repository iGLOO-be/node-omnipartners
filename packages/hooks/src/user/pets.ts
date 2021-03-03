import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  UserPetCreateInput,
  UserPetUpdateInput,
  UserPetDeleteInput,
} from "../../__generated__/globalTypes";
import { UserPets, UserPetsVariables } from "./__generated__/UserPets";
import {
  UserPetsCreate,
  UserPetsCreateVariables,
} from "./__generated__/UserPetsCreate";
import {
  UserPetsUpdate,
  UserPetsUpdateVariables,
} from "./__generated__/UserPetsUpdate";
import { useUserToken } from "./tokenContext";
import {
  UserPetsDelete,
  UserPetsDeleteVariables,
} from "./__generated__/UserPetsDelete";

export * from "./__generated__/UserPets";
export * from "./__generated__/UserPetsCreate";
export * from "./__generated__/UserPetsUpdate";

export const UserPetFragment = gql`
  fragment UserPetFragment on UserPet {
    guid
    name
    gender
    dob
    neutered
    type
    breed
    breedDetails {
      name
    }
    pictureUrl
  }
`;

export const UserPetsFragment = gql`
  fragment UserPetsFragment on User {
    owner {
      guid
    }
    pets {
      ...UserPetFragment
    }
  }

  ${UserPetFragment}
`;

// ------------
// QUERY
// ------------

export const UserPetsQuery = gql`
  query UserPets($token: String!) {
    user(token: $token) {
      result {
        token
        owner {
          guid
        }
        ...UserPetsFragment
      }
      error {
        message
        code
      }
    }
  }
  ${UserPetsFragment}
`;

export const useUserPets = ({ token: givenToken }: { token?: string } = {}) => {
  const userToken = useUserToken();
  const token = givenToken || userToken;
  const res = useQuery<UserPets, UserPetsVariables>(UserPetsQuery, {
    skip: !token,
    variables: {
      token,
    },
  });

  return {
    ...res,
    error: res.error || res.data?.user?.error,
    pets:
      (res.data &&
        res.data.user &&
        res.data.user.result &&
        res.data.user.result.pets) ||
      [],
  };
};

// ------------
// CREATE
// ------------

const UserPetsCreateMutation = gql`
  mutation UserPetsCreate($userPetInput: UserPetCreateInput!, $token: String!) {
    userPetCreate(userPetInput: $userPetInput, token: $token) {
      result {
        user {
          ...UserPetsFragment
        }
        pet {
          ...UserPetFragment
        }
      }
      error {
        message
        code
        validationErrors {
          field
          errors {
            validator
            message
          }
        }
      }
    }
  }

  ${UserPetsFragment}
  ${UserPetFragment}
`;

export const useUserPetsCreate = ({
  token: givenToken,
}: { token?: string } = {}) => {
  const _userToken = useUserToken();
  const userToken = givenToken || _userToken;
  const [createPet, mutationResult] = useMutation<
    UserPetsCreate,
    UserPetsCreateVariables
  >(UserPetsCreateMutation);

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userPetCreate.error),
    userPetsCreate: async ({
      token = userToken,
      ...userPetCreateInput
    }: { token?: string } & UserPetCreateInput) => {
      const { data } = await createPet({
        variables: {
          userPetInput: userPetCreateInput,
          token,
        },
      });

      return data && data.userPetCreate;
    },
  };
};
const UserPetsUpdateMutation = gql`
  mutation UserPetsUpdate($token: String!, $userPetInput: UserPetUpdateInput!) {
    userPetUpdate(token: $token, userPetInput: $userPetInput) {
      result {
        user {
          ...UserPetsFragment
        }
        pet {
          ...UserPetFragment
        }
      }
      error {
        message
        code
        validationErrors {
          field
          errors {
            message
            validator
          }
        }
      }
    }
  }

  ${UserPetsFragment}
  ${UserPetFragment}
`;

// ------------
// UPDATE
// ------------

export const useUserPetsUpdate = ({
  token: givenToken,
}: { token?: string } = {}) => {
  const userToken = useUserToken();
  const token = givenToken || userToken;
  const [userPetsUpdate, mutationResult] = useMutation<
    UserPetsUpdate,
    UserPetsUpdateVariables
  >(UserPetsUpdateMutation);

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userPetUpdate.error),
    userPetsUpdate: async (userPetInput: UserPetUpdateInput) => {
      const { data } = await userPetsUpdate({
        variables: {
          token,
          userPetInput,
        },
      });

      return data && data.userPetUpdate;
    },
  };
};

const UserPetsDeleteMutation = gql`
  mutation UserPetsDelete(
    $token: String!
    $userPetDeleteInput: UserPetDeleteInput!
  ) {
    userPetDelete(token: $token, userPetDeleteInput: $userPetDeleteInput) {
      result {
        ...UserPetsFragment
      }
      error {
        message
        code
      }
    }
  }

  ${UserPetsFragment}
`;

// ------------
// DELETE
// ------------

export const useUserPetsDelete = ({
  token: givenToken,
}: { token?: string } = {}) => {
  const userToken = useUserToken();
  const token = givenToken || userToken;
  const [userPetsDelete, mutationResult] = useMutation<
    UserPetsDelete,
    UserPetsDeleteVariables
  >(UserPetsDeleteMutation);

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userPetDelete.error),
    userPetsDelete: async (userPetDeleteInput: UserPetDeleteInput) => {
      const { data } = await userPetsDelete({
        variables: {
          token,
          userPetDeleteInput,
        },
      });

      return data && data.userPetDelete;
    },
  };
};
