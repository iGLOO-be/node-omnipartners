
import Identity from './api/identity'

export default class Omnipartners {
  constructor () {
    this.identify = new Identity(this)
  }
}
