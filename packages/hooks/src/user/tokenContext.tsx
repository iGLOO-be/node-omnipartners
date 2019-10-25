import { createContext, useContext } from "react";

export const userTokenContext = createContext<{
  ready: boolean;
  token: string;
  setToken: (v: string | undefined) => void;
}>({
  ready: false,
  token: "",
  setToken: () => "",
});

export const useUserContext = () => {
  return useContext(userTokenContext);
};

export const useUserToken = () => {
  return useUserContext().token;
};
