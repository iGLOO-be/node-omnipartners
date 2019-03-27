/* eslint-env mocha */

import {
  describeApi,
  describeMethod,
  REGEX_HASH,
  withArguments,
  withMock,
} from "../../../../test/test.utils";

import { baseConfig, BaseIdentityTest } from "./index.spec";

class Authenticate extends BaseIdentityTest {
  public name = "authenticate";
  public httpPath = "/service/auth/credentials";
  public httpMethod = "get";
  public httpDefaultData = {
    hash: REGEX_HASH,
    key: baseConfig.key,
  };

  @withMock({ reply: { statusCode: 2 } })
  @withArguments({}, { shouldThrow: true })
  public "without body"({ err }: { err: any }) {
    expect(err).toBeInstanceOf(Error);
  }

  @withMock({
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
  public "with invalid credentials"({ err }: { err: any }) {
    expect(err.code).toEqual("OP/OPStatusError/5");
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
  public "with valid credentials"({
    err,
    response,
  }: {
    err: any;
    response: any;
  }) {
    expect(err).toEqual(null);
    expect(response.owner).toBeTruthy();
  }
}

describeApi("identity", () => {
  describeMethod(Authenticate);
});
