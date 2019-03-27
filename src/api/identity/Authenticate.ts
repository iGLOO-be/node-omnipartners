import Api from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";

export default class Authenticate extends Api {
  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_Credentials",
  )
  @filterInput([
    "identifier",
    "password",
    "data_options",
    "partner_data_options",
  ])
  public authenticate(data: {
    identifier: string;
    password: string;
    data_options: string;
    partner_data_options: string;
  }) {
    return this.get("/service/auth/credentials", data, {
      hashKeys: ["identifier", "password"],
      hashNoKey: true,
      retry: true,
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_GUID_ONLY",
  )
  @filterInput(["user_guid", "data_options"])
  public authenticateByGUID(data: { user_guid: string; data_options: string }) {
    return this.get("/service/auth/user-guid", data, { retry: true });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Session_Tokens",
  )
  @filterInput(["session_token", "data_options"])
  public authenticateBySessionToken(data: {
    session_token: string;
    data_options: string;
  }) {
    return this.get("/service/auth/session-token", data, { retry: true });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Access_Tokens",
  )
  @filterInput([
    "access_token",
    "data_options",
    "partner_data_options",
    "related_partners_filter_xxxx",
  ])
  public authenticateByAccessToken(data: {
    access_token: string;
    data_options: string;
    partner_data_options: string;
    related_partners_filter_xxxx: string;
  }) {
    return this.get("/service/auth/access-token", data, { retry: true });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Email_ONLY_Service",
  )
  @filterInput(["email", "data_options"])
  public authenticateByEmail(data: { email: string; data_options: string }) {
    return this.get("/service/auth/email", data, {
      hashKeys: ["email"],
      retry: true,
    });
  }
}
