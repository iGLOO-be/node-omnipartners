import { ApolloServer } from "apollo-server";
import createOmnipartners, { IOmnipartnersConfig } from "omnipartners";
import { buildFullSchema, Context } from "../src";

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
    console.error(
      "Unable to find omnipartners config. Please create a file `dev-config.js`.",
    );
    process.exit(0);
    return;
  }

  const context = new Context({
    omnipartners: createOmnipartners(config),
    userTokenSecret: "some-secret-please-change-me!",
    userTokenSignOptions: {
      expiresIn: "10 days"
    }
  });
  const server = new ApolloServer({ schema: await buildFullSchema(), context });
  return server;
};

createServer()
  .then(server => server.listen(4001))
  .then(({ url }) => {
    // tslint:disable-next-line:no-console
    console.log(`🚀  Server ready at ${url}`);
  });
