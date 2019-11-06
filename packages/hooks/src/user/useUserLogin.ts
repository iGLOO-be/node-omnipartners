import {
  LazyQueryHookOptions,
  QueryLazyOptions,
  useLazyQuery,
} from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import { useCallback, useEffect, useRef } from "react";
import { OperationVariables, QueryResult } from "react-apollo";
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
  const [login, res] = useBetterLazyQuery<UserLogin, UserLoginVariables>(
    UserLoginQuery,
  );
  const fetchUser = useFetchUser();
  const { setToken } = useUserContext();

  return {
    ...res,
    error: res.error || (res.data && res.data.userLogin.error),
    data: res.data && res.data.userLogin,
    userLogin: async ({
      identifier,
      password,
    }: {
      identifier: string;
      password: string;
    }) => {
      const { data } = await login({
        variables: {
          identifier,
          password,
        },
      });

      if (
        updateToken &&
        data &&
        data.userLogin &&
        data.userLogin.result &&
        data.userLogin.result.token
      ) {
        setToken(data.userLogin.result.token);
        await fetchUser({
          token: data.userLogin.result.token,
        });
      }

      return (data && data.userLogin) || { result: null, error: null };
    },
  };
};

export const useLogin = ({ updateToken } = { updateToken: true }) => {
  console.warn("`useLogin` is deprecated. Please use `useUserLogin`");
  return useUserLogin({ updateToken }).userLogin;
};

// Copied from https://github.com/apollographql/react-apollo/issues/3499#issuecomment-537748212
// PLEASE NOT USE THIS ANYWHERE ELSE

// The goal here is to get both the result directly from the hook AND
// by the return of the `login` method.

type LazyQueryTuple<TData, TVariables> = [
  (
    options?: QueryLazyOptions<TVariables>,
  ) => Promise<QueryResult<TData, TVariables>>,
  QueryResult<TData, TVariables>,
];

function useBetterLazyQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: LazyQueryHookOptions<TData, TVariables>,
): LazyQueryTuple<TData, TVariables> {
  const [execute, result] = useLazyQuery<TData, TVariables>(query, options);

  const resolveRef = useRef<
    (
      value?:
        | QueryResult<TData, TVariables>
        | PromiseLike<QueryResult<TData, TVariables>>,
    ) => void
  >();

  useEffect(() => {
    if (result.called && !result.loading && resolveRef.current) {
      resolveRef.current(result);
      resolveRef.current = undefined;
    }
  }, [result.loading, result.called, result.variables]);

  const queryLazily = useCallback(
    ({ variables }: QueryLazyOptions<TVariables> = {}) => {
      execute({ variables });
      return new Promise<QueryResult<TData, TVariables>>(resolve => {
        resolveRef.current = resolve;
      });
    },
    [execute],
  );

  return [queryLazily, result];
}
