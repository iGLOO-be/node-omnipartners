import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { UserCreateInput } from "../../__generated__/globalTypes";
import { UserCreate, UserCreateVariables } from "./__generated__/UserCreate";
import { useUserContext } from "./tokenContext";
import { useFetchUser } from "./useUser";

export * from "./__generated__/UserCreate";

const UserCreateMutation = gql`
  mutation UserCreate($userInput: UserCreateInput!) {
    userCreate(userInput: $userInput) {
      result {
        token
        owner {
          guid
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
`;

export const useUserCreate = ({ autoLogin = true } = {}) => {
  const [userCreate, mutationResult] = useMutation<
    UserCreate,
    UserCreateVariables
  >(UserCreateMutation);
  const { setToken } = useUserContext();
  const fetchUser = useFetchUser();

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userCreate.error),
    userCreate: async (userInput: UserCreateInput) => {
      const { data } = await userCreate({
        variables: {
          userInput,
        },
      });

      if (
        autoLogin &&
        data &&
        data.userCreate &&
        data.userCreate.result &&
        data.userCreate.result.token
      ) {
        setToken(data.userCreate.result.token);
        await fetchUser({
          token: data.userCreate.result.token,
        });
      }

      return data && data.userCreate;
    },
  };
};
