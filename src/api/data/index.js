
import Api from '../../lib/Api'
import { doc, filterInput } from '../../lib/apiDecorators'

export default class MetaData extends Api {
  _call (url, data, options = {}) {
    return this.get(url, data, {
      hashNoKey: true,
      hash: false,
      retry: true,
      ...options
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Language_list')
  @filterInput(['lang'])
  languages (data) {
    return this._call('/service/data/get-languages', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Animal_types_list')
  @filterInput(['lang'])
  animalTypes (data) {
    return this._call('/service/data/get-animal-types', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Animal_breeds_list')
  @filterInput(['type', 'lang'])
  animalBreeds (data) {
    return this._call('/service/data/get-animal-breeds', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Animal_universes_list')
  @filterInput(['type', 'lang'])
  animalUniverses (data) {
    return this._call('/service/data/get-animal-universes', data)
  }
}
