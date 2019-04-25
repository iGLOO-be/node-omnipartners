import { ApolloServer } from "apollo-server";
import createOmnipartners from "omnipartners";
import { Context, createSchema } from "../src";

const createServer = async () => {
  const context = new Context({
    omnipartners: createOmnipartners()
  });
  const server = new ApolloServer({ schema: await createSchema(), context });
  return server;
};

createServer()
  .then(server => server.listen(4001))
  .then(({ url }) => {
    // tslint:disable-next-line:no-console
    console.log(`🚀  Server ready at ${url}`);
  });
