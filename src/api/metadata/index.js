
import Api from '../../lib/Api'
import { doc, filterInput } from '../../lib/apiDecorators'

export default class Metadata extends Api {
  defaultHost = 'http://metadata.omnipartners.be/'

  _call (action, data, options = {}) {
    return this.post('/', {
      action: action,
      ...data
    }, options)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Legal_Forms')
  @filterInput([
    'legal_form_codes',
    'lang',
    'indexed'
  ])
  getLegalForms (data) {
    return this._call('get-legal-forms', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Counties')
  @filterInput([
    'country',
    'lang',
    'indexed'
  ])
  getCounties (data) {
    return this._call('get-counties', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Address_Types')
  @filterInput([
    'lang',
    'indexed'
  ])
  getAddressTypes (data) {
    return this._call('get-address-types', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Member_Countries')
  @filterInput([
    'lang',
    'indexed'
  ])
  getMemberCountries (data) {
    return this._call('get-countries', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Communication_Preferences')
  @filterInput([
    'lang',
    'indexed'
  ])
  getCommunicationPreferences (data) {
    return this._call('get-communication-preferences', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Interests')
  @filterInput([
    'lang',
    'indexed'
  ])
  getInterests (data) {
    return this._call('get-interests', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_User_Titles')
  @filterInput([
    'lang',
    'indexed'
  ])
  getUserTitles (data) {
    return this._call('get-user-titles', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Member_Languages')
  @filterInput([
    'lang',
    'indexed'
  ])
  getMemberLanguages (data) {
    return this._call('get-languages', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Access_Rights')
  @filterInput([
    'lang',
    'indexed'
  ])
  getAccessRights (data) {
    return this._call('get-access-rights', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Subscriptions')
  @filterInput([
    'lang',
    'indexed'
  ])
  getSubscriptions (data) {
    return this._call('get-subscriptions', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Place_of_Purchase')
  @filterInput([
    'lang',
    'indexed'
  ])
  getPlaceOfPurchase (data) {
    return this._call('get-places-of-purchases', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Customer_Groups')
  @filterInput([
    'lang',
    'indexed'
  ])
  getCustomerGroups (data) {
    return this._call('get-customer-groups', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Customer_Groups')
  @filterInput([
    'lang',
    'indexed'
  ])
  getCustomerGroups (data) {
    return this._call('get-customer-groups', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Animal_Types')
  @filterInput([
    'lang',
    'indexed'
  ])
  getCustomerGroups (data) {
    return this._call('get-animal-types', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Animal_Types')
  @filterInput([
    'lang',
    'indexed',
  ])
  getAnimalTypes (data) {
    return this._call('get-animal-types', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Animal_Breeds')
  @filterInput([
    'lang',
    'type',
    'indexed',
    'search',
    'order'
  ])
  getAnimalBreeds (data) {
    return this._call('get-animal-breeds', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Animal_Deletion_Causes')
  @filterInput([
    'lang',
    'indexed',
  ])
  getAnimalDeletionCauses (data) {
    return this._call('get-deletion-causes', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Animal_Lifestyles')
  @filterInput([
    'type',
    'lang',
    'indexed',
  ])
  getAnimalLifestyles (data) {
    return this._call('get-animal-lifestyles', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Agenda_Categories')
  @filterInput([
    'lang',
    'indexed',
  ])
  getAgendaCategories (data) {
    return this._call('get-agenda-categories', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Animal_Universe')
  @filterInput([
    'lang',
    'indexed',
  ])
  getAnimalUniverse (data) {
    return this._call('get-animal-universes', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Animal_Pathologies')
  @filterInput([
    'lang',
    'indexed',
  ])
  getAnimalPathologies (data) {
    return this._call('get-animal-pathologies', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Animal_Stages')
  @filterInput([
    'lang',
    'indexed',
  ])
  getAnimalStages (data) {
    return this._call('get-animal-universes-stages', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Diagnostic_Codes')
  @filterInput([
    'lang',
    'type',
    'search',
    'page',
    'record_per-page'
  ])
  getDiagnosticCodes (data) {
    return this._call('get-diagnostic-codes', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Animal_BCS')
  @filterInput([
    'lang',
    'species',
    'universe'
  ])
  getAnimalBCS (data) {
    return this._call('get-animal-bcs', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Partner_Types_List')
  @filterInput([
    'lang',
    'indexed'
  ])
  getPartnerTypesList (data) {
    return this._call('get-partner-types', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Product_Ranges')
  @filterInput([
    'lang',
    'indexed'
  ])
  getProductRanges (data) {
    return this._call('get-product-ranges', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Product_Brands')
  @filterInput([
    'lang',
    'indexed'
  ])
  getProductBrands (data) {
    return this._call('get-product-brands', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Product_Families')
  @filterInput([
    'lang',
    'indexed'
  ])
  getProductFamilies (data) {
    return this._call('get-product-families', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Collection_Relation_Types_List')
  @filterInput([
    'lang',
    'indexed'
  ])
  getCollectionRelationTypesList (data) {
    return this._call('get-collection-relation-types', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Loyalty_Program_Types')
  @filterInput([
    'lang',
    'indexed'
  ])
  getLoyaltyProgramTypes (data) {
    return this._call('get-loyalty-program-types', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Get_loyalty_Programs')
  @filterInput([
    'lang',
    'indexed'
  ])
  getLoyaltyProgram (data) {
    return this._call('get-loyalty-programs', data)
  }
}
