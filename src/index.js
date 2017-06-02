
import Identity from './api/identity'
import Partners from './api/partners'
import Data from './api/data'

export class Omnipartners {
  constructor (config) {
    this.identify = new Identity(config.cis)
    this.partners = new Partners(config.partners)
    this.data = new Data(config.cis)
  }
}

export default config => {
  return new Omnipartners(config)
}
