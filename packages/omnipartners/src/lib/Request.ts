import { EventEmitter } from "events";
import reduce from "lodash/reduce";
import fetch, { FetchError } from "node-fetch"; // TODO: switch to fetch-retry
import querystring from "qs";
import { Response as RequestResponse } from "request";
import request from "request-promise-native";
import { v4 as uuid } from "uuid";
import { RequestError, RequestTimeoutError } from "./errors";
import Response, { IFetchResponse } from "./Response";

export interface IRequestOptions {
  method?: string;
  uri: string;
  body?: any;
  json?: boolean;
  multipart?: boolean;
  responseAsJson?: boolean;
  qs?: any;
  headers?: { [key: string]: any };
  timeout?: number;
  disableRetry?: boolean;
  retries?: number;
  retryDelay?: number;
}

export default class Request extends EventEmitter {
  public protectedKeys = ["hash"];

  public readonly uuid: string;
  public readonly method?: string;
  public readonly uri: string;
  public readonly body?: any;
  public readonly json?: boolean;
  public readonly multipart?: boolean;
  public readonly responseAsJson?: boolean;
  public readonly qs: string;
  public readonly headers: { [key: string]: any };
  public readonly timeout?: number;
  public readonly meta: {
    start: Date;
    finish: Date | null;
    time?: number;
  };
  public readonly retries: number;
  public readonly retryDelay: number;

  public response?: Response = undefined;

  constructor({
    method,
    uri,
    body,
    json,
    multipart,
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
    this.multipart = multipart;
    this.responseAsJson = responseAsJson;
    this.qs = qs;
    this.headers = {
      ...headers,
      "User-Agent": `node-omnipartners/2.0.0`,
      "X-Omnipartners-Request-Id": this.uuid,
      ...(this.json && {
        Accept: "application/json",
      }),
      ...(this.json &&
        this.body && {
          "Content-Type": "application/json",
        }),
      ...(this.multipart &&
        this.body && {
          "Content-Type": "multipart/form-data",
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

    let fetchRes: IFetchResponse;

    try {
      if (this.multipart) {
        const requestRes = (await request(uri, {
          headers: this.headers,
          formData: this.body,
          method: this.method,
          timeout: this.timeout,
          resolveWithFullResponse: true,
        })) as RequestResponse;

        fetchRes = {
          status: requestRes.statusCode,
          text: async () => requestRes.body,
          headers: requestRes.headers,
          ok: true,
          size: 0,
          statusText: requestRes.statusMessage,
          timeout: this.timeout || 0,
        };
      } else {
        const tempRes = await fetch(uri, {
          body: this.json ? JSON.stringify(this.body) : this.body,
          headers: this.headers,
          method: this.method,
          timeout: this.timeout,
          // TODO:
          // retries: this.retries,
          // retryDelay: this.retryDelay
        });

        const rawHeaders =
          typeof tempRes.headers.values === "function"
            ? tempRes.headers.values()
            : typeof tempRes.headers.raw === "function"
            ? tempRes.headers.raw()
            : {};
        const flatHeaders = reduce(
          rawHeaders,
          (res, value, name) => ({
            ...res,
            [name]:
              Array.isArray(value) && value.length === 1
                ? value.join("")
                : value,
          }),
          {},
        );

        fetchRes = {
          status: tempRes.status,
          text: () => tempRes.text(),
          headers: flatHeaders,
          ok: tempRes.ok,
          size: tempRes.size,
          statusText: tempRes.statusText,
          timeout: tempRes.timeout,
        };
      }
    } catch (e) {
      this.emit("fetchError", e);
      if ((e as FetchError).type === "request-timeout") {
        throw new RequestTimeoutError({ request: this });
      } else if ((e as FetchError).code === "ECONNRESET") {
        throw new RequestError(this);
      } else {
        throw e;
      }
    }

    this.meta.finish = new Date();
    this.meta.time = this.meta.finish.getTime() - this.meta.start.getTime();
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
