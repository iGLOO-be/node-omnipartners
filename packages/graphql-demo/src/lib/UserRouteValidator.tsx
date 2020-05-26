import { useUserIsLogged } from "@igloo-be-omnipartners/hooks";
import { navigate } from "gatsby";
import { useEffect, ReactNode } from "react";

export const UserRouteValidator = (props: { children: ReactNode }) => {
  const isLogged = useUserIsLogged();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  return isLogged ? props.children : null;
};
