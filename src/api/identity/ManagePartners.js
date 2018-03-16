
import Api from '../../lib/Api'
import { doc, filterInput } from '../../lib/apiDecorators'

export default class ManagePartners extends Api {
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
