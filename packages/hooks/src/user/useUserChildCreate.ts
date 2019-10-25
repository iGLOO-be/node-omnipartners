import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserChildCreateInput } from "../../__generated__/globalTypes";
import { useUserToken } from "../user/tokenContext";
import {
  UserChildCreate,
  UserChildCreateVariables,
} from "./__generated__/UserChildCreate";
import { UserChildrenFragment } from "./Fragments";

const UserChildCreateMutation = gql`
  mutation UserChildCreate(
    $token: String!
    $userChildCreateInput: UserChildCreateInput!
  ) {
    userChildCreate(
      userChildCreateInput: $userChildCreateInput
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

export const useUserChildCreate = () => {
  const token = useUserToken();
  const [createChild, mutationResult] = useMutation<
    UserChildCreate,
    UserChildCreateVariables
  >(UserChildCreateMutation);

  return {
    ...mutationResult,
    userChildCreate: async (
      userChildCreateInput: Omit<UserChildCreateInput, "firstName"> & {
        firstName?: string;
      },
    ) => {
      const data = (await createChild({
        variables: {
          userChildCreateInput: {
            ...userChildCreateInput,
            firstName: userChildCreateInput.firstName || "--",
          },
          token,
        },
      })).data;

      return data && data.userChildCreate;
    },
  };
};
