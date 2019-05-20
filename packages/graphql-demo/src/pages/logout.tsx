import { navigate } from "gatsby";
import { useLogout, useUser } from "../lib/user/useUser";

const Logout = () => {
  const { isLogged } = useUser();
  const { logout} = useLogout()

  if (!isLogged) {
    return navigate("/")
  }

  logout()

  return null;
}

export default Logout;
