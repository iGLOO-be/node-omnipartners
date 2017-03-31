
const errorMap = {
  2: {
    message: 'Invalid request in which required header or parameters are either missing or invalid.'
  },
  6: {
    message: 'Not authorised to use this function or its disabled.'
  },
  8: {
    message: 'Internal error.'
  },
  16: {
    message: 'Invalid hash.'
  }
}

export function findOpStatus ({ status, statusCode }) {
  return parseInt(status || statusCode)
}

export function getOpErrorFromStatus (opStatus) {
  return errorMap[opStatus]
}
