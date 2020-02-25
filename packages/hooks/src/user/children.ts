import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { sortBy } from "lodash";
import {
  UserChildCreateInput,
  UserChildUpdateInput,
} from "../../__generated__/globalTypes";
import {
  UserChildren,
  UserChildrenVariables,
} from "./__generated__/UserChildren";
import {
  UserChildrenCreate,
  UserChildrenCreateVariables,
} from "./__generated__/UserChildrenCreate";
import {
  UserChildrenUpdate,
  UserChildrenUpdateVariables,
} from "./__generated__/UserChildrenUpdate";
import { useUserToken } from "./tokenContext";

export * from "./__generated__/UserChildren";
export * from "./__generated__/UserChildrenCreate";
export * from "./__generated__/UserChildrenUpdate";

export const UserChildrenFragment = gql`
  fragment UserChildrenFragment on User {
    owner {
      guid
    }
    children {
      birthday
      gender
      guid
      firstName
    }
  }
`;

// ------------
// QUERY
// ------------

export const UserChildrenQuery = gql`
  query UserChildren($token: String!) {
    user(token: $token) {
      result {
        ...UserChildrenFragment
      }
      error {
        message
        code
      }
    }
  }
  ${UserChildrenFragment}
`;

export const useUserChildren = () => {
  const token = useUserToken();
  const res = useQuery<UserChildren, UserChildrenVariables>(UserChildrenQuery, {
    skip: !token,
    variables: {
      token,
    },
  });

  const children = sortBy(
    (res.data &&
      res.data.user &&
      res.data.user.result &&
      res.data.user.result.children &&
      res.data.user.result.children.map(child => ({
        ...child,
        firstName: child.firstName === "--" ? "" : child.firstName,
      }))) ||
      [],
    [child => child.birthday],
  ).reverse();

  return {
    ...res,
    children,
  };
};

// ------------
// CREATE
// ------------

const UserChildrenCreateMutation = gql`
  mutation UserChildrenCreate(
    $userChildCreateInput: UserChildCreateInput!
    $token: String!
  ) {
    userChildCreate(
      userChildCreateInput: $userChildCreateInput
      token: $token
    ) {
      result {
        user {
          ...UserChildrenFragment
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

  ${UserChildrenFragment}
`;

export const useUserChildrenCreate = () => {
  const [createPet, mutationResult] = useMutation<
    UserChildrenCreate,
    UserChildrenCreateVariables
  >(UserChildrenCreateMutation);
  const userToken = useUserToken();

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userChildCreate.error),
    userChildrenCreate: async (
      userChildCreateInput: Omit<UserChildCreateInput, "firstName"> & {
        firstName?: string;
      },
      token = userToken,
    ) => {
      const { data } = await createPet({
        variables: {
          userChildCreateInput: {
            ...userChildCreateInput,
            firstName: userChildCreateInput.firstName || "--",
          },
          token,
        },
      });

      return data && data.userChildCreate;
    },
  };
};

// ------------
// UPDATE
// ------------

const UserChildrenUpdateMutation = gql`
  mutation UserChildrenUpdate(
    $token: String!
    $userChildUpdateInput: UserChildUpdateInput!
  ) {
    userChildUpdate(
      token: $token
      userChildUpdateInput: $userChildUpdateInput
    ) {
      result {
        user {
          ...UserChildrenFragment
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

  ${UserChildrenFragment}
`;

export const useUserChildrenUpdate = () => {
  const userToken = useUserToken();
  const [userChildrenUpdate, mutationResult] = useMutation<
    UserChildrenUpdate,
    UserChildrenUpdateVariables
  >(UserChildrenUpdateMutation);

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userChildUpdate.error),
    userChildrenUpdate: async (
      userChildUpdateInput: Omit<UserChildUpdateInput, "firstName"> & {
        firstName?: string;
      },
      token = userToken,
    ) => {
      const { data } = await userChildrenUpdate({
        variables: {
          token,
          userChildUpdateInput: {
            ...userChildUpdateInput,
            firstName: userChildUpdateInput.firstName || "--",
          },
        },
      });

      return data && data.userChildUpdate;
    },
  };
};
