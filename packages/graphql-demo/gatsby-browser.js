import React from "react";
import { GraphQLProvider } from "./src/lib/GraphQLProvider";

export const wrapRootElement = ({ element }) => {
  return (
    <GraphQLProvider>{element}</GraphQLProvider>
  );
};
