import React from "react";
import { IUserContextProviderProps, UserContextProvider } from "./UserContext";

export const UserProvider = (props: IUserContextProviderProps) => (
  <UserContextProvider {...props} />
);
