import Request from "../Request";

function logStructure({
  type = "",
  request,
  error,
}: {
  type: string;
  request: Request;
  error?: Error;
}) {
  const { method = "GET", uri } = request.toJSON();
  const message = !error
    ? `[${method.toUpperCase()}] ${uri}`
    : `${error.message}\n${error.stack}`;
  return `[${type}] ${message}`;
}

export default logStructure;
