
import winston from 'winston'
import logStructure from './logStructure'

const winstonDefaultOptions = {
  transports: [
    new winston.transports.Console()
  ]
}

async function prepareRequest (request) {
  if (!request.response) {
    return
  }
  // Try to resolve JSON response before
  return request.response.json()
    .catch(err => { console.error(err) })
    .then(() => {
      // In case of invalid JSON, we need body text
      return request.response.text()
        .catch(err => { console.error(err) })
    })
}

export default function createLogger (winstonOptions = winstonDefaultOptions) {
  const logger = new winston.Logger(winstonOptions)

  const fn = api => {
    api.on('fetchSuccess', (request) => {
      prepareRequest(request).then(() => {
        logger.info(logStructure({ type: 'SUCCESS', request }))
      })
    })

    api.on('fetchError', (error, request) => {
      prepareRequest(request).then(() => {
        logger.error(logStructure({ type: 'ERROR', request, error }))
      })
    })
  }

  // Expose logger for external usage
  fn.logger = logger

  return fn
}
