import winston from "winston";
import Api from "../Api";
import Request from "../Request";
import logStructure from "./logStructure";

const winstonDefaultOptions = {
  format: winston.format.prettyPrint(),
  transports: [new winston.transports.Console()],
};

async function prepareRequest(request: Request) {
  if (!request.response) {
    return;
  }
  const response = request.response;
  // Try to resolve JSON response before
  return response
    .json()
    .catch(err => {
      console.error(err);
    })
    .then(() => {
      // In case of invalid JSON, we need body text
      return response.text();
    });
}

export default function createLogger(winstonOptions = winstonDefaultOptions) {
  const logger = winston.createLogger(winstonOptions);

  const fn = (api: Api) => {
    api.on("fetchSuccess", (request: Request) => {
      prepareRequest(request).then(() => {
        logger.info(logStructure({ type: "SUCCESS", request }), {
          request: request.toJSON(),
        });
      });
    });

    api.on("fetchError", (error: Error, request: Request) => {
      prepareRequest(request).then(() => {
        logger.error(logStructure({ type: "ERROR", request, error }), {
          request: request.toJSON(),
        });
      });
    });
  };

  // Expose logger for external usage
  fn.logger = logger;

  return fn;
}
