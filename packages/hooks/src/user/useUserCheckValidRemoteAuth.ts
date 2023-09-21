import { useQuery, ApolloError } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
import { User_user_error } from "./__generated__/User";
import {
  UserCheck,
  UserCheck_result_error,
  UserCheckVariables,
} from "./__generated__/UserCheck";
import { useUserContext } from "./tokenContext";

const E_NOT_LOGGED = "E_NOT_LOGGED";

const UserCheckQuery = gql`
  query UserCheck($token: String!) {
    result: user(token: $token) {
      result {
        id
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

interface IQuery {
  result: {
    error: UserCheck_result_error | null;
  } | null;
}

interface IQueryVariable {
  token: string;
}

interface IUseUserCheckValidRemoteAuthProps<V> {
  query?: any;
  variables?: Omit<V, "token">;
  onNotLogged?: () => void;
  onError?: (err: User_user_error | ApolloError) => void;
}

export const useUserCheckValidRemoteAuth = <
  Q extends IQuery = UserCheck,
  V extends IQueryVariable = UserCheckVariables
>({
  query = UserCheckQuery,
  variables,
  onNotLogged = () => {},
  onError = console.error,
}: IUseUserCheckValidRemoteAuthProps<V> = {}) => {
  const { ready: contextReady, token } = useUserContext();
  const { data, error: apolloError, loading } = useQuery<Q, V>(query, {
    skip: !token,
    variables: ({
      token,
      ...variables,
    } as any) as V,
  });
  const error = (data && data.result && data.result.error) || apolloError;
  const isApolloError = error && (error as ApolloError).graphQLErrors;
  const isNotLoggedError =
    error && !(error instanceof ApolloError)
      ? error.code === E_NOT_LOGGED
      : false;
  const isOtherError =
    error && !(error instanceof ApolloError)
      ? error.code !== E_NOT_LOGGED
      : isApolloError;
  const ready =
    !loading &&
    (typeof data !== "undefined" || typeof apolloError !== "undefined");

  useEffect(() => {
    if (contextReady && !token) {
      onNotLogged();
    } else if (ready) {
      if (isNotLoggedError) {
        onNotLogged();
      } else if (isOtherError && error) {
        onError(error);
      }
    }
  }, [
    onNotLogged,
    onError,
    ready,
    contextReady,
    isNotLoggedError,
    isOtherError,
    error,
    token,
  ]);

  return {
    ready: !loading,
    error,
    isNotLoggedError,
    isOtherError,
  };
};
