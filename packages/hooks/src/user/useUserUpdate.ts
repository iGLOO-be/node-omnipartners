import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserUpdateInput } from "../../__generated__/globalTypes";
import { decodeToken } from "../lib/tokenStorage";
import { UserUpdate, UserUpdateVariables } from "./__generated__/UserUpdate";
import { useUserToken } from "./useUser";

const UserUpdateMutation = gql`
  mutation UserUpdate($token: String!, $userInput: UserUpdateInput!) {
    userUpdate(token: $token, userInput: $userInput) {
      result {
        owner {
          guid
          firstName
          lastName
          title
          email
          mobilePhone
          country
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
`;

export const useUserUpdate = ({
  optimistic = false,
}: {
  optimistic?: boolean;
} = {}) => {
  const token = useUserToken();
  const [userUpdate, mutationResult] = useMutation<
    UserUpdate,
    UserUpdateVariables
  >(UserUpdateMutation);
  const { user_guid } = decodeToken(token);

  return {
    ...mutationResult,
    userUpdate: async (userInput: UserUpdateInput) => {
      if (token) {
        const { data } = await userUpdate({
          variables: {
            token,
            userInput,
          },
          ...(optimistic && {
            optimisticResponse: {
              userUpdate: {
                __typename: "UserUpdateResult",
                error: null,
                result: {
                  __typename: "User",
                  owner: {
                    __typename: "UserOwner",
                    guid: user_guid,
                    email: "",
                    firstName: "",
                    lastName: "",
                    mobilePhone: "",
                    title: "",
                    country: "",
                    ...userInput,
                  },
                },
              },
            },
          }),
        });

        return data && data.userUpdate;
      }
      return;
    },
  };
};
