import { Link } from "gatsby";
import React from "react";

export const Menu = () => (
  <div>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div>
      <Link to="/metadata">Metadata</Link>
    </div>
    <div>
      <Link to="/user">User</Link>
    </div>
    <div>
      <Link to="/pet">Pet</Link>
    </div>
    <div>
      <Link to="/address">Adress</Link>
    </div>
  </div>
);
