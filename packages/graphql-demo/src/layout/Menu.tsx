import { useUserLogout } from "@igloo-be-omnipartners/hooks";
import { Link } from "gatsby";
import React from "react";

export const Menu = () => {
  const logout = useUserLogout();
  return (
    <ul>
      <li>
        <Link to="/">Login</Link>
      </li>
      <li>
        <Link to="/metadata">Metadata</Link>
      </li>
      <br />
      Login needed
      <hr />
      <li>
        <Link to="/pet">Pet</Link>
      </li>
      <li>
        <Link to="/user">User</Link>
      </li>
      <li>
        <Link to="/address">Address</Link>
      </li>
      <li>
        <Link to="/partner">Partner</Link>
      </li>
      <li>
        <button onClick={() => logout()}>Logout</button>
      </li>
    </ul>
  );
};
