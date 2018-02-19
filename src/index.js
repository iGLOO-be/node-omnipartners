
import createLogger from './lib/logger'

import Identity from './api/identity'
import Partners from './api/partners'
import Data from './api/data'

export {
  createLogger
}

export class Omnipartners {
  constructor (config) {
    this.identify = new Identity(config.cis)
    this.partners = new Partners(config.partners)
    this.data = new Data(config.cis)
    this._apis = [
      this.identify,
      this.partners,
      this.data
    ]
  }

  use (fn) {
    this._apis.forEach(fn)
  }
}

export default config => {
  return new Omnipartners(config)
}
