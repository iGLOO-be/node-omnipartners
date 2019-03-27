import Request from "../Request";
import Response from "../Response";

interface IAnyData {
  [key: string]: any;
}

class BaseError extends Error {
  public readonly statusCode: number = 502;
  public readonly statusText: string = "Bad Gateway";
  public readonly isOmnipartnersError: boolean = true;
  public readonly data?: IAnyData;
  public readonly request: IAnyData;
  public message: string;
  public code: string;

  constructor(request: Request | Response, data?: IAnyData) {
    super();

    this.data = data;
    this.message = "";
    this.code = "";

    this.request = request instanceof Request ? request.toJSON() : request.request.toJSON();
  }
}

export class RequestError extends BaseError {
  public statusCode = 500;
  public statusText = "Gateway Error";
  public message = "OP/Request Error";
  public code = "OP/RequestError";
}

export class RequestTimeoutError extends BaseError {
  public statusCode = 503;
  public statusText = "Gateway Time-out";
  public message = "OP/Request Timeout Error";
  public code = "OP/RequestTimeoutError";
}

export class InvalidReponseError extends BaseError {
  public message = "OP/Invalid Reponse Error";
  public code = "OP/InvalidReponseError";
}

export class InvalidJSONReponseError extends BaseError {
  public message = "OP/Invalid JSON Reponse Error";
  public code = "OP/InvalidJSONReponseError";
}

export class NoOPStatusError extends BaseError {
  public message = "OP/Invalid Response Error - No OP Status";
  public code = "OP/NoOPStatusError";
}

export class UnknownOPStatusError extends BaseError {
  constructor(request: Request | Response, opStatus: number) {
    super(request, {
      statusCode: opStatus,
    });

    this.message = `OP/Invalid Response Error - Unkown OP Status/${opStatus}`;
    this.code = `OP/UnknownOPStatusError/${opStatus}`;
  }
}

export class OPStatusError extends BaseError {
  public message = "OP/Invalid Response Error/OP Status";
  public code = "OP/OPStatusError";

  constructor(request: Request | Response, data: IAnyData) {
    super(request, data);
    if (data.message) {
      this.message = `OP/${data.message}`;
    }
    if (data.statusCode) {
      this.code = `OP/OPStatusError/${data.statusCode}`;
    }
  }
}
