import { useUserToken } from "./useUser";

export const useUserIsLogged = () => !!useUserToken();
