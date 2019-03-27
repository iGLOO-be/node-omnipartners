import depd from "depd";
import { EventEmitter } from "events";
import pick from "lodash/pick";
import urlJoin from "url-join";
import { IErrorMap } from "./opStatusError";
import Request, { IRequestOptions } from "./Request";
import appendHashToData, { IDataHashOptions } from "./utils/appendHashToData";

const deprecate = depd("API");

export interface IApiOptions {
  host?: string;
  uri: string;
  disableRetry?: boolean;
  key: string;
  secret: string;
  timeout?: number;
  onRequest: (req: Request) => void;
}

export default class Api extends EventEmitter {
  public defaultTimeout = 30 * 1000;
  public defaultHost = null;

  public validStatus = [0];
  public errorMap = {};

  public disableRetry = false;

  public responseAsJson = true;

  private config: IApiOptions;

  constructor(config: IApiOptions) {
    super();

    this.config = config;
    if (!config.host && config.uri) {
      this.config.host = config.uri;
      deprecate('Option "uri" is deprecated');
    }

    this.disableRetry = config.disableRetry || false;
  }

  get host() {
    return this.config.host || this.defaultHost || "";
  }

  public async post(uri: string, data: any, options: IDataHashOptions = {}) {
    return this.fetch(
      {
        body: appendHashToData(
          data,
          this.config.key,
          this.config.secret,
          options,
        ),
        method: "post",
        uri: urlJoin(this.host, uri),
      },
      // TODO retry:
      // options
    );
  }

  public async get(
    uri: string,
    qs: { [key: string]: any },
    options: IDataHashOptions = {},
  ) {
    return this.fetch(
      {
        method: "get",
        qs: appendHashToData(qs, this.config.key, this.config.secret, options),
        uri: urlJoin(this.host, uri),
      },
      // TODO retry:
      // options
    );
  }

  public async fetch(
    requestOptions: IRequestOptions,
    options: {
      retry?: number;
      errorMap?: IErrorMap;
      validStatus?: number[];
    } = {},
  ) {
    const req = new Request({
      disableRetry: this.disableRetry,

      json: true,

      responseAsJson: this.responseAsJson,

      timeout: this.config.timeout || this.defaultTimeout,

      ...requestOptions,
      ...pick(options, ["retries", "retryDelay"]),
      ...(options.retry ? { retries: 3 } : {}),
    });

    if (this.config.onRequest) {
      this.config.onRequest(req);
    }

    try {
      const response = await req.fetch();
      await response.validateStatus({
        errorMap: {
          ...(this.errorMap || {}),
          ...(options.errorMap || {}),
        },
        validStatus: [
          ...(this.validStatus || []),
          ...(options.validStatus || []),
        ],
      });

      const result = this.responseAsJson
        ? await response.json()
        : await response.text();

      this.emit("fetchSuccess", req);

      return result;
    } catch (err) {
      this.emit("fetchError", err, req);
      throw err;
    }
  }
}
