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
  onRequest?: (req: Request) => void;
}

interface IApiFetchAllOptions extends IRequestOptions {
  retry?: boolean;
  errorMap?: IErrorMap;
  validStatus?: number[];
}

export type IApiFetchOptions = Partial<IApiFetchAllOptions> &
  Partial<IDataHashOptions>;

export interface IApiPostData {
  [key: string]: any;
}

export default class Api extends EventEmitter {
  public defaultTimeout = 30 * 1000;
  public defaultHost?: string;

  public validStatus = [0];
  public errorMap = {};

  public disableRetry = false;

  public responseAsJson = true;

  private config: IApiOptions;

  constructor(
    config: IApiOptions = {
      key: "",
      secret: "",
      uri: "",
    },
  ) {
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

  public async post(
    uri: string,
    data: IApiPostData,
    options: IApiFetchOptions = {},
  ) {
    return this.fetch({
      body: appendHashToData(
        data,
        this.config.key,
        this.config.secret,
        options,
      ),
      method: "post",
      uri: urlJoin(this.host, uri),
      ...options,
    });
  }

  public async get(
    uri: string,
    qs: { [key: string]: any } = {},
    options: IApiFetchOptions = {},
  ) {
    return this.fetch({
      method: "get",
      qs: appendHashToData(qs, this.config.key, this.config.secret, options),
      uri: urlJoin(this.host, uri),
      ...options,
    });
  }

  public async fetch(requestOptions: IApiFetchAllOptions) {
    const req = new Request({
      disableRetry: this.disableRetry,

      json: true,

      responseAsJson: this.responseAsJson,

      timeout: this.config.timeout || this.defaultTimeout,

      ...requestOptions,
      ...pick(requestOptions, ["retries", "retryDelay"]),
      ...(requestOptions.retry ? { retries: 3 } : {}),
    });

    if (this.config.onRequest) {
      this.config.onRequest(req);
    }

    try {
      const response = await req.fetch();
      await response.validateStatus({
        errorMap: {
          ...(this.errorMap || {}),
          ...(requestOptions.errorMap || {}),
        },
        validStatus: [
          ...(this.validStatus || []),
          ...(requestOptions.validStatus || []),
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
