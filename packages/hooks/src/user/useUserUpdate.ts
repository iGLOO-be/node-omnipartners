import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { UserUpdateInput } from "../../__generated__/globalTypes";
import { decodeToken } from "../lib/tokenStorage";
import { UserUpdate, UserUpdateVariables } from "./__generated__/UserUpdate";
import { useUserToken } from "./tokenContext";

export * from "./__generated__/UserUpdate";

const UserUpdateMutation = gql`
  mutation UserUpdate($token: String!, $userInput: UserUpdateInput!) {
    userUpdate(token: $token, userInput: $userInput) {
      result {
        id
        owner {
          id
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
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userUpdate.error),
    userUpdate: async (
      userInput: UserUpdateInput,
      { token: givenToken }: { token?: string },
    ) => {
      const { data } = await userUpdate({
        variables: {
          token: givenToken || token,
          userInput,
        },
        ...(optimistic && {
          optimisticResponse: {
            userUpdate: {
              __typename: "UserUpdateResult",
              error: null,
              result: {
                __typename: "User",
                id: user_guid,
                owner: {
                  id: user_guid,
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
    },
  };
};
