import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { UserFavouritesCreateInput } from "../../__generated__/globalTypes";
import {
  UserFavourites,
  UserFavouritesVariables,
} from "./__generated__/UserFavourites";
import {
  UserFavouritesCreate,
  UserFavouritesCreateVariables,
} from "./__generated__/UserFavouritesCreate";
import {
  UserFavouritesDelete,
  UserFavouritesDeleteVariables,
} from "./__generated__/UserFavouritesDelete";
import { useUserToken } from "./tokenContext";

export const UserFavouritesFragment = gql`
  fragment UserFavouritesFragment on User {
    owner {
      guid
    }
    favourites(source: $source, type: $type) {
      id
      date
      type
      content
      source
    }
  }
`;

// ------------
// QUERY
// ------------

export const UserFavouritesQuery = gql`
  query UserFavourites($token: String!, $source: String, $type: String) {
    user(token: $token) {
      result {
        ...UserFavouritesFragment
      }
      error {
        message
        code
      }
    }
  }
  ${UserFavouritesFragment}
`;

export const useUserFavourites = ({
  source,
  type,
}: {
  source?: string;
  type?: string;
}) => {
  const token = useUserToken();
  const { data, ...res } = useQuery<UserFavourites, UserFavouritesVariables>(
    UserFavouritesQuery,
    {
      skip: !token,
      variables: {
        token,
        source,
        type,
      },
    },
  );

  return {
    ...res,
    data,
    favourites:
      (data && data.user && data.user.result && data.user.result.favourites) ||
      [],
  };
};

// ------------
// CREATE
// ------------

const UserFavouritesCreateMutation = gql`
  mutation UserFavouritesCreate(
    $userFavouritesCreateInput: UserFavouritesCreateInput!
    $token: String!
    $source: String
    $type: String
  ) {
    userFavouritesCreate(
      userFavouritesCreateInput: $userFavouritesCreateInput
      token: $token
    ) {
      result {
        user {
          ...UserFavouritesFragment
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
  ${UserFavouritesFragment}
`;

export const useUserFavouritesCreate = ({
  source,
  type,
}: {
  source?: string;
  type?: string;
}) => {
  const [userFavouritesCreate, mutationResult] = useMutation<
    UserFavouritesCreate,
    UserFavouritesCreateVariables
  >(UserFavouritesCreateMutation);
  const token = useUserToken();

  return {
    ...mutationResult,
    userFavouritesCreate: async (
      userFavouritesCreateInput: UserFavouritesCreateInput,
    ) => {
      const { data } = await userFavouritesCreate({
        variables: {
          userFavouritesCreateInput,
          token,
          source,
          type,
        },
      });

      return data && data.userFavouritesCreate;
    },
  };
};

// ------------
// DELETE
// ------------

const UserFavouritesDeleteMutation = gql`
  mutation UserFavouritesDelete(
    $id: String!
    $token: String!
    $source: String
    $type: String
  ) {
    userFavouritesDelete(id: $id, token: $token) {
      result {
        user {
          ...UserFavouritesFragment
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
  ${UserFavouritesFragment}
`;

export const useUserFavouritesDelete = ({
  source,
  type,
}: {
  source?: string;
  type?: string;
}) => {
  const { data: userFavouritesData } = useUserFavourites({ source, type });
  const [userFavouritesDelete, mutationResult] = useMutation<
    UserFavouritesDelete,
    UserFavouritesDeleteVariables
  >(UserFavouritesDeleteMutation);
  const token = useUserToken();

  return {
    ...mutationResult,
    userFavouritesDelete: async (id: string) => {
      const { data } = await userFavouritesDelete({
        variables: {
          id,
          token,
          source,
          type,
        },
        optimisticResponse: {
          userFavouritesDelete: {
            result: {
              user: {
                owner: {
                  guid: `${
                    userFavouritesData &&
                    userFavouritesData.user &&
                    userFavouritesData.user.result &&
                    userFavouritesData.user.result.owner.guid
                  }`,
                  __typename: "UserOwner",
                },
                favourites:
                  (userFavouritesData &&
                    userFavouritesData.user &&
                    userFavouritesData.user.result &&
                    userFavouritesData.user.result.favourites.filter(
                      (v) => v.id !== id,
                    )) ||
                  [],
                __typename: "User",
              },
              __typename: "UserAndFavourites",
            },
            error: null,
            __typename: "UserFavouritesResult",
          },
        },
      });

      return data && data.userFavouritesDelete;
    },
  };
};
