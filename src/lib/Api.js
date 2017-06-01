
import Request from './Request'
import appendHashToData from './utils/appendHashToData'
import deprecate from 'deprecate'

export default class Api {
  defaultTimeout = 30 * 1000
  defaultHost = null

  validStatus = [ 0 ]
  errorMap = {}

  constructor (config) {
    this.config = config
    if (!config.host && config.uri) {
      this.config.host = config.uri
      deprecate('Option "uri" is deprecated')
    }
  }

  get host () {
    return this.config.host || this.defaultHost
  }

  async post (uri, data, options = {}) {
    return this.fetch({
      method: 'post',
      uri: this.host + uri,
      body: appendHashToData(data, this.config.key, this.config.secret, options)
    }, options)
  }

  async get (uri, qs, options = {}) {
    return this.fetch({
      method: 'get',
      uri: this.host + uri,
      qs: appendHashToData(qs, this.config.key, this.config.secret, options)
    }, options)
  }

  async fetch (requestOptions, options = {}) {
    const req = new Request({
      timeout: this.config.timeout || this.defaultTimeout,
      json: true,
      ...requestOptions
    })

    if (this.config.onRequest) {
      this.config.onRequest(req)
    }

    await req.fetch()
    await req.response.validateStatus({
      errorMap: {
        ...this.errorMap || {},
        ...options.errorMap || {}
      },
      validStatus: [
        ...this.validStatus || {},
        ...options.validStatus || {}
      ]
    })

    return req.response.json()
  }
}
