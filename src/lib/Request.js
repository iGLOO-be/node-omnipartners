
import { EventEmitter } from 'events'
import querystring from 'querystring'
import fetch from 'fetch-retry'
import uuid from 'uuid/v4'
import reduce from 'lodash/reduce'
import Response from './Response'
import pkg from '../../package.json'
import {
  RequestTimeoutError,
  RequestError
} from './errors'

export default class Request extends EventEmitter {
  protectedKeys = ['key', 'hash']

  constructor ({
    method,
    uri,
    body,
    json,
    qs,
    headers,
    timeout,
    retries = -1,
    retryDelay = 500
  }) {
    super()

    this.uuid = uuid()
    this.method = method
    this.uri = uri
    this.body = body
    this.json = json
    this.qs = qs
    this.headers = {
      ...headers,
      'User-Agent': `node-omnipartners/${pkg.version}`,
      'X-Omnipartners-Request-Id': this.uuid
    }
    this.timeout = timeout
    this.meta = {
      start: new Date(),
      finish: null
    }
    this.retries = retries
    this.retryDelay = retryDelay
  }

  async fetch () {
    this.emit('fetch')

    let uri = this.uri
    if (this.qs) {
      uri += (~uri.indexOf('?') ? '&' : '?') + querystring.stringify(this.qs)
    }

    let fetchRes

    const headers = {
      ...this.headers,
      ...this.json ? {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      } : {}
    }

    try {
      fetchRes = await fetch(uri, {
        method: this.method,
        body: this.json ? JSON.stringify(this.body) : this.body,
        headers: headers,
        timeout: this.timeout,
        retries: this.retries,
        retryDelay: this.retryDelay
      })
    } catch (e) {
      this.emit('fetchError', e)
      if (e.type === 'request-timeout') {
        throw new RequestTimeoutError(this)
      } else if (e.code === 'ECONNRESET') {
        throw new RequestError(this)
      } else {
        throw e
      }
    }

    this.meta.finish = new Date()
    this.response = new Response(this, fetchRes)
    this.response.checkRequestStatus()

    this.emit('fetchSuccess')
  }

  toJSON () {
    const filterSensitiveData = obj => reduce(obj, (res, v, k) => ({
      ...res,
      [k]: ~this.protectedKeys.indexOf(k) ? '[FILTERED]' : v
    }), {})

    return {
      uuid: this.uuid,
      method: this.method,
      uri: this.uri,
      qs: this.qs && filterSensitiveData(this.qs),
      body: this.body && filterSensitiveData(this.body),
      headers: this.headers,
      timeout: this.timeout,
      meta: this.meta,
      response: this.response && this.response.toJSON()
    }
  }
}
