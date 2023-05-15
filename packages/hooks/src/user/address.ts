import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  UserAddressCreateInput,
  UserAddressUpdateInput,
} from "../../__generated__/globalTypes";
import { decodeToken } from "../lib/tokenStorage";
import { UserAddress, UserAddressVariables } from "./__generated__/UserAddress";
import {
  UserAddressCreate,
  UserAddressCreateVariables,
} from "./__generated__/UserAddressCreate";
import {
  UserAddressUpdate,
  UserAddressUpdateVariables,
} from "./__generated__/UserAddressUpdate";
import { useUserToken } from "./tokenContext";

export * from "./__generated__/UserAddress";
export * from "./__generated__/UserAddressCreate";
export * from "./__generated__/UserAddressUpdate";

export const UserAddressFragment = gql`
  fragment UserAddressFragment on User {
    owner {
      guid
    }
    addresses {
      id
      name
      street1
      street2
      postalCode
      country
      streetnum
      city
      isDefault
      type
      phone
    }
  }
`;

// ------------
// QUERY
// ------------

export const UserAddressQuery = gql`
  query UserAddress($token: String!) {
    user(token: $token) {
      result {
        token
        owner {
          guid
        }
        ...UserAddressFragment
      }
      error {
        message
        code
      }
    }
  }
  ${UserAddressFragment}
`;

export const useUserAddress = () => {
  const token = useUserToken();
  const res = useQuery<UserAddress, UserAddressVariables>(UserAddressQuery, {
    skip: !token,
    variables: {
      token,
    },
  });

  return {
    ...res,
    addresses:
      (res.data &&
        res.data.user &&
        res.data.user.result &&
        res.data.user.result.addresses &&
        res.data.user.result.addresses) ||
      [],
  };
};

// ------------
// CREATE
// ------------

const UserAddressCreateMutation = gql`
  mutation UserAddressCreate(
    $userAddressInput: UserAddressCreateInput!
    $token: String!
  ) {
    userAddressCreate(userAddressInput: $userAddressInput, token: $token) {
      result {
        user {
          ...UserAddressFragment
        }
        address {
          id
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

  ${UserAddressFragment}
`;

export const useUserAddressCreate = ({
  optimistic = false,
}: {
  optimistic?: boolean;
} = {}) => {
  const [createAddress, mutationResult] = useMutation<
    UserAddressCreate,
    UserAddressCreateVariables
  >(UserAddressCreateMutation);
  const userToken = useUserToken();

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userAddressCreate.error),
    userAddressCreate: async (
      userAddressCreateInput: UserAddressCreateInput,
      token = userToken,
    ) => {
      const { user_guid } = decodeToken(token);
      const { data } = await createAddress({
        variables: {
          userAddressInput: userAddressCreateInput,
          token,
        },
        ...(optimistic && {
          optimisticResponse: {
            userAddressCreate: {
              __typename: "UserAddressUpdateResult",
              error: null,
              result: {
                __typename: "UserAndAddress",
                user: {
                  __typename: "User",
                  addresses: [
                    {
                      __typename: "UserAddress",
                      name: "",
                      street1: "",
                      street2: "",
                      country: "",
                      streetnum: "",
                      type: "",
                      ...userAddressCreateInput,
                      isDefault: userAddressCreateInput.isDefault
                        ? true
                        : false,
                      id: -1,
                      phone: ""
                    },
                  ],
                  owner: {
                    __typename: "UserOwner",
                    guid: user_guid,
                  },
                },
                address: { __typename: "UserAddress", id: 0 },
              },
            },
          },
        }),
      });

      return data && data.userAddressCreate;
    },
  };
};

// ------------
// UPDATE
// ------------

const UserAddressUpdateMutation = gql`
  mutation UserAddressUpdate(
    $token: String!
    $userAddressInput: UserAddressUpdateInput!
  ) {
    userAddressUpdate(token: $token, userAddressInput: $userAddressInput) {
      result {
        user {
          ...UserAddressFragment
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

  ${UserAddressFragment}
`;

export const useUserAddressUpdate = ({
  optimistic = false,
}: {
  optimistic?: boolean;
} = {}) => {
  const userToken = useUserToken();
  const [userAddressUpdate, mutationResult] = useMutation<
    UserAddressUpdate,
    UserAddressUpdateVariables
  >(UserAddressUpdateMutation);

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userAddressUpdate.error),
    userAddressUpdate: async (
      userAddressInput: UserAddressUpdateInput,
      token = userToken,
    ) => {
      const { user_guid } = decodeToken(token);
      const { data } = await userAddressUpdate({
        variables: {
          token,
          userAddressInput,
        },
        ...(optimistic && {
          optimisticResponse: {
            userAddressUpdate: {
              __typename: "UserAddressUpdateResult",
              error: null,
              result: {
                __typename: "UserAndAddress",
                user: {
                  __typename: "User",
                  addresses: [
                    {
                      __typename: "UserAddress",
                      name: "",
                      street1: "",
                      street2: "",
                      country: "",
                      streetnum: "",
                      type: "",
                      ...userAddressInput,
                      isDefault: userAddressInput.isDefault ? true : false,
                      id: -1,
                      phone: ""
                    },
                  ],
                  owner: {
                    __typename: "UserOwner",
                    guid: user_guid,
                  },
                },
              },
            },
          },
        }),
      });

      return data && data.userAddressUpdate;
    },
  };
};
