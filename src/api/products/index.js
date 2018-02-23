
import Api from '../../lib/Api'
import { doc, filterInput } from '../../lib/apiDecorators'

export default class Products extends Api {
  defaultHost = 'http://products.omnipartners.be/'

  errorMap = {
    1000: { message: 'Action not available.' },
    1001: { message: 'Invalid action.' },
    1002: { message: 'Client key not available.' },
    1003: { message: 'Invalid client key.' },
    1004: { message: 'Hash not available.' },
    1005: { message: 'Invalid hash.' },
    1006: { message: 'Access denied.' },
    1021: { message: 'Internal error.' },
    1023: { message: 'Invalid Request.' },
    1030: { message: 'Missing required fields.' }
  }

  _call (action, data, options = {}) {
    return this.post('/', {
      action: action,
      ...data
    }, {
      hashKeys: ['action'],
      ...options
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Product_By_EAN_or_Code')
  @filterInput(['product_ean', 'product_code'])
  getProduct (data) {
    return this._call('get-product', data, {
      retry: true,
      errorMap: {
        1020: { message: 'Product ean or code required.' }
      }
    })
  }
}
