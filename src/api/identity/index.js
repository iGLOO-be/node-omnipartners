
import Api from '../../lib/Api'
import { apiExtends } from '../../lib/apiDecorators'
import AuthenticateApi from './Authenticate'

@apiExtends(AuthenticateApi)
export default class identity extends Api {}
