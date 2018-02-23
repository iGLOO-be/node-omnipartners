/* eslint-env mocha */

import nock from 'nock'

import chai, { expect } from 'chai'
chai.use(require('chai-shallow-deep-equal'))

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
      if (this.use) {
        this.use(api)
      }
      const method = this.name
      let err = null
      let response = null

      try {
        response = await api[method](data)
      } catch (e) {
        if (!shouldThrow || !e.isOmnipartnersError) {
          throw e
        } else {
          err = e
        }
      }

      return fn({
        response,
        err
      })
    }
  }
}

export function withMock ({
  query,
  reply,
  delay
}) {
  return (target, property, descriptor) => {
    const fn = descriptor.value
    descriptor.value = async function (...args) {
      const { httpMethod, httpPath, httpDefaultData } = this
      const data = {
        ...httpDefaultData,
        ...query
      }

      const tmpMock = nock(this.apiConfig.host, { encodedQueryParams: true })
        [httpMethod](httpPath) // eslint-disable-line no-unexpected-multiline

      if (delay) {
        tmpMock.delay(delay)
      }

      const mock = tmpMock
        .query(data)
        .reply(200, reply)

      const res = await fn.apply(this, args)

      if (!NOCK_RECORD) {
        mock.done()
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
