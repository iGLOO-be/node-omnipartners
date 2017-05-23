/* eslint-env mocha */

import {
  expect,
  REGEX_HASH,
  withArguments,
  withMock,
  describeMethod,
  describeApi
} from './test.utils'

import Api from '../src/lib/Api'

const baseConfig = {
  host: 'http://httpbin.org',
  key: 'aaa',
  secret: 'bbb'
  // onRequest: consoleLogger
}

class TestApi extends Api {
  defaultTimeout = 10

  basicGet (data) {
    return this.get('/get', data)
  }
}

class BaseIdentityTest {
  Api = TestApi
  apiConfig = baseConfig
}

describeApi('Api', () => {
  describeMethod(class basicGet extends BaseIdentityTest {
    name = 'basicGet'
    httpPath = '/get'
    httpMethod = 'get'
    httpDefaultData = {
      'hash': REGEX_HASH,
      'key': baseConfig.key
    }

    @withMock({ reply: { 'statusCode': 2 } })
    @withArguments({}, { shouldThrow: true })
    'handle invalid opStatus' ({ err }) {
      expect(err).to.shallowDeepEqual({
        statusCode: 502,
        statusText: 'Bad Gateway',
        isOmnipartnersError: true,
        data: {
          statusCode: 2,
          message: 'Invalid request in which required header or parameters are either missing or invalid.'
        },
        message: 'Invalid request in which required header or parameters are either missing or invalid.',
        code: 'OP/OPStatusError/2'
      })
    }

    @withMock({ reply: {}, delay: { head: 99999 } })
    @withArguments({}, { shouldThrow: true })
    'handle socket timeout' ({ err }) {
      expect(err).to.shallowDeepEqual({
        statusCode: 503,
        statusText: 'Gateway Time-out',
        isOmnipartnersError: true,
        data: undefined,
        message: 'OP/Request Timeout Error',
        code: 'OP/RequestTimeoutError'
      })
    }

    @withMock({ reply: { 'statusCode': 0, data: { foo: 'bar' } } })
    @withArguments({})
    'handle valid opStatus' ({ err }) {
      expect(err).to.equal(null)
    }
  })
})
