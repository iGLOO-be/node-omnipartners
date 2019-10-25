import { useUserToken } from "../user/tokenContext";

export const useUserIsLogged = () => !!useUserToken();
