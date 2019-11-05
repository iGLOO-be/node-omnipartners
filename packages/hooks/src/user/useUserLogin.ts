import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserLogin, UserLoginVariables } from "./__generated__/UserLogin";
import { useUserContext } from "./tokenContext";
import { useFetchUser } from "./useUser";

export * from "./__generated__/UserLogin";

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

export const useUserLogin = ({ updateToken } = { updateToken: true }) => {
  const { refetch, ...rest } = useQuery<UserLogin, UserLoginVariables>(
    UserLoginQuery,
    {
      skip: true,
    },
  );
  const fetchUser = useFetchUser();
  const { setToken } = useUserContext();

  return {
    ...rest,
    userLogin: async ({
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
    },
  };
};

export const useLogin = ({ updateToken } = { updateToken: true }) => {
  console.warn("`useLogin` is deprecated. Please use `useUserLogin`");
  return useUserLogin({ updateToken }).userLogin;
};
