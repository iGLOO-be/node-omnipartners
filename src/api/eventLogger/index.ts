
import Api from '../../lib/Api'
import { doc, filterInput } from '../../lib/apiDecorators'

export default class EventLogger extends Api {
  defaultHost = 'https://events.clixray.io/'
  responseAsJson = false

  errorMap = {
    1000: { message: 'Unknown Error' },
    1001: { message: 'Empty Request – if the request body contains no data.' },
    1002: { message: 'Error when parsing the json object. Can occur for malformed JSON string.' },
    1003: { message: 'Does not contain eve_source parameter or empty object.' },
    1004: { message: 'Does not contain required data.' },
    1005: { message: 'Incorrect hash value.' },
    1006: { message: 'Not authorized – requested key not allow to use event logger.' },
    1007: { message: 'Data insert fails due to sql or some other error in DB connection.' },
    1008: { message: 'Internal error.' },
    1009: { message: 'Invalid data format.' }
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

  @doc('http://doc.omnipartners.be/index.php/Log_Events')
  @filterInput([
    'user_guid',           // (Required) The ACCOUNT id of the user.
    'event_source',        // (Required) The source system on which the event is generated.
    'event_name',          // (Required) text string used to describe the event that took place (e.g. redeem coupon, login, register).
    'event_ts',            // (Required) Unix timestamp of the event (UTC time zone).
    'clixray_instance_id', // (Required) The id used for each specific client (e.g. RC_UK, RC_BE). This value is given by the administrator.
    'partner_ext_id',
    'partner_type',
    'event_category',
    'event_lon',
    'event_lat',
    'ip',
    'custom_fields'
  ])
  logEvents ({ custom_fields = {}, ...data }) {
    return this.post('/tracker', { ...data, ...custom_fields }, {
      hashKeys: ['clixray_instance_id', 'event_source', 'event_name', 'event_ts'],
      errorMap: {
        1003: { message: 'Does not contain eve_source parameter or empty object.' },
        1004: { message: 'Does not contain required data.(Mainly cust_id).' },
        1005: { message: 'Incorrect hash value.' }
      }
    })
  }
}
