import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useState } from "react";
import {
  UserRecoverPassword,
  UserRecoverPasswordVariables,
} from "./__generated__/UserRecoverPassword";

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
    userRecoverPassword: async (email: string) => {
      try {
        setLoading(true);
        await recoverPassword({
          variables: {
            email,
          },
        });
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    },
    loading,
  };
};
