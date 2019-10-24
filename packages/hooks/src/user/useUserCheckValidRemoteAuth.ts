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
  const { data, loading } = useUser();
  const error = data && data.error;
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
  }, [
    ready,
    isNotLoggedError,
    isOtherError,
    error && error.code,
    error && error.message,
  ]);

  return {
    ready: !loading,
    error,
    isNotLoggedError,
    isOtherError,
  };
};
