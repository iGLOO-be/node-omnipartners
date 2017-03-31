
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
  },
  6: {
    message: 'Not authorised to use this function or its disabled.'
  },
  7: {
    message: 'Token not found in the system.'
  },
  8: {
    message: 'Internal error.'
  },
  16: {
    message: 'Invalid hash.'
  },
  17: {
    message: 'Password not found.'
  },
  28: {
    message: 'Password does not meet the required specifications.'
  }
}

export function findOpStatus ({ status, statusCode }) {
  return parseInt(status || statusCode)
}

export function getOpErrorFromStatus (opStatus) {
  return errorMap[opStatus]
}
