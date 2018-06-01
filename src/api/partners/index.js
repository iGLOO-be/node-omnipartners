
import Api from '../../lib/Api'
import { doc, filterInput } from '../../lib/apiDecorators'

export default class Partners extends Api {
  defaultHost = 'https://partners.clixray.io/'

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

  @doc('http://doc.omnipartners.be/index.php/Find_Partners')
  @filterInput([
    'partner_lat',
    'partner_lng',
    'indexed_result',
    'partner_type',
    'partner_group_handle',
    'collection_ref',
    'stock_level',
    'search_term',
    'radius',
    'limit',
    'show_hidden',
    'add_cis_guid',
    'partner_status'
  ])
  findPartners (data) {
    return this._call('find-partners', data, {
      hashKeys: ['action', 'partner_lat', 'partner_lng'],
      retry: true,
      errorMap: {
        1008: { message: 'Missing required fields' },
        1030: { message: 'Invalid partner group handle.' },
        1031: { message: 'Invalid partner type.' }
      }
    })
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

  @doc('http://doc.omnipartners.be/index.php/Update_Partner')
  @filterInput([
    'partner_ext_id',
    'partner_inv_name',
    'partner_inv_street1',
    'partner_inv_street2',
    'partner_inv_streetnum',
    'partner_inv_postal_code',
    'partner_inv_city',
    'partner_inv_region',
    'partner_inv_country',
    'partner_pub_name',
    'partner_pub_street1',
    'partner_pub_street2',
    'partner_pub_streetnum',
    'partner_pub_postal_code',
    'partner_pub_city',
    'partner_pub_region',
    'partner_pub_country',
    'partner_email',
    'partner_emergency',
    'partner_phone',
    'partner_fax',
    'partner_website',
    'partner_facebook',
    'partner_twitter',
    'partner_vat',
    'partner_type',
    'partner_subtype',
    'partner_prim_cnt_title',
    'partner_prim_cnt_first_name',
    'partner_prim_cnt_last_name',
    'partner_prim_cnt_email',
    'partner_prim_cnt_mobile',
    'partner_salesrep',
    'partner_sales_support',
    'partner_prim_cnt_language',
    'partner_short_description',
    'partner_short_description_translations',
    'partner_eshop_url',
    'partner_lat',
    'partner_lng',
    'partner_status',
    'partner_is_hidden',
    'partner_timezone',
    'partner_self_id',
    'partner_self_prefix',
    'partner_deals_redirection_url',
    'partner_referral_code',
  ])
  updatePartner (data) {
    return this._call('update-partner', data, {
      hashKeys: ['action', 'partner_ext_id']
    })
  }
}
