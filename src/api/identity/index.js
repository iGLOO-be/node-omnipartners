
import Api from '../../lib/Api'
import { apiExtends, doc, filterInput } from '../../lib/apiDecorators'
import AuthenticateApi from './Authenticate'

@apiExtends(AuthenticateApi)
export default class Identity extends Api {
  @doc('http://doc.omnipartners.be/index.php/Delete_User_Accounts')
  @filterInput(['owner_guid'])
  deleteUser (data) {
    return this.get('/service/account/delete', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Update_Password')
  @filterInput(['token', 'password'])
  updateRecoveredPassword (data) {
    return this.get('/service/account/create-password', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Create_Access_Token')
  @filterInput(['session_token', 'ttl'])
  getAccessToken (data) {
    return this.get('/service/access-tokens/get-token', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Delete_Access_Token')
  @filterInput(['token'])
  deleteAccessToken (data) {
    return this.get('/service/access-tokens/delete-token', data)
  }

  @doc('http://doc.omnipartners.be/index.php/Find_account_GUID_by_mobile_phone_(strict)')
  @filterInput(['mobile_no', 'include_loyalty_cards'])
  findAccountByPhone (data) {
    return this.get('/service/user/resolve-by-mobile-number', data, { retry: true })
  }

  @doc('http://doc.omnipartners.be/index.php/Find_account_GUID_by_email_(strict)')
  @filterInput(['email', 'include_user_type'])
  findAccountByEmail (data) {
    return this.get('/service/user/resolve-by-email', data, { retry: true })
  }

  @doc('http://doc.omnipartners.be/index.php/Recover_by_email_or_user_id')
  @filterInput(['uid', 'mode', 'url'])
  recoverPassword (data) {
    return this.get('/service/account/recover-password', data, {
      hashKeys: ['uid']
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Recover_by_mobile_phone')
  @filterInput(['mobile', 'message'])
  recoverPasswordSMS (data) {
    return this.get('/service/account/recover-password-sms', data, {
      hashKeys: ['mobile']
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Create_User_Accounts')
  register (data) {
    return this.get('/service/user/register', data, {
      hashKeys: [
        data.user_email ? 'user_email' : 'user_mobile_phone',
        'user_password'
      ]
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Edit_User_Accounts')
  update (data) {
    return this.get('/service/user/update', data, {
      hashKeys: ['user_email']
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Retrieve_Users_List')
  @filterInput(['first_name', 'last_name', 'email', 'postcode', 'mobile', 'partner_ext_id', 'partner_relationship', 'page', 'records_per_page'])
  getUserList (data) {
    return this.get('/service/profile/get-user-lis', data, { retry: true })
  }
}
