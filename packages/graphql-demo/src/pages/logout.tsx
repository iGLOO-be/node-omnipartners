import { useUserIsLogged, useUserLogout } from "@igloo-be-omnipartners/hooks";
import { navigate } from "gatsby";
import { useEffect } from "react";

const Logout = () => {
  const isLogged = useUserIsLogged();
  const logout = useUserLogout();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    } else {
      logout();
    }
  }, [isLogged]);

  return null;
};

export default Logout;
