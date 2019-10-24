import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserLogin, UserLoginVariables } from "./__generated__/UserLogin";
import { useUserContext } from "./UserProvider";
import { useFetchUser } from "./useUser";

const UserLoginQuery = gql`
  query UserLogin($identifier: String!, $password: String!) {
    userLogin(identifier: $identifier, password: $password) {
      result {
        token
        owner {
          guid
        }
      }
      error {
        message
        code
      }
    }
  }
`;

export const useLogin = ({ updateToken } = { updateToken: true }) => {
  const { refetch } = useQuery<UserLogin, UserLoginVariables>(UserLoginQuery, {
    skip: true,
  });
  const fetchUser = useFetchUser();
  const { setToken } = useUserContext();

  return async ({
    identifier,
    password,
  }: {
    identifier: string;
    password: string;
  }) => {
    const { data } = await refetch({
      identifier,
      password,
    });

    if (
      updateToken &&
      data.userLogin &&
      data.userLogin.result &&
      data.userLogin.result.token
    ) {
      setToken(data.userLogin.result.token);
      await fetchUser({
        token: data.userLogin.result.token,
      });
    }

    return data && data.userLogin;
  };
};
