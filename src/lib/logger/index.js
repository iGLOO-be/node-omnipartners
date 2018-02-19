
import winston from 'winston'
import logStructure from './logStructure'

function prepareRequest (request) {
  // Try to resolve JSON response before
  return request.response.json()
    .catch(err => { console.error(err) })
    .then(() => {
      // In case of invalid JSON, we need body text
      return request.response.text()
        .catch(err => { console.error(err) })
    })
}

export default function createLogger (winstonOptions) {
  const logger = new winston.Logger(winstonOptions)

  return api => {
    api.on('fetchSuccess', (request) => {
      prepareRequest(request).then(() => {
        logger.info(logStructure({ type: 'SUCCESS', request }))
      })
    })

    api.on('fetchError', (error, request) => {
      prepareRequest(request).then(() => {
        logger.info(logStructure({ type: 'ERROR', request, error }))
      })
    })
  }
}
