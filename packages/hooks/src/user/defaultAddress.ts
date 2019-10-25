import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  UserAddressCreateInput,
  UserAddressUpdateInput,
} from "../../__generated__/globalTypes";
import { decodeToken } from "../lib/tokenStorage";
import {
  UserDefaultAddress,
  UserDefaultAddressVariables,
} from "./__generated__/UserDefaultAddress";
import {
  UserDefaultAddressCreate,
  UserDefaultAddressCreateVariables,
} from "./__generated__/UserDefaultAddressCreate";
import {
  UserDefaultAddressUpdate,
  UserDefaultAddressUpdateVariables,
} from "./__generated__/UserDefaultAddressUpdate";
import { useUserToken } from "./useUser";

export const UserDefaultAddressFragment = gql`
  fragment UserDefaultAddressFragment on User {
    owner {
      guid
    }
    addresses {
      id
      street1
      postalCode
      country
      streetnum
      city
      isDefault
    }
  }
`;

// ------------
// QUERY
// ------------

export const UserDefaultAddressQuery = gql`
  query UserDefaultAddress($token: String!) {
    user(token: $token) {
      result {
        token
        owner {
          guid
        }
        ...UserDefaultAddressFragment
      }
      error {
        message
        code
      }
    }
  }
  ${UserDefaultAddressFragment}
`;

export const useUserDefaultAddress = () => {
  const token = useUserToken();
  const res = useQuery<UserDefaultAddress, UserDefaultAddressVariables>(
    UserDefaultAddressQuery,
    {
      skip: !token,
      variables: {
        token,
      },
    },
  );

  return {
    ...res,
    data:
      res.data &&
      res.data.user &&
      res.data.user.result &&
      res.data.user.result.addresses &&
      res.data.user.result.addresses.find(address => address.isDefault),
  };
};

// ------------
// CREATE
// ------------

const UserDefaultAddressCreateMutation = gql`
  mutation UserDefaultAddressCreate(
    $userAddressInput: UserAddressCreateInput!
    $token: String!
  ) {
    userAddressCreate(userAddressInput: $userAddressInput, token: $token) {
      result {
        user {
          ...UserDefaultAddressFragment
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

  ${UserDefaultAddressFragment}
`;

export const useUserDefaultAddressCreate = ({
  optimistic = false,
}: {
  optimistic?: boolean;
} = {}) => {
  const [createAddress, mutationResult] = useMutation<
    UserDefaultAddressCreate,
    UserDefaultAddressCreateVariables
  >(UserDefaultAddressCreateMutation);
  const token = useUserToken();
  const { user_guid } = decodeToken(token);

  return {
    ...mutationResult,
    userDefaultAddressCreate: async (
      userAddressCreateInput: UserAddressCreateInput,
    ) => {
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
                      street1: "",
                      street2: "",
                      country: "",
                      streetnum: "",
                      ...userAddressCreateInput,
                      isDefault: true,
                      id: -1,
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

      return data && data.userAddressCreate;
    },
  };
};
const UserDefaultAddressUpdateMutation = gql`
  mutation UserDefaultAddressUpdate(
    $token: String!
    $userAddressInput: UserAddressUpdateInput!
  ) {
    userAddressUpdate(token: $token, userAddressInput: $userAddressInput) {
      result {
        user {
          ...UserDefaultAddressFragment
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

  ${UserDefaultAddressFragment}
`;

// ------------
// UPDATE
// ------------

export const useUserDefaultAddressUpdate = () => {
  const token = useUserToken();
  const [userDefaultAddressUpdate, mutationResult] = useMutation<
    UserDefaultAddressUpdate,
    UserDefaultAddressUpdateVariables
  >(UserDefaultAddressUpdateMutation);

  return {
    ...mutationResult,
    userDefaultAddressUpdate: async (
      userAddressInput: UserAddressUpdateInput,
    ) => {
      const { data } = await userDefaultAddressUpdate({
        variables: {
          token,
          userAddressInput,
        },
      });

      return data && data.userAddressUpdate;
    },
  };
};
