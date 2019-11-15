import {
  LazyQueryHookOptions,
  QueryLazyOptions,
  useLazyQuery,
} from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import { useCallback, useEffect, useRef } from "react";
import { OperationVariables, QueryResult } from "react-apollo";
import {
  UserLogin,
  UserLogin_userLogin_result,
  UserLoginVariables,
} from "./__generated__/UserLogin";
import { useUserContext } from "./tokenContext";
import { useFetchUser } from "./useUser";

export * from "./__generated__/UserLogin";

const UserLoginQuery = gql`
  query UserLogin(
    $userContextData: JSON
    $identifier: String!
    $password: String!
  ) {
    userLogin(
      userContextData: $userContextData
      identifier: $identifier
      password: $password
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

export const useUserLogin = ({
  updateToken,
  beforeSetToken,
}: {
  updateToken?: boolean;
  beforeSetToken?: (userResult: UserLogin_userLogin_result) => Promise<void>;
} = {}) => {
  const [login, res] = useBetterLazyQuery<UserLogin, UserLoginVariables>(
    UserLoginQuery,
  );
  const fetchUser = useFetchUser();
  const { setToken } = useUserContext();

  updateToken = typeof updateToken === "undefined" ? true : updateToken;

  return {
    ...res,
    error: res.error || (res.data && res.data.userLogin.error),
    data: res.data && res.data.userLogin,
    userLogin: async ({
      identifier,
      password,
      userContextData,
    }: {
      identifier: string;
      password: string;
      userContextData?: any;
    }) => {
      const { data } = await login({
        variables: {
          identifier,
          password,
          userContextData,
        },
      });

      if (
        updateToken &&
        data &&
        data.userLogin &&
        data.userLogin.result &&
        data.userLogin.result.token
      ) {
        await fetchUser({
          token: data.userLogin.result.token,
        });
        if (beforeSetToken) {
          await beforeSetToken(data.userLogin.result);
        }
        setToken(data.userLogin.result.token);
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

export function useBetterLazyQuery<
  TData = any,
  TVariables = OperationVariables
>(
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
  }, [result.loading, result.called, result.variables]); // eslint-disable-line react-hooks/exhaustive-deps

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
