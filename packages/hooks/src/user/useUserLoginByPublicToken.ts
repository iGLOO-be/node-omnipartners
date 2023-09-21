import gql from "graphql-tag";
import {
  UserLoginByPublicToken,
  UserLoginByPublicTokenVariables,
} from "./__generated__/UserLoginByPublicToken";
import { useUserContext } from "./tokenContext";
import { useFetchUser } from "./useUser";
import { useBetterLazyQuery } from "./useUserLogin";

const UserLoginByPublicTokenQuery = gql`
  query UserLoginByPublicToken($userContextData: JSON, $token: String!) {
    userLoginByPublicToken(userContextData: $userContextData, token: $token) {
      result {
        id
        token
        owner {
          id
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

export const useUserLoginByPublicToken = (
  { updateToken } = { updateToken: true },
) => {
  const [loginByPublicToken, res] = useBetterLazyQuery<
    UserLoginByPublicToken,
    UserLoginByPublicTokenVariables
  >(UserLoginByPublicTokenQuery, {
    fetchPolicy: "no-cache",
  });
  const fetchUser = useFetchUser();
  const { setToken } = useUserContext();

  return {
    ...res,
    error: res.error || (res.data && res.data.userLoginByPublicToken.error),
    data: res.data && res.data.userLoginByPublicToken,
    loginByPublicToken: async ({
      token,
      userContextData,
    }: {
      token: string;
      userContextData?: any;
    }) => {
      const { data } = await loginByPublicToken({
        variables: {
          token,
          userContextData,
        },
      });

      if (
        updateToken &&
        data &&
        data.userLoginByPublicToken &&
        data.userLoginByPublicToken.result &&
        data.userLoginByPublicToken.result.token
      ) {
        setToken(data.userLoginByPublicToken.result.token);
        await fetchUser({
          token: data.userLoginByPublicToken.result.token,
        });
      }

      return (
        (data && data.userLoginByPublicToken) || { result: null, error: null }
      );
    },
  };
};
