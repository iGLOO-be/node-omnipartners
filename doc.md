## Identity
### api.identity.deleteUser
- [Documentation](http://doc.omnipartners.be/index.php/Delete_User_Accounts)
- Snippet:
```js
const result = await api.identity.deleteUser({ owner_guid })
```

### api.identity.updateRecoveredPassword
- [Documentation](http://doc.omnipartners.be/index.php/Update_Password)
- Snippet:
```js
const result = await api.identity.updateRecoveredPassword({ token, password })
```

### api.identity.getAccessToken
- [Documentation](http://doc.omnipartners.be/index.php/Create_Access_Token)
- Snippet:
```js
const result = await api.identity.getAccessToken({ session_token, ttl })
```

### api.identity.deleteAccessToken
- [Documentation](http://doc.omnipartners.be/index.php/Delete_Access_Token)
- Snippet:
```js
const result = await api.identity.deleteAccessToken({ token })
```

### api.identity.findAccountByPhone
- [Documentation](http://doc.omnipartners.be/index.php/Find_account_GUID_by_mobile_phone_(strict))
- Snippet:
```js
const result = await api.identity.findAccountByPhone({ mobile_no, include_loyalty_cards })
```

### api.identity.findAccountByEmail
- [Documentation](http://doc.omnipartners.be/index.php/Find_account_GUID_by_email_(strict))
- Snippet:
```js
const result = await api.identity.findAccountByEmail({ email, include_user_type })
```

### api.identity.recoverPassword
- [Documentation](http://doc.omnipartners.be/index.php/Recover_by_email_or_user_id)
- Snippet:
```js
const result = await api.identity.recoverPassword({ uid, mode, url })
```

### api.identity.recoverPasswordSMS
- [Documentation](http://doc.omnipartners.be/index.php/Recover_by_mobile_phone)
- Snippet:
```js
const result = await api.identity.recoverPasswordSMS({ mobile, message })
```

### api.identity.register
- [Documentation](http://doc.omnipartners.be/index.php/Create_User_Accounts)
- Snippet:
```js
const result = await api.identity.register({  })
```

### api.identity.update
- [Documentation](http://doc.omnipartners.be/index.php/Edit_User_Accounts)
- Snippet:
```js
const result = await api.identity.update({  })
```

### api.identity.getUserList
- [Documentation](http://doc.omnipartners.be/index.php/Retrieve_Users_List)
- Snippet:
```js
const result = await api.identity.getUserList({ first_name, last_name, email, postcode, mobile, partner_ext_id, partner_relationship, page, records_per_page })
```

## Identity > Authenticate
### api.identity.authenticate
- [Documentation](http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_Credentials)
- Snippet:
```js
const result = await api.identity.authenticate({ identifier, password, data_options })
```

### api.identity.authenticateByGUID
- [Documentation](http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_GUID_ONLY)
- Snippet:
```js
const result = await api.identity.authenticateByGUID({ user_guid, data_options })
```

### api.identity.authenticateBySessionToken
- [Documentation](http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Session_Tokens)
- Snippet:
```js
const result = await api.identity.authenticateBySessionToken({ session_token, data_options })
```

### api.identity.authenticateByAccessToken
- [Documentation](http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Access_Tokens)
- Snippet:
```js
const result = await api.identity.authenticateByAccessToken({ access_token, data_options })
```

### api.identity.authenticateByEmail
- [Documentation](http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Email_ONLY_Service)
- Snippet:
```js
const result = await api.identity.authenticateByEmail({ email, data_options })
```

