import Request from "../Request";

const toJSON = (data?: {}) => JSON.stringify(data, null, 2);

function logStructure({
  type = "",
  request,
  error,
}: {
  type: string;
  request: Request;
  error?: Error;
}) {
  const { method = "GET", uri, qs, body, headers, response } = request.toJSON();
  const message = !error
    ? `[${method.toUpperCase()}] ${uri}`
    : `${error.message}\n${error.stack}`;
  return `
[${type}] ${message}

URI: [${method.toUpperCase()}] ${uri}
Headers: ${toJSON(headers)}
Body: ${body && toJSON(body)}
Params: ${toJSON(qs)}

Response: ${toJSON(response)}
`.trim();
}

export default logStructure;
