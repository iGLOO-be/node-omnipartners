import Request from "../Request";
import Response from "../Response";

interface IAnyData {
  [key: string]: any;
}

export function isOmnipartnersError(err: any): err is OmnipartnersError {
  return err.isOmnipartnersError;
}

interface IBaseErrorInput extends IAnyData {
  request?: Request;
  response?: Response;
}

export class OmnipartnersError extends Error {
  public readonly statusCode: number = 502;
  public readonly statusText: string = "Bad Gateway";
  public readonly isOmnipartnersError: boolean = true;
  public readonly data?: IAnyData;
  public readonly request: IAnyData;
  public message: string;
  public code: string;
  public errors?: { [key: string]: { [validator: string]: string } };

  constructor({ request, response, ...data }: IBaseErrorInput = {}) {
    super();

    this.data = data;
    this.message = "";
    this.code = "";
    this.errors = data && data.errors;

    this.request =
      request instanceof Request
        ? request.toJSON()
        : response instanceof Response
        ? response.request.toJSON()
        : {};
  }
}

export class RequestError extends OmnipartnersError {
  public statusCode = 500;
  public statusText = "Gateway Error";
  public message = "OP/Request Error";
  public code = "OP/RequestError";
}

export class RequestTimeoutError extends OmnipartnersError {
  public statusCode = 503;
  public statusText = "Gateway Time-out";
  public message = "OP/Request Timeout Error";
  public code = "OP/RequestTimeoutError";
}

export class InvalidReponseError extends OmnipartnersError {
  public message = "OP/Invalid Reponse Error";
  public code = "OP/InvalidReponseError";
}

export class InvalidJSONReponseError extends OmnipartnersError {
  public message = "OP/Invalid JSON Reponse Error";
  public code = "OP/InvalidJSONReponseError";
}

export class NoOPStatusError extends OmnipartnersError {
  public message = "OP/Invalid Response Error - No OP Status";
  public code = "OP/NoOPStatusError";
}

export class UnknownOPStatusError extends OmnipartnersError {
  constructor({ opStatus, ...data }: IBaseErrorInput & { opStatus: number }) {
    super({ ...data, statusCode: opStatus });

    this.message = `OP/Invalid Response Error - Unkown OP Status/${opStatus}`;
    this.code = `OP/UnknownOPStatusError/${opStatus}`;
  }
}

export class OPStatusError extends OmnipartnersError {
  public message = "OP/Invalid Response Error/OP Status";
  public code = "OP/OPStatusError";

  constructor(
    data: IBaseErrorInput & {
      message?: string;
      statusCode?: number;
      status?: number;
    },
  ) {
    super(data);
    if (data && data.message) {
      this.message = `OP/${data.message}`;
    }
    if (data && data.statusCode) {
      this.code = `OP/OPStatusError/${data.statusCode}`;
    }
    if (data && data.status) {
      this.code = `OP/OPStatusError/${data.status}`;
    }
  }
}
