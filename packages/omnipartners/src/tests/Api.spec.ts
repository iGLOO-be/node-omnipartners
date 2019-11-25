/* eslint-env mocha */

import {
  describeApi,
  describeMethod,
  REGEX_HASH,
  withArguments,
  withMock,
} from "./test.utils";

import Api from "../lib/Api";

const baseConfig = {
  host: "http://httpbin.org",
  key: "aaa",
  secret: "bbb",
};

class TestApi extends Api {
  public defaultTimeout = 10;

  public basicGet(data: any) {
    return this.get("/get", data);
  }
}

class BaseIdentityTest {
  public Api = TestApi;
  public apiConfig = baseConfig;
}

class BasicGet extends BaseIdentityTest {
  public name = "basicGet";
  public httpPath = "/get";
  public httpMethod = "get";
  public httpDefaultData = {
    hash: REGEX_HASH,
    key: baseConfig.key,
  };

  @withMock({ reply: `{ invalid json! }` })
  @withArguments({}, { shouldThrow: true })
  public "handle invalid json"({ err }: { err: any }) {
    expect(err).toMatchObject({
      code: "OP/InvalidJSONReponseError",
      data: {
        text: "{ invalid json! }",
      },
      isOmnipartnersError: true,
      message: "OP/Invalid JSON Reponse Error",
      statusCode: 502,
      statusText: "Bad Gateway",
    });
  }

  @withMock({ reply: { statusCode: 2 } })
  @withArguments({}, { shouldThrow: true })
  public "handle invalid opStatus"({ err }: { err: any }) {
    expect(err).toMatchObject({
      code: "OP/OPStatusError/2",
      data: {
        message:
          "Invalid request in which required header or parameters are either missing or invalid.",
        statusCode: 2,
      },
      isOmnipartnersError: true,
      message:
        "OP/Invalid request in which required header or parameters are either missing or invalid.",
      statusCode: 502,
      statusText: "Bad Gateway",
    });
  }

  @withMock({ reply: { statusCode: 99 } })
  @withArguments({}, { shouldThrow: true })
  public "handle unkown opStatus"({ err }: { err: any }) {
    expect(err).toMatchObject({
      code: "OP/UnknownOPStatusError/99",
      data: {
        statusCode: 99,
      },
      isOmnipartnersError: true,
      message: "OP/Invalid Response Error - Unkown OP Status/99",
      statusCode: 502,
      statusText: "Bad Gateway",
    });
  }

  @withMock({ reply: {}, delay: { head: 99999 } })
  @withArguments({}, { shouldThrow: true })
  public "handle socket timeout"({ err }: { err: any }) {
    expect(err).toMatchObject({
      code: "OP/RequestTimeoutError",
      data: {},
      isOmnipartnersError: true,
      message: "OP/Request Timeout Error",
      statusCode: 503,
      statusText: "Gateway Time-out",
    });
  }

  @withMock({ reply: { statusCode: 0, data: { foo: "bar" } } })
  @withArguments({})
  public "handle valid opStatus"({ err }: { err: any }) {
    expect(err).toEqual(null);
  }
}

describeApi("Api", () => {
  describeMethod(BasicGet);
});
