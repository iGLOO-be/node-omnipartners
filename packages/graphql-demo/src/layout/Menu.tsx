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
      <Link to="/update">Update profile</Link>
    </div>
  </div>
);
