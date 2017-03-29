
import reduce from 'lodash/reduce'
import {
  InvalidReponseError,
  NoOPStatusError,
  OPStatusError,
  UnknownOPStatusError
} from './errors'

export default class Response {
  constructor (request, res) {
    this.request = request
    this.res = res
  }

  checkRequestStatus () {
    if (this.res.status !== 200) {
      throw new InvalidReponseError(this)
    }
  }

  async validateStatus ({ validStatus }) {
    const body = await this.json()
    const opStatus = parseInt(body.statusCode)
    if (typeof opStatus === 'undefined') {
      throw new NoOPStatusError(this)
    }

    const err = this.getErrorForOPStatus(body)
    if (err) {
      throw err
    }

    if (!~validStatus.indexOf(opStatus)) {
      throw new UnknownOPStatusError(this)
    }
  }

  async json () {
    if (this._json_promise) return await this._json_promise
    this._json_promise = this.res.json()
    this._json = await this._json_promise
    return this._json
  }

  getErrorForOPStatus (data) {
    const errorMap = {
      2: {
        message: 'Invalid request in which required header or parameters are either missing or invalid.'
      },
      3: {
        message: 'User not found in the system.'
      },
      4: {
        message: 'User is found but not active in the system.'
      },
      5: {
        message: 'Password is incorrect.'
      }
    }

    const opStatus = parseInt(data.statusCode)
    if (!errorMap[opStatus]) {
      return
    }

    return new OPStatusError(this, data)
  }

  toJSON () {
    const headers = this.res.headers
    const rawHeaders = typeof headers.values === 'function'
      ? headers.values()
      : typeof headers.raw === 'function'
        ? headers.raw()
        : {}

    const flatHeaders = reduce(rawHeaders, (res, name, value) => ({
      ...res,
      [name]: Array.isArray(value) && value.length === 1
        ? value.join('')
        : value
    }), {})

    return {
      url: this.res.url,
      status: this.res.status,
      statusText: this.res.statusText,
      headers: flatHeaders,
      ok: this.res.ok,
      body: this._json,
      size: this.res.size,
      timeout: this.res.timeout
    }
  }
}
