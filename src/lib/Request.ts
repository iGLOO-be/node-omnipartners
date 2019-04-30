import { EventEmitter } from "events";
import reduce from "lodash/reduce";
import fetch, { Response as FetchResponse } from "node-fetch"; // TODO: switch to fetch-retry
import querystring from "qs";
import uuid from "uuid/v4";
import pkg from "../../package.json";
import { RequestError, RequestTimeoutError } from "./errors";
import Response from "./Response";

export interface IRequestOptions {
  method?: string;
  uri: string;
  body?: any;
  json?: boolean;
  responseAsJson?: boolean;
  qs?: any;
  headers?: { [key: string]: any };
  timeout?: number;
  disableRetry?: boolean;
  retries?: number;
  retryDelay?: number;
}

export default class Request extends EventEmitter {
  public protectedKeys = ["key", "hash"];

  public readonly uuid: string;
  public readonly method?: string;
  public readonly uri: string;
  public readonly body?: any;
  public readonly json?: boolean;
  public readonly responseAsJson?: boolean;
  public readonly qs: string;
  public readonly headers: { [key: string]: any };
  public readonly timeout?: number;
  public readonly meta: {
    start: Date;
    finish: Date | null;
  };
  public readonly retries: number;
  public readonly retryDelay: number;

  public response?: Response = undefined;

  constructor({
    method,
    uri,
    body,
    json,
    responseAsJson,
    qs,
    headers,
    timeout,
    disableRetry = false,
    retries = -1,
    retryDelay = 5000,
  }: IRequestOptions) {
    super();

    this.uuid = uuid();
    this.method = method;
    this.uri = uri;
    this.body = body;
    this.json = json;
    this.responseAsJson = responseAsJson;
    this.qs = qs;
    this.headers = {
      ...headers,
      "User-Agent": `node-omnipartners/${pkg.version}`,
      "X-Omnipartners-Request-Id": this.uuid,
      ...(this.json && {
        Accept: "application/json",
      }),
      ...(this.json &&
        this.body && {
          "Content-Type": "application/json",
        }),
    };
    this.timeout = timeout;
    this.meta = {
      finish: null,
      start: new Date(),
    };
    this.retries = disableRetry ? -1 : retries;
    this.retryDelay = retryDelay;
  }

  public async fetch() {
    this.emit("fetch");

    let uri = this.uri;
    if (this.qs) {
      uri +=
        (uri.indexOf("?") >= 0 ? "&" : "?") + querystring.stringify(this.qs);
    }

    let fetchRes: FetchResponse;

    try {
      fetchRes = await fetch(uri, {
        body: this.json ? JSON.stringify(this.body) : this.body,
        headers: this.headers,
        method: this.method,
        timeout: this.timeout,
        // TODO:
        // retries: this.retries,
        // retryDelay: this.retryDelay
      });
    } catch (e) {
      this.emit("fetchError", e);
      if (e.type === "request-timeout") {
        throw new RequestTimeoutError(this);
      } else if (e.code === "ECONNRESET") {
        throw new RequestError(this);
      } else {
        throw e;
      }
    }

    this.meta.finish = new Date();
    this.response = new Response(this, fetchRes);
    this.response.checkRequestStatus();

    this.emit("fetchSuccess");

    return this.response;
  }

  public toJSON() {
    const filterSensitiveData = (obj: any) =>
      reduce(
        obj,
        (res, v, k) => ({
          ...res,
          [k]: this.protectedKeys.indexOf(k) >= 0 ? "[FILTERED]" : v,
        }),
        {},
      );

    return {
      body: this.body && filterSensitiveData(this.body),
      headers: this.headers,
      meta: this.meta,
      method: this.method,
      qs: this.qs && filterSensitiveData(this.qs),
      response: this.response && this.response.toJSON(),
      timeout: this.timeout,
      uri: this.uri,
      uuid: this.uuid,
    };
  }
}
