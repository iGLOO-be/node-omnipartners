
import Api from '../../lib/Api'
import { doc, filterInput } from '../../lib/apiDecorators'

export default class EventLogger extends Api {
  defaultHost = 'http://cloudlogger.omnipartners.be/'

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
    'uid',          // (Required) The ACCOUNT id of the user.
    'eve_source',   // (Required) The source system on which the event is generated.
    'event',        // (Required) text string used to describe the event that took place (e.g. redeem coupon, login, register).
    'timestamp',    // (Required) Unix timestamp of the event (UTC time zone).
    'cust_id',      // (Required) The id used for each specific client (e.g. RC_UK, RC_BE). This value is given by the administrator.
    'network',      // (Optinal) Customer id of the partner where the event took place.
    'network_type', // (Optinal) Type of partner where the event too place (e.g. vets, shops, breeders).
    'category',     // (Optinal) Set of custom values describing the event (see below). Formatted as json array.
    'lon',          // (Optinal) longitude of the location. Should be floating pint value (eg, 79.86124)
    'lat',          // (Optinal) latitude of the location. Should be floating pint value (eg, 6.92708)
    'ip'            // (Optinal) Ip address of the user, (eg, 54.23.20.167)
  ])
  pokePartner (data) {
    return this.post('/tracker', data, {
      hashKeys: ['cust_id', 'eve_source', 'event', 'timestamp']
    })
  }
}
