
import { EventEmitter } from 'events'
import Request from './Request'
import appendHashToData from './utils/appendHashToData'
import depd from 'depd'
import pick from 'lodash/pick'
import urlJoin from 'url-join'

const deprecate = depd('API')

export default class Api extends EventEmitter {
  defaultTimeout = 30 * 1000
  defaultHost = null

  validStatus = [ 0 ]
  errorMap = {}

  disableRetry = false

  responseAsJson = true

  constructor (config = {}) {
    super()

    this.config = config
    if (!config.host && config.uri) {
      this.config.host = config.uri
      deprecate('Option "uri" is deprecated')
    }

    this.disableRetry = config.disableRetry
  }

  get host () {
    return this.config.host || this.defaultHost
  }

  async post (uri, data, options = {}) {
    return this.fetch({
      method: 'post',
      uri: urlJoin(this.host, uri),
      body: appendHashToData(data, this.config.key, this.config.secret, options)
    }, options)
  }

  async get (uri, qs, options = {}) {
    return this.fetch({
      method: 'get',
      uri: urlJoin(this.host, uri),
      qs: appendHashToData(qs, this.config.key, this.config.secret, options)
    }, options)
  }

  async fetch (requestOptions, options = {}) {
    const req = new Request({
      timeout: this.config.timeout || this.defaultTimeout,
      json: true,
      responseAsJson: this.responseAsJson,
      disableRetry: this.disableRetry,
      ...requestOptions,
      ...pick(options, ['retries', 'retryDelay']),
      ...(options.retry ? { retries: 3 } : {})
    })

    if (this.config.onRequest) {
      this.config.onRequest(req)
    }

    try {
      await req.fetch()
      await req.response.validateStatus({
        errorMap: {
          ...this.errorMap || {},
          ...options.errorMap || {}
        },
        validStatus: [
          ...this.validStatus || [],
          ...options.validStatus || []
        ]
      })

      let result

      if (this.responseAsJson) {
        result = await req.response.json()
      } else {
        result = await req.response.text()
      }

      this.emit('fetchSuccess', req)

      return result
    } catch (err) {
      this.emit('fetchError', err, req)
      throw err
    }
  }
}
