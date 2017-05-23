
import Identity from './api/identity'

export default class Omnipartners {
  constructor (config) {
    this.identify = new Identity(config)
  }
}
