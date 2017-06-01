
import Api from '../../lib/Api'
import { doc, filterInput } from '../../lib/apiDecorators'

export default class Authenticate extends Api {
  @doc('http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_Credentials')
  @filterInput(['identifier', 'password', 'data_options'])
  authenticate (data) {
    return this.get('/service/auth/credentials', data, {
      hashNoKey: true,
      retry: true
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_GUID_ONLY')
  @filterInput(['user_guid', 'data_options'])
  authenticateByGUID (data) {
    return this.get('/service/auth/user-guid', data, { retry: true })
  }

  @doc('http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Session_Tokens')
  @filterInput(['session_token', 'data_options'])
  authenticateBySessionToken (data) {
    return this.get('/service/auth/session-token', data, { retry: true })
  }

  @doc('http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Access_Tokens')
  @filterInput(['access_token', 'data_options'])
  authenticateByAccessToken (data) {
    return this.get('/service/auth/session-token', data, { retry: true })
  }

  @doc('http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Email_ONLY_Service')
  @filterInput(['email', 'data_options'])
  authenticateByEmail (data) {
    return this.get('/service/auth/email', data, { retry: true })
  }
}
