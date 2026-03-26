import { EventEmitter } from "events";
import reduce from "lodash/reduce";
import querystring from "qs";
import { Readable } from "stream";
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
      const headers = { ...this.headers };
      let body: BodyInit | undefined;

      if (this.multipart && this.body) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(
          this.body as Record<string, unknown>,
        )) {
          if (value === undefined || value === null) continue;
          if (typeof value === "string") {
            formData.append(key, value);
          } else if (value instanceof Readable) {
            const chunks: Buffer[] = [];
            for await (const chunk of value) {
              chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            }
            formData.append(key, new Blob([Buffer.concat(chunks)]));
          } else if (
            value &&
            typeof value === "object" &&
            "value" in value &&
            "options" in value
          ) {
            const { value: buf, options } = value as {
              value: Buffer;
              options: { filename: string };
            };
            formData.append(key, new Blob([buf]), options.filename);
          } else {
            formData.append(key, String(value));
          }
        }
        // Remove Content-Type so fetch sets it automatically with the correct boundary
        delete headers["Content-Type"];
        body = formData;
      } else {
        body = this.json ? JSON.stringify(this.body) : this.body;
      }

      const controller = new AbortController();
      const timeoutId = this.timeout
        ? setTimeout(() => controller.abort(), this.timeout)
        : undefined;

      const rawRes = await fetch(uri, {
        body,
        headers,
        method: this.method,
        signal: controller.signal,
      }).finally(() => {
        if (timeoutId !== undefined) clearTimeout(timeoutId);
      });

      const flatHeaders: { [key: string]: string } = {};
      rawRes.headers.forEach((value: string, name: string) => {
        flatHeaders[name] = value;
      });

      fetchRes = {
        status: rawRes.status,
        text: () => rawRes.text(),
        headers: flatHeaders,
        ok: rawRes.ok,
        statusText: rawRes.statusText,
      };
    } catch (e) {
      this.emit("fetchError", e);
      const err = e as { name?: string; code?: string; cause?: { code?: string } };
      if (err.name === "TimeoutError" || err.name === "AbortError") {
        throw new RequestTimeoutError({ request: this });
      } else if (
        err.code === "ECONNRESET" ||
        err.cause?.code === "ECONNRESET"
      ) {
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
