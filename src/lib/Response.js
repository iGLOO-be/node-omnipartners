
import reduce from 'lodash/reduce'
import {
  InvalidReponseError,
  NoOPStatusError,
  OPStatusError,
  UnknownOPStatusError
} from './errors'
import {
  getOpErrorFromStatus,
  findOpStatus
} from './OPStatusError'

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

  async validateStatus ({ validStatus, errorMap } = {}) {
    const body = await this.json()
    const opStatus = findOpStatus(body)
    if (typeof opStatus === 'undefined') {
      throw new NoOPStatusError(this)
    }

    const err = this.getErrorForOPStatus(body, opStatus, errorMap)
    if (err) {
      throw err
    }

    if (!~validStatus.indexOf(opStatus)) {
      throw new UnknownOPStatusError(this)
    }
  }

  async json () {
    if (this._json_promise) return this._json_promise
    this._json_promise = this.res.json()
    this._json = await this._json_promise
    return this._json
  }

  getErrorForOPStatus (data, opStatus, errorMap) {
    let error = null

    if (errorMap && errorMap[opStatus]) {
      error = errorMap[opStatus]
    } else {
      error = getOpErrorFromStatus(opStatus)
    }

    if (!error) {
      return
    }

    return new OPStatusError(this, {
      ...data,
      ...error
    })
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
