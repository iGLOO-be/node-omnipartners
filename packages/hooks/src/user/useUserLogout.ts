import { useUserContext } from "./UserProvider";

export const useUserLogout = () => {
  const { setToken } = useUserContext();

  return async () => {
    setToken(undefined);
  };
};
