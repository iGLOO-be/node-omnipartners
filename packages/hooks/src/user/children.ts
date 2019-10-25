import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
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

export const UserChildrenFragment = gql`
  fragment UserChildrenFragment on User {
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
        owner {
          guid
        }
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

  return {
    ...res,
    children:
      (res.data &&
        res.data.user &&
        res.data.user.result &&
        res.data.user.result.children) ||
      [],
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
    userChildCreate(userChildCreateInput: $userChildCreateInput, token: $token) {
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
  const token = useUserToken();

  return {
    ...mutationResult,
    userChildrenCreate: async (
      userChildCreateInput: Omit<UserChildCreateInput, "firstName"> & {
        firstName?: string;
      },
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
    userChildUpdate(token: $token, userChildUpdateInput: $userChildUpdateInput) {
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
  const token = useUserToken();
  const [userChildrenUpdate, mutationResult] = useMutation<
    UserChildrenUpdate,
    UserChildrenUpdateVariables
  >(UserChildrenUpdateMutation);

  return {
    ...mutationResult,
    userChildrenUpdate: async (
      userChildUpdateInput: Omit<UserChildUpdateInput, "firstName"> & {
        firstName?: string;
      },
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
