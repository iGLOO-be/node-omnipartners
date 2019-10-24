import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserChildUpdateInput } from "../../__generated__/globalTypes";
import {
  UserChildUpdate,
  UserChildUpdateVariables,
} from "./__generated__/UserChildUpdate";
import { UserChildrenFragment } from "./Fragments";
import { useUserToken } from "./useUser";

const UserChildUpdateMutation = gql`
  mutation UserChildUpdate(
    $token: String!
    $userChildUpdateInput: UserChildUpdateInput!
  ) {
    userChildUpdate(
      userChildUpdateInput: $userChildUpdateInput
      token: $token
    ) {
      result {
        user {
          ...UserChildrenFragment
        }
        child {
          guid
          birthday
          firstName
          gender
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

export const useUserChildUpdate = () => {
  const token = useUserToken();
  const [updateChild, mutationResult] = useMutation<
    UserChildUpdate,
    UserChildUpdateVariables
  >(UserChildUpdateMutation);

  return {
    ...mutationResult,
    userChildUpdate: async (
      userChildUpdateInput: Omit<UserChildUpdateInput, "firstName"> & {
        firstName?: string;
      },
    ) => {
      const data = (await updateChild({
        variables: {
          userChildUpdateInput: {
            ...userChildUpdateInput,
            firstName: userChildUpdateInput.firstName || "--",
          },
          token,
        },
      })).data;

      return data && data.userChildUpdate;
    },
  };
};
