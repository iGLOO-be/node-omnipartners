import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserPetCreateInput, UserPetUpdateInput } from "../../__generated__/globalTypes";
import {
  UserPets,
  UserPetsVariables,
} from "./__generated__/UserPets";
import {
  UserPetsCreate,
  UserPetsCreateVariables,
} from "./__generated__/UserPetsCreate";
import {
  UserPetsUpdate,
  UserPetsUpdateVariables,
} from "./__generated__/UserPetsUpdate";
import { useUserToken } from "./tokenContext";

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
  const res = useQuery<UserPets, UserPetsVariables>(
    UserPetsQuery,
    {
      skip: !token,
      variables: {
        token,
      },
    },
  );

  return {
    ...res,
    pets:
      res.data &&
      res.data.user &&
      res.data.user.result &&
      res.data.user.result.pets,
  };
};

// ------------
// CREATE
// ------------

const UserPetsCreateMutation = gql`
  mutation UserPetsCreate(
    $userPetInput: UserPetCreateInput!
    $token: String!
  ) {
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
  const token = useUserToken();

  return {
    ...mutationResult,
    userPetsCreate: async (
      userPetCreateInput: UserPetCreateInput,
    ) => {
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
  mutation UserPetsUpdate(
    $token: String!
    $userPetInput: UserPetUpdateInput!
  ) {
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
    userPetsUpdate: async (
      userPetInput: UserPetUpdateInput,
    ) => {
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
