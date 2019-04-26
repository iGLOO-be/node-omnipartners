import React from "react";
import { GraphQLProvider } from "./src/lib/GraphQLProvider";
import { Menu } from "./src/layout/Menu"

export const wrapRootElement = ({ element }) => {
  return (
    <GraphQLProvider>
      <Menu />
      {element}
    </GraphQLProvider>
  );
};
