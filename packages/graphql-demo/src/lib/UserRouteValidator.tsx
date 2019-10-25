import { useUserIsLogged } from "@igloo-be-omnipartners/hooks";
import { navigate } from "gatsby";

export const UserRouteValidator = props => {
  const isLogged = useUserIsLogged();

  if (!isLogged) {
    navigate("/");
    return null;
  }

  return props.children;
};
