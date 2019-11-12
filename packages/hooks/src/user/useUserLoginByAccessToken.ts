import gql from "graphql-tag";
import {
  UserLoginByAccessToken,
  UserLoginByAccessTokenVariables,
} from "./__generated__/UserLoginByAccessToken";
import { useUserContext } from "./tokenContext";
import { useFetchUser } from "./useUser";
import { useBetterLazyQuery } from "./useUserLogin";

const UserLoginByAccessTokenQuery = gql`
  query UserLoginByAccessToken($userContextData: JSON, $access_token: String!) {
    userLoginByAccessToken(
      userContextData: $userContextData
      access_token: $access_token
    ) {
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

export const useUserLoginByAccessToken = (
  { updateToken } = { updateToken: true },
) => {
  const [loginByAccessToken, res] = useBetterLazyQuery<
    UserLoginByAccessToken,
    UserLoginByAccessTokenVariables
  >(UserLoginByAccessTokenQuery);
  const fetchUser = useFetchUser();
  const { setToken } = useUserContext();

  return {
    ...res,
    error: res.error || (res.data && res.data.userLoginByAccessToken.error),
    data: res.data && res.data.userLoginByAccessToken,
    loginByAccessToken: async ({
      access_token,
      userContextData,
    }: {
      access_token: string;
      userContextData?: any;
    }) => {
      const { data } = await loginByAccessToken({
        variables: {
          access_token,
          userContextData,
        },
      });

      if (
        updateToken &&
        data &&
        data.userLoginByAccessToken &&
        data.userLoginByAccessToken.result &&
        data.userLoginByAccessToken.result.token
      ) {
        setToken(data.userLoginByAccessToken.result.token);
        await fetchUser({
          token: data.userLoginByAccessToken.result.token,
        });
      }

      return (
        (data && data.userLoginByAccessToken) || { result: null, error: null }
      );
    },
  };
};
