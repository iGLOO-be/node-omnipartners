import Api from "../../lib/Api";
import { apiExtends, doc, filterInput } from "../../lib/apiDecorators";
import AuthenticateApi from "./Authenticate";
import ManagePetsApi from "./ManagePets";
import ManagePartners from "./ManagePartners";

@apiExtends(AuthenticateApi)
@apiExtends(ManagePetsApi)
@apiExtends(ManagePartners)
export default class Identity extends Api {
  @doc("http://doc.omnipartners.be/index.php/Delete_User_Accounts")
  @filterInput(["owner_guid"])
  deleteUser(data) {
    return this.get("/service/account/delete", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Update_Password")
  @filterInput(["token", "password"])
  updateRecoveredPassword(data) {
    return this.get("/service/account/create-password", data, {
      hashKeys: ["password"],
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        4: { message: "User is found but not active in the system." },
        6: { message: "Not authorised to use this function or its disabled." },
        8: { message: "Internal error." },
        16: { message: "Invalid hash." },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Create_Access_Token")
  @filterInput(["session_token", "ttl"])
  getAccessToken(data) {
    return this.get("/service/access-tokens/get-token", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Delete_Access_Token")
  @filterInput(["token"])
  deleteAccessToken(data) {
    return this.get("/service/access-tokens/delete-token", data);
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Find_account_GUID_by_mobile_phone_(strict)",
  )
  @filterInput(["mobile_no", "include_loyalty_cards"])
  findAccountByPhone(data) {
    return this.get("/service/user/resolve-by-mobile-number", data, {
      retry: true,
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Find_account_GUID_by_email_(strict)",
  )
  @filterInput(["email", "include_user_type"])
  findAccountByEmail(data) {
    return this.get("/service/user/resolve-by-email", data, {
      retry: true,
      hashKeys: ["email"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Find_account_GUID_by_public_token")
  @filterInput(["token"])
  findAccountByPublicToken(data) {
    return this.get("/service/user/resolve-by-public-token", data, {
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Recover_by_email_or_user_id")
  @filterInput(["uid", "mode", "url"])
  recoverPassword(data) {
    return this.get("/service/account/recover-password", data, {
      hashKeys: ["uid"],
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        4: { message: "User is found but not active in the system." },
        6: { message: "Not authorised to use this function or its disabled." },
        8: { message: "Internal error." },
        16: { message: "Invalid hash." },
        27: {
          message:
            "Password could not be auto generated because of validation constraints.",
        },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Recover_by_mobile_phone")
  @filterInput(["mobile", "message"])
  recoverPasswordSMS(data) {
    return this.get("/service/account/recover-password-sms", data, {
      hashKeys: ["mobile"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Create_User_Accounts")
  register(data) {
    return this.get("/service/user/register", data, {
      hashKeys: [
        data.user_email ? "user_email" : "user_mobile_phone",
        "user_password",
      ],
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        6: { message: "Not authorised to use this function or its disabled." },
        8: { message: "Error saving data to the database." },
        9: { message: "Pet information required but not specified." },
        16: { message: "Invalid hash." },
        18: { message: "Email address already exists in the system." },
        23: { message: "Duplicate request." },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Edit_User_Accounts")
  update(data) {
    return this.get("/service/user/update", data, {
      hashKeys: ["user_email"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Retrieve_Users_List")
  @filterInput([
    "first_name",
    "last_name",
    "email",
    "postcode",
    "mobile",
    "partner_ext_id",
    "partner_relationship",
    "page",
    "records_per_page",
  ])
  getUserList(data) {
    return this.get("/service/profile/get-user-lis", data, { retry: true });
  }

  @doc("http://doc.omnipartners.be/index.php/Retrieve_user_preferences")
  @filterInput(["user_guid"])
  retrieveUserSubscriptions(data) {
    return this.get("/service/preferences/get", data, {
      hashKeys: ["user_guid"],
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        6: { message: "Not authorised to use this function or it's disabled." },
        8: { message: "Error saving data to the database." },
        16: { message: "Invalid hash." },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Update_user_preferences")
  @filterInput(["user_guid", "com_prefs", "interests", "subscriptions"])
  updateSubscriptions(data) {
    return this.get("/service/preferences/update", data, {
      hashKeys: ["user_guid"],
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        6: { message: "Not authorised to use this function or its disabled." },
        8: { message: "Error saving data to the database." },
        16: { message: "Invalid hash." },
        36: { message: "User in blacklist." },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/List_User_Addresses")
  @filterInput(["user_guid"])
  listUserAddress(data) {
    return this.post("/service/user-address/list", data, {
      hashNoKey: true,
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Add_User_Address")
  @filterInput([
    "user_guid", // (Required)
    "address_type",
    "address_name",
    "address_company",
    "address_phone",
    "address_streetnum",
    "address_street1",
    "address_street2",
    "address_postal_code", // (Required)
    "address_city", // (Required)
    "address_region",
    "address_county",
    "address_country",
    "address_comment",
    "address_is_default",
    "address_lat",
    "address_lng",
  ])
  registerUserAddress(data) {
    return this.post("/service/user-address/add", data, {
      hashKeys: ["user_guid"],
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        8: { message: "Internal error." },
        16: { message: "Invalid hash." },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Update_User_Address")
  @filterInput([
    "user_guid", // (Required)
    "address_type",
    "address_name",
    "address_company",
    "address_phone",
    "address_streetnum",
    "address_street1",
    "address_street2",
    "address_postal_code", // (Required)
    "address_city", // (Required)
    "address_region",
    "address_county",
    "address_country",
    "address_comment",
    "address_is_default",
    "address_lat",
    "address_lng",
  ])
  updateUserAddress(data) {
    return this.post("/service/user-address/update", data, {
      hashKeys: ["user_guid"],
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        8: { message: "Internal error." },
        16: { message: "Invalid hash." },
        22: {
          message:
            'Update restricted, if it is the only address and trying to update it as "not default".',
        },
        26: { message: "Address not found in the system." },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Delete_User_Address")
  @filterInput(["user_guid", "address_id"])
  deleteUserAddress(data) {
    return this.post("/service/user-address/delete", data, {
      hashKeys: ["user_guid"],
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        8: { message: "Internal error." },
        16: { message: "Invalid hash." },
        22: { message: "Delete restricted if address is the default address." },
        26: { message: "Address not found in the system." },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Confirm_Legal_Form")
  @filterInput([
    "legal_form_code",
    "user_guid",
    "confirmed_place",
    "send_notification",
    "signature",
  ])
  confirmLegalForm(data) {
    return this.post("/service/legal-form/confirm-legal-form", data, {
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "Specified user not found." },
        6: { message: "Not authorised to use this function or its disabled." },
        8: { message: "	Error saving data to the database." },
        16: { message: "Invalid hash." },
        39: { message: "Error in File upload." },
        40: { message: "Legal form is already confirmed." },
        41: { message: "Invalid File." },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Confirmed_Legal_Forms")
  @filterInput(["user_guid"])
  getConfirmedLegalForm(data) {
    return this.post("/service/legal-form/get-confirmed-legal-forms", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Revoke_Legal_Form")
  @filterInput(["legal_form_code", "user_guid", "send_notification"])
  revokeLegalForm(data) {
    return this.post("/service/legal-form/revoke-legal-form", data, {
      errorMap: {
        26: { message: "Legal code not found." },
      },
    });
  }
}
