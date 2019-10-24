import React, { createContext, useContext, useEffect, useState } from "react";
import { tokenStorage } from "../lib/tokenStorage";
import { useUserUpdateToken } from "./useUserUpdateToken";

export interface IUserProviderOptions {
  env?: string;
  refreshTokenAfter?: null | number; // in days
}

const userTokenContext = createContext<{
  ready: boolean;
  token: string;
  setToken: (v: string | undefined) => void;
}>({
  ready: false,
  token: "",
  setToken: () => "",
});

const UserTokenUpdate = ({
  children,
  refreshTokenAfter,
}: {
  children: JSX.Element;
  refreshTokenAfter?: null | number;
}) => {
  useUserUpdateToken(refreshTokenAfter);
  return children;
};

const UserTokenProvider = ({
  children,
  env = "default",
  refreshTokenAfter,
}: {
  children: JSX.Element;
} & IUserProviderOptions) => {
  const [token, setToken] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    tokenStorage.get(env).then(v => {
      setToken(v);
      setReady(true);
    });
  }, [env]);

  return (
    <userTokenContext.Provider
      value={{
        ready,
        token,
        setToken: (value: string | undefined) => {
          setToken(value);
          if (!value) {
            tokenStorage.remove(env);
          } else {
            tokenStorage.set(env, value);
          }
        },
      }}
    >
      <UserTokenUpdate refreshTokenAfter={refreshTokenAfter}>
        {children}
      </UserTokenUpdate>
    </userTokenContext.Provider>
  );
};

export const UserProvider = ({
  children,
  ...props
}: {
  children: JSX.Element;
} & IUserProviderOptions) => {
  return <UserTokenProvider {...props}>{children}</UserTokenProvider>;
};

export const useUserContext = () => {
  return useContext(userTokenContext);
};
