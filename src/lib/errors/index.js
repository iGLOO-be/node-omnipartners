
import Request from '../Request'
import Response from '../Response'

class BaseError extends Error {
  statusCode = 502
  statusText = 'Bad Gateway'
  isOmnipartnersError = true

  constructor (request, data) {
    super()

    this.data = data

    if (request instanceof Request) {
      request = request.toJSON()
    } else if (request instanceof Response) {
      request = request.request.toJSON()
    }

    this.request = request
  }
}

export class RequestTimeoutError extends BaseError {
  statusCode = 503
  statusText = 'Gateway Time-out'
  message = 'OP/Request Timeout Error'
  code = 'OP/RequestTimeoutError'
}

export class InvalidReponseError extends BaseError {
  message = 'OP/Invalid Reponse Error'
  code = 'OP/InvalidReponseError'
}

export class NoOPStatusError extends BaseError {
  message = 'OP/Invalid Response Error - No OP Status'
  code = 'OP/NoOPStatusError'
}

export class UnknownOPStatusError extends BaseError {
  message = 'OP/Invalid Response Error - Unkown OP Status'
  code = 'OP/UnknownOPStatusError'
}

export class OPStatusError extends BaseError {
  message = 'OP/Invalid Response Error/OP Status'
  code = 'OP/OPStatusError'

  constructor (request, data) {
    super(request, data)
    if (data.message) {
      this.message = data.message
    }
    if (data.statusCode) {
      this.code = `OP/OPStatusError/${data.statusCode}`
    }
  }
}
