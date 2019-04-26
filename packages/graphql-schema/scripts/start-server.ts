import { ApolloServer } from "apollo-server";
import createOmnipartners, { IOmnipartnersConfig } from "omnipartners";
import { Context, createSchema } from "../src";

let config: IOmnipartnersConfig | null = null;
try {
  config = require("../dev-config.js");
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") {
    throw err;
  }
}

const createServer = async () => {
  if (!config) {
    console.error('Unable to find omnipartners config. Please create a file `dev-config.js`.')
    process.exit(0)
    return
  }

  const context = new Context({
    omnipartners: createOmnipartners(config),
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