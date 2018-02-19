
const toJSON = (data) => JSON.stringify(data, null, 2)

function logStructure ({ type = '', request, error } = {}) {
  const { method, uri, qs, body, headers, timeout, meta, response } = request.toJSON()
  let message

  if (!error) {
    message = `[${method.toUpperCase()}] ${uri}`
  } else {
    message = `${error.message}\n${error.stack}`
  }

  return `
[${type}] ${message}

URI: [${method.toUpperCase()}] ${uri}
Headers: ${toJSON(headers)}
Body: ${body && toJSON(body)}
Params: ${toJSON(qs)}

Response: ${toJSON(response)}
`.trim()
}

export default logStructure
