import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useState } from "react";
import {
  UserRecoverPassword,
  UserRecoverPasswordVariables,
} from "./__generated__/UserRecoverPassword";

export * from "./__generated__/UserRecoverPassword";

const UserRecoverPasswordMutation = gql`
  mutation UserRecoverPassword($email: String!) {
    userRecoverPassword(email: $email) {
      message
      code
    }
  }
`;

export const useUserRecoverPassword = () => {
  const [loading, setLoading] = useState();

  const [recoverPassword, mutationResult] = useMutation<
    UserRecoverPassword,
    UserRecoverPasswordVariables
  >(UserRecoverPasswordMutation);

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userRecoverPassword),
    userRecoverPassword: async (email: string) => {
      try {
        setLoading(true);
        const { data } = await recoverPassword({
          variables: {
            email,
          },
        });

        setLoading(false);
        return {
          error: data && data.userRecoverPassword
        }
      } catch (err) {
        setLoading(false);
        throw err;
      }
    },
    loading,
  };
};
