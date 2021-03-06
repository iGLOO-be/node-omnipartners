import React from "react";
import { GraphQLProvider } from "./src/lib/GraphQLProvider";
import { Menu } from "./src/layout/Menu";
import { UserProvider } from "@igloo-be-omnipartners/hooks";

export const wrapRootElement = ({ element }) => {
  return (
    <GraphQLProvider>
      <UserProvider>
        <div style={{ maxWidth: 1080, margin: "48px auto" }}>
          <Menu />
          {element}
        </div>
      </UserProvider>
    </GraphQLProvider>
  );
};
