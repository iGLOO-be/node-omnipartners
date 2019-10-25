import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  UseUserLogin,
  UseUserLoginVariables,
} from "./__generated__/UseUserLogin";
import { useUserContext } from "./UserContext";

const UseUserLoginQuery = gql`
  query UseUserLogin($identifier: String!, $password: String!) {
    userLogin(identifier: $identifier, password: $password) {
      result {
        token
        owner {
          guid
        }
      }
      error {
        message
      }
    }
  }
`;

export const useUserLogin = () => {
  const { updateState } = useUserContext();
  const { refetch } = useQuery<UseUserLogin, UseUserLoginVariables>(
    UseUserLoginQuery,
    {
      skip: true,
    },
  );

  return {
    doLogin: async ({
      password,
      identifier,
    }: {
      password: string;
      identifier: string;
    }) => {
      const { data } = await refetch({ identifier, password });

      if (data && data.userLogin) {
        if (data.userLogin.result && data.userLogin.result.token) {
          updateState({ userToken: data.userLogin.result.token });
          return data.userLogin.result.token;
        }
        return data.userLogin.error;
      }

      return;
    },
  };
};
