import { useUserContext } from "./tokenContext";

export const useUserLogout = () => {
  const { setToken } = useUserContext();

  return async () => {
    setToken(undefined);
  };
};
