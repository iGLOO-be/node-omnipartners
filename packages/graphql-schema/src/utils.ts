import { GraphQLError } from "graphql";
import unset from "lodash/unset";

export const formatError = (err: GraphQLError) => {
  unset(err, "extensions.exception.data");
  unset(err, "extensions.exception.request");
  return err;
};
