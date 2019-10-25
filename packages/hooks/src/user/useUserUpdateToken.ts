import { useQuery } from "@apollo/react-hooks";
import { differenceInDays, getTime } from "date-fns";
import gql from "graphql-tag";
import { useEffect } from "react";
import { decodeToken } from "../lib/tokenStorage";
import { UserToken, UserTokenVariables } from "./__generated__/UserToken";
import { useUserContext } from "./tokenContext";
import { IUserProviderOptions } from "./UserProvider";

export * from "./__generated__/UserToken";

const UserTokenQuery = gql`
  query UserToken($token: String!) {
    user(token: $token) {
      result {
        token
      }
    }
  }
`;

export const useUserUpdateToken = (
  refreshTokenAfter: IUserProviderOptions["refreshTokenAfter"],
) => {
  const { token, setToken } = useUserContext();
  const tokenNearExpired = isUserTokenNearExpired(token, refreshTokenAfter);
  const { data } = useQuery<UserToken, UserTokenVariables>(UserTokenQuery, {
    variables: {
      token,
    },
    skip: !token || !tokenNearExpired,
  });
  const newToken =
    data && data.user && data.user.result && data.user.result.token;

  useEffect(() => {
    if (newToken) {
      setToken(newToken);
    }
  }, [newToken, setToken]);
};

const isUserTokenNearExpired = (
  token: string,
  refreshTokenAfter: IUserProviderOptions["refreshTokenAfter"],
) => {
  if (!refreshTokenAfter) {
    return false;
  }

  if (token) {
    const { exp } = decodeToken(token);
    const now = getTime(new Date());
    const expiration = exp * 1000;
    return differenceInDays(expiration, now) < refreshTokenAfter;
  }

  return true;
};
