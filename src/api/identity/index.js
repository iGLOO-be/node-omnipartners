
import Api from '../../lib/Api'

export default class identity extends Api {
  // @doc('http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_Credentials')
  authenticate (data) {
    return this.get('/service/auth/credentials', data, {
      hashNoKey: true
    })
  }

  // @doc('http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_GUID_ONLY')
  authenticateByGUID (data) {
    return this.post('/service/auth/user-guid', data)
  }
}
