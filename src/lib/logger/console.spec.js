/* eslint-env mocha */

import Request from '../Request'
import { InvalidReponseError } from '../errors'
import consoleLogger from './console'

const requestOptions = {
  method: 'get',
  uri: 'https://igloo.be',
  qs: { foo: 'bar' }
}

describe('console', () => {
  it('should log success', () => {
    const req = new Request(requestOptions)
    consoleLogger(req)
    req.emit('fetchSuccess')
  })

  it('should log success for POST', () => {
    const req = new Request({
      ...requestOptions,
      method: 'post',
      qs: null,
      body: {
        'in the body': 'yes'
      }
    })
    consoleLogger(req)
    req.emit('fetchSuccess')
  })

  it('should log error', () => {
    const req = new Request(requestOptions)
    consoleLogger(req)
    req.emit('fetchError', new InvalidReponseError(req))
  })
})
