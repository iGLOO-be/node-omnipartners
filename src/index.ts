import depd from "depd";

import createLogger from "./lib/logger";

import Data from "./api/data";
import Deals from "./api/deals";
import EventLogger from "./api/eventLogger";
import Identity from "./api/identity";
import Metadata from "./api/metadata";
import Partners from "./api/partners";
import Products from "./api/products";
import Api, { IApiOptions } from "./lib/Api";
import { OmnipartnersError } from "./lib/errors";

export { createLogger, OmnipartnersError };

export * from "./types";
export * from "./data-types";
export * from "./api/metadata";
export * from "./api/deals";
export * from "./api/products";

const deprecate = depd("API");

export interface IOmnipartnersConfig {
  cis?: IApiOptions;
  partners?: IApiOptions;
  products?: IApiOptions;
  deals?: IApiOptions;
  metadata?: IApiOptions;
  eventLogger?: IApiOptions;
}

export class Omnipartners {
  public identify: Identity;
  public identity: Identity;
  public partners: Partners;
  public data: Data;
  public products: Products;
  public deals: Deals;
  public metadata: Metadata;
  public eventLogger: EventLogger;
  private apis: Api[];

  constructor(config: IOmnipartnersConfig) {
    this.identity = new Identity(config.cis);
    this.identify = new Identity(config.cis);
    this.partners = new Partners(config.partners);
    this.data = new Data(config.cis);
    this.products = new Products(config.products);
    this.deals = new Deals(config.deals);
    this.metadata = new Metadata(config.metadata);
    this.eventLogger = new EventLogger(config.eventLogger);
    this.apis = [
      this.identify,
      this.identity,
      this.partners,
      this.products,
      this.deals,
      this.data,
      this.metadata,
      this.eventLogger,
    ];

    deprecate.property(
      this,
      "identify",
      "API `identify` is deprecated. Please use `identity`.",
    );

    deprecate.property(
      this,
      "data",
      "API `data` is deprecated. Please use `metadata`.",
    );
  }

  public use(fn: (api: any) => void) {
    this.apis.forEach(fn);
  }
}

export default (config: IOmnipartnersConfig) => {
  return new Omnipartners(config);
};
