import { ApolloServer } from "apollo-server";
import createOmnipartners, {
  createLogger,
  IOmnipartnersConfig,
} from "omnipartners";
import { buildFullSchema, Context, formatError } from "../src";

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

  const omnipartners = createOmnipartners(config);
  omnipartners.use(createLogger());

  const context = new Context({
    omnipartners,
    userTokenSecret: "some-secret-please-change-me!",
    userTokenSignOptions: {
      expiresIn: "10 days",
    },
  });
  const server = new ApolloServer({
    schema: await buildFullSchema(),
    context,
    formatError,
  });
  return server;
};

createServer()
  .then(server => server.listen(4001))
  .then(({ url }) => {
    // tslint:disable-next-line:no-console
    console.log(`🚀  Server ready at ${url}`);
  });
