/* eslint-env mocha */

import {
  expect,
  REGEX_HASH,
  withArguments,
  withMock,
  describeMethod,
  describeApi,
} from "../../../../test/test.utils";

import { BaseIdentityTest, baseConfig } from "./index.spec";

describeApi("identity", () => {
  describeMethod(
    class authenticate extends BaseIdentityTest {
      name = "authenticate";
      httpPath = "/service/auth/credentials";
      httpMethod = "get";
      httpDefaultData = {
        hash: REGEX_HASH,
        key: baseConfig.key,
      };

      @withMock({ reply: { statusCode: 2 } })
      @withArguments({}, { shouldThrow: true })
      "without body"({ err }) {
        expect(err).to.be.an("error");
      }

      @withMock({
        shouldThrow: true,
        query: {
          identifier: "loic%40igloo.be",
          password: "12345",
        },
        reply: {
          statusCode: 5,
        },
      })
      @withArguments(
        {
          identifier: "loic@igloo.be",
          password: "12345",
        },
        {
          shouldThrow: true,
        },
      )
      "with invalid credentials"({ err }) {
        expect(err.code).to.be.equal("OP/OPStatusError/5");
      }

      @withMock({
        query: {
          identifier: "loic%40igloo.be",
          password: "igloo",
        },
        reply: require("./fixtures/valid.json"),
      })
      @withArguments({
        identifier: "loic@igloo.be",
        password: "igloo",
      })
      "with valid credentials"({ err, response }) {
        expect(err).to.equal(null);
        expect(response.owner).to.be.an("object");
      }
    },
  );
});
