import depd from "depd";

import createLogger from "./lib/logger";

import Data from "./api/data";
import Deals from "./api/deals";
import EventLogger from "./api/eventLogger";
import Identity from "./api/identity";
import Loyalty from "./api/loyalty";
import Metadata from "./api/metadata";
import Partners from "./api/partners";
import Products from "./api/products";
import Api, { IApiOptions } from "./lib/Api";
import { OmnipartnersError } from "./lib/errors";

export { createLogger, OmnipartnersError };

export * from "./types";
export * from "./data-types";
export * from "./partner-types";
export * from "./api/metadata";
export * from "./api/deals";
export * from "./api/partners";
export * from "./api/products";
export * from "./api/loyalty";
export * from "./api/identity";
export * from "./lib/errors";

const deprecate = depd("API");

export interface IOmnipartnersConfig {
  cis?: IApiOptions;
  partners?: IApiOptions;
  products?: IApiOptions;
  loyalty?: IApiOptions;
  deals?: IApiOptions;
  metadata?: IApiOptions;
  eventLogger?: IApiOptions;
}

export enum omnipartnersApiNames {
  identify = "identify",
  identity = "identity",
  partners = "partners",
  loyalty = "loyalty",
  products = "products",
  deals = "deals",
  data = "data",
  metadata = "metadata",
  eventLogger = "eventLogger",
}

export class Omnipartners {
  public identify: Identity;
  public identity: Identity;
  public partners: Partners;
  public loyalty: Loyalty;
  public data: Data;
  public products: Products;
  public deals: Deals;
  public metadata: Metadata;
  public eventLogger: EventLogger;
  private apis: { [k in omnipartnersApiNames]: Api };

  constructor(config: IOmnipartnersConfig) {
    this.identity = new Identity(config.cis);
    this.identify = new Identity(config.cis);
    this.partners = new Partners(config.partners);
    this.loyalty = new Loyalty(config.loyalty);
    this.data = new Data(config.cis);
    this.products = new Products(config.products);
    this.deals = new Deals(config.deals);
    this.metadata = new Metadata(config.metadata);
    this.eventLogger = new EventLogger(config.eventLogger);
    this.apis = {
      identity: this.identity,
      identify: this.identify,
      partners: this.partners,
      loyalty: this.loyalty,
      data: this.data,
      products: this.products,
      deals: this.deals,
      metadata: this.metadata,
      eventLogger: this.eventLogger,
    };

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

  public use(
    fn: (api: Api) => void,
    {
      except,
    }: {
      except?: omnipartnersApiNames[];
    } = {},
  ) {
    Object.keys(omnipartnersApiNames)
      .filter(api => !except || except.indexOf(api as any) < 0)
      .forEach(api => fn((this.apis as any)[api]));
  }
}

export default (config: IOmnipartnersConfig) => {
  return new Omnipartners(config);
};
