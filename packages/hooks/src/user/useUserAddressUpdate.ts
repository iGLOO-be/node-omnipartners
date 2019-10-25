import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserAddressUpdateInput } from "../../__generated__/globalTypes";
import {
  UserAddressUpdate,
  UserAddressUpdateVariables,
} from "./__generated__/UserAddressUpdate";
import { UserAddressFragment } from "./Fragments";
import { useUserToken } from "./useUser";

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

export const useUserAddressUpdate = () => {
  const token = useUserToken();
  const [userAddressUpdate, mutationResult] = useMutation<
    UserAddressUpdate,
    UserAddressUpdateVariables
  >(UserAddressUpdateMutation);

  return {
    ...mutationResult,
    userAddressUpdate: async (userAddressInput: UserAddressUpdateInput) => {
      const { data } = await userAddressUpdate({
        variables: {
          token,
          userAddressInput,
        },
      });

      return data && data.userAddressUpdate;
    },
  };
};
