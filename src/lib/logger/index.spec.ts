/* eslint-env mocha */

import {
  describeApi,
  describeMethod,
  expect,
  REGEX_HASH,
} from "../../../test/test.utils";

import sinon from "sinon";

import Api from "../Api";
import createLogger from "./index";

const baseConfig = {
  host: "http://httpbin.org",
  key: "aaa",
  secret: "bbb",
};

class TestApi extends Api {
  public defaultTimeout = 10;

  public basicGet(data) {
    return this.get("/get", data);
  }
}

class LoggerTest {
  public Api = TestApi;
  public apiConfig = baseConfig;
}

const logger = createLogger();

describeApi("Api", () => {
  describe("Logger: info", () => {
    let spy;
    beforeEach(() => {
      spy = sinon.stub(logger.logger, "info");
    });
    afterEach(() => {
      logger.logger.info.restore();
    });
    describeMethod(
      class basicGet extends LoggerTest {
        public name = "basicGet";
        public httpPath = "/get";
        public httpMethod = "get";
        public httpDefaultData = {
          hash: REGEX_HASH,
          key: baseConfig.key,
        };
        public use = logger;

        @withMock({ reply: { statusCode: 0, hello: "world" } })
        @withArguments({})
        public "should works"() {
          return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
            expect(logger.logger.info.called).to.equal(true);
          });
        }
      },
    );
  });

  describe("Logger: error", () => {
    let spy;
    beforeEach(() => {
      spy = sinon.stub(logger.logger, "error");
    });

    afterEach(() => {
      logger.logger.error.restore();
    });

    describeMethod(
      class basicGet extends LoggerTest {
        public name = "basicGet";
        public httpPath = "/get";
        public httpMethod = "get";
        public httpDefaultData = {
          hash: REGEX_HASH,
          key: baseConfig.key,
        };
        public use = logger;

        @withMock({ reply: { statusCode: 2 } })
        @withArguments({}, { shouldThrow: true })
        public "handle invalid opStatus"({ err }) {
          expect(err).to.shallowDeepEqual({
            statusCode: 502,
            statusText: "Bad Gateway",
            isOmnipartnersError: true,
            data: {
              statusCode: 2,
              message:
                "Invalid request in which required header or parameters are either missing or invalid.",
            },
            message:
              "OP/Invalid request in which required header or parameters are either missing or invalid.",
            code: "OP/OPStatusError/2",
          });
          return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
            expect(logger.logger.error.called).to.equal(true);
          });
        }
      },
    );
  });
});
