import reduce from "lodash/reduce";
import { Response as FetchResponse } from "node-fetch"; // TODO: switch to fetch-retry
import {
  InvalidJSONReponseError,
  InvalidReponseError,
  NoOPStatusError,
  OPStatusError,
  UnknownOPStatusError
} from "./errors";
import { findOpStatus, getOpErrorFromStatus, IErrorMap } from "./opStatusError";
import Request from "./Request";

export default class Response {
  public readonly request: Request

  private readonly res: FetchResponse

  private textPromise?: Promise<string>
  private bodyText?: string
  private bodyJson?: Promise<any>

  constructor(request: Request, res: FetchResponse) {
    this.request = request;
    this.res = res;
  }

  public checkRequestStatus() {
    if (this.res.status !== 200) {
      throw new InvalidReponseError(this);
    }
  }

  public async validateStatus({ validStatus, errorMap }: { validStatus: number[], errorMap: IErrorMap }) {
    if (!this.request.responseAsJson) {
      return;
    }

    const body = await this.json();
    const opStatus = findOpStatus(body);
    if (typeof opStatus === "undefined") {
      throw new NoOPStatusError(this);
    }

    const err = this.getErrorForOPStatus(body, opStatus, errorMap);
    if (err) {
      throw err;
    }

    if (validStatus.indexOf(opStatus) < 0) {
      throw new UnknownOPStatusError(this, opStatus);
    }
  }

  public async text() {
    if (this.textPromise) { return this.textPromise; }
    this.textPromise = this.res.text();
    this.bodyText = await this.textPromise;
    return this.bodyText;
  }

  public async json() {
    this.bodyJson = await this.text().then(value => {
      try {
        return JSON.parse(value);
      } catch (err) {
        throw new InvalidJSONReponseError(this, { text: value });
      }
    });
    return this.bodyJson;
  }

  public getErrorForOPStatus(data: { [key: string]: any }, opStatus: number, errorMap: IErrorMap) {
    const error = errorMap && errorMap[opStatus] ?  errorMap[opStatus] : getOpErrorFromStatus(opStatus);

    if (!error) {
      return;
    }

    return new OPStatusError(this, {
      ...data,
      ...error
    });
  }

  public toJSON() {
    const headers = this.res.headers;
    const rawHeaders =
      typeof headers.values === "function"
        ? headers.values()
        : typeof headers.raw === "function"
        ? headers.raw()
        : {};

    const flatHeaders = reduce(
      rawHeaders,
      (res, value, name) => ({
        ...res,
        [name]:
          Array.isArray(value) && value.length === 1 ? value.join("") : value
      }),
      {}
    );

    return {
      body: this.bodyJson || this.bodyText,
      headers: flatHeaders,
      ok: this.res.ok,
      size: this.res.size,
      status: this.res.status,
      statusText: this.res.statusText,
      timeout: this.res.timeout
    };
  }
}
