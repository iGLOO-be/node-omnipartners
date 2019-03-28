/* eslint-env mocha */

import nock from "nock";

export const REGEX_HASH = /[0-9a-z]{40}/i;
export const NOCK_RECORD = !!process.env.NOCK_RECORD;

if (NOCK_RECORD) {
  nock.recorder.rec();
}

afterEach(() => {
  nock.cleanAll();
});

export function withArguments(data: any, { shouldThrow = false } = {}) {
  return (target: any, property: string, descriptor: any) => {
    const fn = descriptor.value;
    descriptor.value = async function() {
      const api = new this.Api(this.apiConfig);
      if (this.use) {
        this.use(api);
      }
      const method = this.name;
      let err = null;
      let response = null;

      try {
        response = await api[method](data);
      } catch (e) {
        if (!shouldThrow || !e.isOmnipartnersError) {
          throw e;
        } else {
          err = e;
        }
      }

      return fn({
        err,
        response,
      });
    };
  };
}

export function withMock({
  query,
  reply,
  delay,
}: {
  query?: {};
  reply?: any;
  delay?: { head?: number };
}) {
  return (target: any, property: string, descriptor: any) => {
    const fn = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      const {
        httpMethod,
        httpPath,
        httpDefaultData,
      }: {
        httpMethod: "get" | "post" | "head";
        httpPath: string;
        httpDefaultData: {};
      } = this; // tslint:disable-line no-this-assignment
      const data: any = {
        ...httpDefaultData,
        ...query,
      };

      const tmpMock = nock(this.apiConfig.host, {
        // encodedQueryParams: true
      })[httpMethod](httpPath);

      if (delay) {
        tmpMock.delay(delay);
      }

      const mock = tmpMock
        .query((qs: any) => {
          return Object.keys(data).reduce((valid, key) => {
            if (!valid) {
              return false;
            }
            if (data[key].test) {
              return data[key].test(qs[key]);
            } else {
              return (
                decodeURIComponent(data[key]) === decodeURIComponent(qs[key])
              );
            }
          }, true);
        })
        .reply(200, reply);

      const res = await fn.apply(this, args);

      if (!NOCK_RECORD) {
        mock.done();
      }

      return res;
    };
  };
}

export function describeMethod(Klass: any) {
  describe(`${Klass.name}()`, () => {
    const methods = Object.getOwnPropertyNames(Klass.prototype);
    const filterMethod = (method: string) => method !== "constructor";

    methods.filter(filterMethod).forEach(method => {
      it(method, () => {
        const instance = new Klass();
        return instance[method]();
      });
    });
  });
}

export function describeApi(api: string, fn: () => void) {
  describe(`API: ${api}`, fn);
}

describe("Test utils", () => {
  it("works", () => {});
});
