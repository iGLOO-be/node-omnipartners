import React, { useEffect, useState } from "react";
import { tokenStorage } from "../lib/tokenStorage";
import { IUserProviderOptions } from "./IUserProviderOptions";
import { userTokenContext } from "./tokenContext";
import { useUserUpdateToken } from "./useUserUpdateToken";

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
  userTokenStorage = tokenStorage,
}: {
  children: JSX.Element;
} & IUserProviderOptions) => {
  const [token, setToken] = useState<string | null | undefined>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    userTokenStorage.get(env).then(v => {
      setToken(v);
      setReady(true);
    });
  }, [env]);

  return (
    <userTokenContext.Provider
      value={{
        ready,
        token: token || "",
        setToken: (value: string | undefined) => {
          setToken(value);
          if (!value) {
            userTokenStorage.remove(env);
          } else {
            userTokenStorage.set(env, value);
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
