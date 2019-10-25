import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserAddressCreateInput } from "../../__generated__/globalTypes";
import { decodeToken } from "../lib/tokenStorage";
import {
  UserAddressCreate,
  UserAddressCreateVariables,
} from "./__generated__/UserAddressCreate";
import { UserAddressFragment } from "./Fragments";
import { useUserToken } from "./useUser";

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
  const token = useUserToken();
  const { user_guid } = decodeToken(token);

  return {
    ...mutationResult,
    userAddressCreate: async (
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
