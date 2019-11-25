import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  UserUpdateRecoveredPassword,
  UserUpdateRecoveredPasswordVariables,
} from "./__generated__/UserUpdateRecoveredPassword";

const UserUpdateRecoveredPasswordMutation = gql`
  mutation UserUpdateRecoveredPassword($token: String!, $password: String!) {
    userUpdateRecoveredPassword(token: $token, password: $password) {
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
`;

export const useUserUpdateRecoveredPassword = () => {
  const [userUpdateRecoveredPassword, mutationResult] = useMutation<
    UserUpdateRecoveredPassword,
    UserUpdateRecoveredPasswordVariables
  >(UserUpdateRecoveredPasswordMutation);

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userUpdateRecoveredPassword),
    userUpdateRecoveredPassword: async ({
      token,
      password,
    }: {
      token: string;
      password: string;
    }) => {
      const res = await userUpdateRecoveredPassword({
        variables: {
          token,
          password,
        },
      });

      return {
        ...res,
        error: res.errors || (res.data && res.data.userUpdateRecoveredPassword),
      };
    },
  };
};
