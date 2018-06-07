
import createLogger from './lib/logger'

import Identity from './api/identity'
import Partners from './api/partners'
import Products from './api/products'
import Deals from './api/deals'
import Data from './api/data'
import Metadata from './api/metadata'
import EventLogger from './api/eventLogger'

export {
  createLogger
}

export class Omnipartners {
  constructor (config) {
    this.identify = new Identity(config.cis)
    this.partners = new Partners(config.partners)
    this.data = new Data(config.cis)
    this.products = new Products(config.products)
    this.deals = new Deals(config.deals)
    this.metadata = new Metadata(config.metadata)
    this.eventLogger = new EventLogger(config.eventLogger)
    this._apis = [
      this.identify,
      this.partners,
      this.products,
      this.deals,
      this.data,
      this.metadata,
      this.eventLogger
    ]
  }

  use (fn) {
    this._apis.forEach(fn)
  }
}

export default config => {
  return new Omnipartners(config)
}
