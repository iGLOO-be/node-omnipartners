import { useEffect } from "react";
import { User_user_error } from "./__generated__/User";
import { useUser } from "./useUser";

const E_NOT_LOGGED = "E_NOT_LOGGED";

export const useUserCheckValidRemoteAuth = ({
  onNotLogged = () => {},
  onError = console.error,
}: {
  onNotLogged?: () => void;
  onError?: (err: User_user_error) => void;
} = {}) => {
  const { error, loading } = useUser();
  const isNotLoggedError = error && error.code === E_NOT_LOGGED;
  const isOtherError = error && error.code !== E_NOT_LOGGED;
  const ready = !loading;

  useEffect(() => {
    if (ready) {
      if (isNotLoggedError) {
        onNotLogged();
      } else if (isOtherError && error) {
        onError(error);
      }
    }
  }, [ready, isNotLoggedError, isOtherError, error, onNotLogged, onError]);

  return {
    ready: !loading,
    error,
    isNotLoggedError,
    isOtherError,
  };
};
