
import Identity from './api/identity'
import Partners from './api/partners'

export class Omnipartners {
  constructor (config) {
    this.identify = new Identity(config)
    this.partners = new Partners(config.partners)
  }
}

export default config => {
  return new Omnipartners(config)
}
