/* eslint-env mocha */

import nock from 'nock'

import { expect } from 'chai'

export {
  expect
}

export const REGEX_HASH = /[0-9a-z]{40}/i
export const NOCK_RECORD = !!process.env.NOCK_RECORD

if (NOCK_RECORD) {
  nock.recorder.rec()
}

afterEach(() => {
  nock.cleanAll()
})

export function withArguments (data, {
  shouldThrow = false
} = {}) {
  return (target, property, descriptor) => {
    const fn = descriptor.value
    descriptor.value = async function () {
      const api = new this.Api(this.apiConfig)
      const method = this.name
      let err = null
      let response = null

      try {
        response = await api[method](data)
      } catch (e) {
        if (!shouldThrow) {
          throw e
        } else {
          err = e
        }
      }

      fn({
        response,
        err
      })
    }
  }
}

export function withMock ({
  query,
  reply
}) {
  return (target, property, descriptor) => {
    const fn = descriptor.value
    descriptor.value = async function (...args) {
      const { httpMethod, httpPath, httpDefaultData } = this
      const data = {
        ...httpDefaultData,
        ...query
      }

      const mock = nock(this.apiConfig.host, { encodedQueryParams: true })
        [httpMethod](httpPath) // eslint-disable-line no-unexpected-multiline
        .query(data)
        .reply(200, reply)

      const res = await fn.apply(this, args)

      if (!NOCK_RECORD) {
        try {
          mock.done()
        } catch (e) {
          // console.log(err)
          throw e
        }
      }

      return res
    }
  }
}

export function describeMethod (Klass) {
  describe(`${Klass.name}()`, () => {
    const methods = Object.getOwnPropertyNames(Klass.prototype)
    const filterMethod = method => (
      method !== 'constructor'
    )

    methods.filter(filterMethod).forEach(method => {
      it(method, function () {
        if (NOCK_RECORD) {
          this.timeout(60 * 1000)
        }

        const instance = new Klass()
        return instance[method]()
      })
    })
  })
}

export function describeApi (api, fn) {
  describe(`API: ${api}`, fn)
}
