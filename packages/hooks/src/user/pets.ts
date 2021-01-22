import { useMutation, useQuery } from "@apollo/react-hooks";
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

export const UserPetsFragment = gql`
  fragment UserPetsFragment on User {
    owner {
      guid
    }
    pets {
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
  }
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

export const useUserPets = () => {
  const token = useUserToken();
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
`;

export const useUserPetsCreate = () => {
  const [createPet, mutationResult] = useMutation<
    UserPetsCreate,
    UserPetsCreateVariables
  >(UserPetsCreateMutation);
  const userToken = useUserToken();

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
`;

// ------------
// UPDATE
// ------------

export const useUserPetsUpdate = () => {
  const token = useUserToken();
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

export const useUserPetsDelete = () => {
  const token = useUserToken();
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
