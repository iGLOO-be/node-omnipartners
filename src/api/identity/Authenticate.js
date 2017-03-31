
import Api from '../../lib/Api'
import { doc } from '../../lib/apiDecorators'

const baseErrorMap = {
  3: 'User not found in the system.',
  4: 'User is found but not active in the system.'
}

export default class Authenticate extends Api {
  @doc('http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_Credentials')
  authenticate (data) {
    return this.get('/service/auth/credentials', data, {
      hashNoKey: true,
      errorMap: {
        ...baseErrorMap,
        5: 'Password is incorrect.',
        17: 'Password not found.',
        28: 'Password does not meet the required specifications.'
      }
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_GUID_ONLY')
  authenticateByGUID (data) {
    return this.get('/service/auth/user-guid', data, {
      errorMap: {
        ...baseErrorMap
      }
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Session_Tokens')
  authenticateBySessionToken (data) {
    return this.get('/service/auth/session-token', data, {
      errorMap: {
        ...baseErrorMap,
        5: 'Password is incorrect.'
      }
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Session_Tokens')
  authenticateByAccessToken (data) {
    return this.get('/service/auth/session-token', data, {
      errorMap: {
        ...baseErrorMap,
        5: 'Password is incorrect.',
        7: 'Token not found in the system.'
      }
    })
  }
}
