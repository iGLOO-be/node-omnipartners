/* eslint-env mocha */

import Identity from "..";
import {
  describeApi,
  describeMethod,
  REGEX_HASH,
  withArguments,
  withMock,
} from "../../../../test/test.utils";

export const baseConfig = {
  host: "http://cis.staging.rcbe.omnipartners.be",
  key: "b59b129e7c4dbe53ede4874535b5c784667936ce",
  secret: "3788ac15ba321a8b9913b5130ef2f4aa0e822fd0",
};

export class BaseIdentityTest {
  public Api = Identity;
  public apiConfig = baseConfig;
}

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
