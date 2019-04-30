import React from "react";
import { GraphQLProvider } from "./src/lib/GraphQLProvider";
import { Menu } from "./src/layout/Menu";

export const wrapRootElement = ({ element }) => {
  return (
    <GraphQLProvider>
      <div style={{ maxWidth: 1080, margin: "48px auto" }}>
        <Menu />
        {element}
      </div>
    </GraphQLProvider>
  );
};
