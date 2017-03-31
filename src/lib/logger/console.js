
import winston from 'winston'

export default function onRequest (request) {
  winston.info([
    baseMessage(request, { type: 'START' }),
    JSON.stringify(request.qs || request.body)
  ].join(' '))

  request.on('fetchSuccess', () => {
    winston.info([
      baseMessage(request, { type: 'SUCCESS' })
    ].join(' '))
  })

  request.on('fetchError', (err) => {
    winston.error([
      baseMessage(request, { type: 'ERROR' }),
      '>',
      err.code || err.type,
      '|',
      err.message
    ].join(' '))
  })
}

function baseMessage (request, { type = '' } = {}) {
  return [
    `[${request.uuid}]`,
    `[${type}]`,
    `[${request.method.toUpperCase()}]`,
    request.uri
  ].join(' ')
}
