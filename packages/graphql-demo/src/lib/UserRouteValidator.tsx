import { useUserIsLogged } from "@igloo-be-omnipartners/hooks";
import { navigate } from "gatsby";
import { useEffect } from "react";

export const UserRouteValidator = props => {
  const isLogged = useUserIsLogged();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  return isLogged ? props.children : null;
};
