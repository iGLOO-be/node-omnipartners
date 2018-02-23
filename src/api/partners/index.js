
import Api from '../../lib/Api'
import { doc, filterInput } from '../../lib/apiDecorators'

export default class Partners extends Api {
  defaultHost = 'http://partners.omnipartners.be/'

  errorMap = {
    1000: { message: 'Action not available.' },
    1001: { message: 'Invalid action.' },
    1002: { message: 'Client key not available.' },
    1003: { message: 'Invalid client key.' },
    1004: { message: 'Hash not available.' },
    1005: { message: 'Invalid hash.' },
    1006: { message: 'Access denied.' },
    1007: { message: 'Invalid request. This code is returned upon data validation failure.' },
    1008: { message: 'Missing required fields' },
    1025: { message: 'Internal Error' },
    1036: { message: 'Service input data is Invalid.' }
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

  @doc('http://doc.omnipartners.be/index.php/List_Partners')
  @filterInput([
    'partner_type',           // (Optional) The “Partner Type” used to filter and retrieve partners information relative to the types. Eg: "shops,vets,suppliers" .
    'partner_group_handle',   // (Optional) The “Partner Group Handle” used to filter the partners with that partner group handle's. Eg: "handle_1,handle_2" .
    'collection_ref',         // (Optional) Collection reference to which the stock level is associated. Required if "stock_level" is provided.
    'stock_level',            // (Optional) Stock level which is a value between 0 and 10. The comparison will be done as ">= stock_level". Required if "collection_ref" is provided.
    'search_term',            // (Optional) The “Search Term” used to filter and retrieve partners information relative to the searched term text. It will check that term exists in partner invoice name, partner public name, email or partner VAT information.
    'search_strict',          // (Optional) Defines the behavior of the “Search Term”. Valid values are 0 and 1. If the value is 0 partial matches will appear in the result. If the value is 1 search term will be matched exactly. Default value is 0.
    'partner_status',         // (Optional) The “Partner Status” used to filter the partners with that partner status. Valid Status are A and I ( A: active partners I: inactive partners ) If not send this parameter then service will return active partners only. If this parameter is with empty string (Eg: partner_status:"" ) then it will return all active and inactive partners information.
    'partner_updated_date',   // (Optional) This is to list all partners that have been updated on or after the date specified. It should be valid date with this format.
                              // (Eg: partner_updated_date:"2014-06-05" OR  partner_updated_date:"2014-06-05 14:10" time should be in 24H format )
                              // When the partner_updated_date is empty string OR not send with request we return all records.
    'page',                   // (Optional) The “Page” used for pagination. Page number of the result. Its a number. The default value is 1.
    'rows',                   // (Optional) The “Rows” used for pagination. Number of records per page. Its a number. The default value is 10. The maximum value is 100.
    'show_hidden'             // (Optional) States whether to include the hidden partners in the result. (Valid Values: 0 OR 1) default 0
  ])
  listPartners (data) {
    return this._call('get-partners', data, { retry: true })
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Partners_Details')
  @filterInput([
    'partner_ext_id',   // (Required) The “Partner Ext Id” used to filter the partners using Partner Ext Id. If you need to filter the partners with multiple ext_ids, then its value should be comma separated.
    'indexed_result',   // (Optional) The “Indexed Result” used get result indexed with partner_ext_id. Possible values are TRUE/FALSE
    'lang',             // The language used to retrieve the translated contents.If not specified generic values will be returned instead of translated contents.
    'data_options'      // This defines information that is returned in the profile object. It should be a comma separated list of values. For more information please refer Data Options.
  ])
  partnerDetails (data) {
    const options = {
      ...data,
      partner_ext_id: data.partner_ext_id ? data.partner_ext_id.toString() : null
    }
    if (data.data_options) {
      options.data_options = typeof data.data_options !== 'string'
        ? data.data_options.join(',')
        : data.data_options
    }
    return this._call('get-partner-details', options, {
      hashKeys: ['action', 'partner_ext_id'],
      retry: true
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Get_Featured_Activities')
  @filterInput([
    'lang'  // (Optional) The language used to return the translated contents
  ])
  featuredActivities (data) {
    return this._call('get-featured-activities', {
      ...data,
      partner_ext_id: data.partner_ext_id ? data.partner_ext_id.toString() : null
    }, { retry: true })
  }

  @doc('http://doc.omnipartners.be/index.php/Retrieve_Links')
  @filterInput([
    'partner_ext_id', // (Required) The ext id of the partner.
    'type'            // (Optional) Links have a type (photo, video) to start with. If set then gives relative type of records only.
  ])
  getLinks (data) {
    return this._call('get-partner-links', {
      ...data,
      partner_ext_id: data.partner_ext_id ? data.partner_ext_id.toString() : null
    }, {
      hashKeys: ['action', 'partner_ext_id'],
      retry: true,
      errorMap: {
        1032: { message: 'Partner_ext_id not found.' }
      }
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Add_Link')
  @filterInput([
    'partner_ext_id', // (Required) The ext id of the partner.
    'type',           // (Required) Links have a type (photo, video) to start with. If set then gives relative type of records only.
    'link_data'       // (Required) json enccoded array data, it fill with languge code and its link data
  ])
  addLink (data) {
    return this._call('add-partner-links', {
      ...data,
      partner_ext_id: data.partner_ext_id ? data.partner_ext_id.toString() : null
    }, {
      hashKeys: ['action', 'partner_ext_id', 'type'],
      retry: true
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Get_partners_-_account_relations')
  @filterInput([
    'user_guid',                 // (Required) The GUID of the user.
    'partner_relationship',      // (Optional) The relationship between the partner and the account. Valid values are “clientof” and “partof”.
    'partner_relationship_role', // (Optional) The role of the relationship.
    'show_not_accepted',         // (Optional) Sates whether to include the relationships that are not in accepted state. Valid values are 1 and 0. Default values is 0.
    'data_options',              // (Optional) This defines information that is returned in the partner profiles for the related partners. For more information please refer Partner Data Options.
    'page',                      // (Optional) The page number to be retrieved.
    'records_per_page'           // (Optional) The number of records per page. Minimum value is 1 and maximum is 100.
  ])
  getPartnerAccountRelations (data) {
    return this.post('/service/user/get-partners/', data, {
      retry: true,
      errorMap: {
        2: { message: 'Invalid request in which required header or parameters are either missing or invalid.' },
        3: { message: 'User not found in the system.' },
        4: { message: 'User not active in the system.' },
        6: { message: 'Not authorized to use this function or its disabled.' },
        8: { message: 'Internal error.' },
        16: { message: 'Invalid hash.' }
      }
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Add_new_partner_-_account_relation')
  @filterInput([
    'user_guid',            // (Required) The GUID of the user.
    'partner_ext_id',       // (Required) The external id of the partner.
    'partner_relationship', // (Required) The relationship between the partner and the account. Valid values are “clientof” and “partof”.
    'partner_roles',        // (Optional) The roles assigned to this relationship. If empty the default roles configured for this instance of CIS will be automatically assigned.
    'partner_status',       // (Required) The status of the relationship between the partner and user. Valid status values are submitted, accepted, pending and refused.
    'notify'                // Flag used to determine if the preset notification email has to be sent to the user. If the value is "1" then the email is sent.
  ])
  createPartnerAccountRelation (data) {
    return this.post('/service/partners/add/', data, {
      hashKeys: ['user_guid', 'partner_ext_id', 'partner_relationship', 'partner_status'],
      errorMap: {
        2: { message: 'Invalid request in which required header or parameters are either missing or invalid.' },
        3: { message: 'User not found in the system.' },
        6: { message: 'Not authorised to use this function or its disabled.' },
        8: { message: 'Internal error.' },
        16: { message: 'Invalid hash.' },
        19: { message: 'Partner not found.' }
      }
    })
  }
}
