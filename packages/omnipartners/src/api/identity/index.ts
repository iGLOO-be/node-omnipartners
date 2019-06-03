import querystring from "querystring";
import Api from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";
import {
  IPartnerAccountRelationCreateInput,
  IPartnerAccountRelationDeleteInput,
  IPartnerDataOptions,
  IRegisterUserAddressInput,
  IRegisterUserInput,
  IUpdateUserAddressInput,
  IUpdateUserInput,
  IUser,
  IUserAddress,
  IUserConfirmLegalFormsInput,
  IUserDataOptions,
  IUserLegalFormsItems,
  IUserOwner,
  IUserPartial,
  IUserPartnerRelation,
  IUserPet,
  IUserPetCreateInput,
  IUserPetUpdateInput,
  IUserPreferences,
  IUserUpdateSubscriptionsInput,
  IUsetPetDataOptions,
  IUsetPetWithOwner,
} from "../../types";

export default class Identity extends Api {
  @doc("http://doc.omnipartners.be/index.php/Delete_User_Accounts")
  @filterInput(["owner_guid"])
  public deleteUser(data: { owner_guid: string }) {
    return this.get("/service/account/delete", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Update_Password")
  @filterInput(["token", "password"])
  public updateRecoveredPassword(data: { token: string; password: string }) {
    return this.get("/service/account/create-password", data, {
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
      hashKeys: ["password"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Create_Access_Token")
  @filterInput(["session_token", "ttl"])
  public getAccessToken(data: {
    session_token: string;
    ttl: string;
  }): Promise<{
    statusCode: 0;
    data: { token: string };
  }> {
    return this.get("/service/access-tokens/get-token", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Delete_Access_Token")
  @filterInput(["token"])
  public deleteAccessToken(data: { token: string }) {
    return this.get("/service/access-tokens/delete-token", data);
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Find_account_GUID_by_mobile_phone_(strict)",
  )
  @filterInput(["mobile_no", "include_loyalty_cards"])
  public findAccountByPhone(data: {
    mobile_no: string;
    include_loyalty_cards?: boolean;
  }) {
    return this.get("/service/user/resolve-by-mobile-number", data, {
      retry: true,
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Find_account_GUID_by_email_(strict)",
  )
  @filterInput(["email", "include_user_type"])
  public findAccountByEmail(data: {
    email: string;
    include_user_type?: string;
  }): Promise<IUserPartial> {
    return this.get("/service/user/resolve-by-email", data, {
      hashKeys: ["email"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Find_account_GUID_by_public_token")
  @filterInput(["token"])
  public findAccountByPublicToken(data: { token: string }) {
    return this.get("/service/user/resolve-by-public-token", data, {
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Recover_by_email_or_user_id")
  @filterInput(["uid", "mode", "url"])
  public recoverPassword(data: { uid: string; mode?: string; url?: string }) {
    return this.get("/service/account/recover-password", data, {
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
        48: {
          message:
            "The email could not be sent because the email address has been marked as invalid by the email bounce management system.",
        },
      },
      hashKeys: ["uid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Recover_by_mobile_phone")
  @filterInput(["mobile", "message"])
  public recoverPasswordSMS(data: { mobile: string; message?: string }) {
    return this.get("/service/account/recover-password-sms", data, {
      hashKeys: ["mobile"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Create_User_Accounts")
  public register(data: IRegisterUserInput): Promise<{ data: IUser }> {
    return this.get("/service/user/register", data, {
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
      hashKeys: [
        data.user_email ? "user_email" : "user_mobile_phone",
        "user_password",
      ],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Edit_User_Accounts")
  public update(data: IUpdateUserInput): Promise<{ data: IUserOwner }> {
    return this.get("/service/user/update", data, {
      hashKeys: ["user_email", "user_guid"],
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
  public getUserList(data: {
    first_name: string;
    last_name: string;
    email: string;
    postcode: string;
    mobile: string;
    partner_ext_id: string;
    partner_relationship: string;
    page: number;
    records_per_page: number;
  }) {
    return this.get("/service/profile/get-user-lis", data, { retry: true });
  }

  @doc("http://doc.omnipartners.be/index.php/Retrieve_user_preferences")
  @filterInput(["user_guid"])
  public retrieveUserSubscriptions(data: {
    user_guid: string;
  }): Promise<{
    data: IUserPreferences;
  }> {
    return this.get("/service/preferences/get", data, {
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
      hashKeys: ["user_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Update_user_preferences")
  @filterInput(["user_guid", "com_prefs", "interests", "subscriptions"])
  public updateSubscriptions(data: IUserUpdateSubscriptionsInput) {
    return this.get("/service/preferences/update", data, {
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
      hashKeys: ["user_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/List_User_Addresses")
  @filterInput(["user_guid"])
  public listUserAddress(data: {
    user_guid: string;
  }): Promise<{ data: IUserAddress[] }> {
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
  public registerUserAddress(
    data: IRegisterUserAddressInput,
  ): Promise<{ data: IUserAddress }> {
    return this.post("/service/user-address/add", data, {
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        8: { message: "Internal error." },
        16: { message: "Invalid hash." },
      },
      hashKeys: ["user_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Update_User_Address")
  @filterInput([
    "user_guid", // (Required)
    "address_id",
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
  public updateUserAddress(
    data: IUpdateUserAddressInput,
  ): Promise<{ data: IUserAddress }> {
    return this.post("/service/user-address/update", data, {
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
      hashKeys: ["user_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Delete_User_Address")
  @filterInput(["user_guid", "address_id"])
  public deleteUserAddress(data: { user_guid: string; address_id: string }) {
    return this.post("/service/user-address/delete", data, {
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
      hashKeys: ["user_guid"],
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
  public confirmLegalForm(data: IUserConfirmLegalFormsInput) {
    return this.post("/service/legal-form/confirm-legal-form", data, {
      errorMap: {
        // Special case here:
        // { statusCode: false,
        //   errors:
        //    { legal_form_code:
        //       { invalidLegalFormCode: 'Invalid legal form code \'foo\' specified' } }
        [-1]: {
          message: "An error is occured.",
        },
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "Specified user not found." },
        6: { message: "Not authorised to use this function or its disabled." },
        8: { message: "Error saving data to the database." },
        16: { message: "Invalid hash." },
        39: { message: "Error in File upload." },
        40: { message: "Legal form is already confirmed." },
        41: { message: "Invalid File." },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Confirmed_Legal_Forms")
  @filterInput(["user_guid"])
  public getConfirmedLegalForm(data: { user_guid: string }):
    Promise<{ data: IUserLegalFormsItems[] }> {
    return this.post("/service/legal-form/get-confirmed-legal-forms", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Revoke_Legal_Form")
  @filterInput(["legal_form_code", "user_guid", "send_notification"])
  public revokeLegalForm(data: {
    legal_form_code: string;
    user_guid: string;
    send_notification: string;
  }) {
    return this.post("/service/legal-form/revoke-legal-form", data, {
      errorMap: {
        26: { message: "Legal code not found." },
      },
    });
  }

  /*
    Authenticate
  */

  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_Credentials",
  )
  @filterInput([
    "identifier",
    "password",
    "data_options",
    "partner_data_options",
  ])
  public async authenticate(data: {
    identifier: string;
    password: string;
    data_options?: IUserDataOptions;
    partner_data_options?: string;
  }): Promise<IUser> {
    const result = await this.get("/service/auth/credentials", data, {
      hashKeys: ["identifier", "password"],
      hashNoKey: true,
      retry: true,
    });
    return result;
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_User_GUID_ONLY",
  )
  @filterInput(["user_guid", "data_options"])
  public authenticateByGUID(data: {
    user_guid: string;
    data_options?: IUserDataOptions;
  }): Promise<IUser> {
    return this.get(
      "/service/auth/user-guid",
      {
        ...data,
        data_options: Array.isArray(data.data_options)
          ? data.data_options.join(",")
          : data.data_options,
      },
      { retry: true },
    );
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Session_Tokens",
  )
  @filterInput(["session_token", "data_options"])
  public authenticateBySessionToken(data: {
    session_token: string;
    data_options?: IUserDataOptions;
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
  public authenticateByAccessToken({
    data_options,
    ...data
  }: {
    access_token: string;
    data_options?: IUserDataOptions;
    partner_data_options?: string;
    related_partners_filter_xxxx?: string;
  }): Promise<IUser> {
    return this.get(
      "/service/auth/access-token",
      {
        ...data,
        data_options:
          data_options && Array.isArray(data_options)
            ? data_options.join(",")
            : data_options,
      },
      { retry: true },
    );
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Email_ONLY_Service",
  )
  @filterInput(["email", "data_options"])
  public authenticateByEmail(data: { email: string; data_options?: string }) {
    return this.get("/service/auth/email", data, {
      hashKeys: ["email"],
      retry: true,
    });
  }

  /*
    Manage partners
  */

  @doc("http://doc.omnipartners.be/index.php/Get_partners_-_account_relations")
  @filterInput([
    "user_guid", // (Required) The GUID of the user.
    "partner_relationship", // (Optional) The relationship between the partner and the account. Valid values are “clientof” and “partof”.
    "partner_relationship_role", // (Optional) The role of the relationship.
    "show_not_accepted", // (Optional) Sates whether to include the relationships that are not in accepted state. Valid values are 1 and 0. Default values is 0.
    "data_options", // (Optional) This defines information that is returned in the partner profiles for the related partners. For more information please refer Partner Data Options.
    "page", // (Optional) The page number to be retrieved.
    "records_per_page", // (Optional) The number of records per page. Minimum value is 1 and maximum is 100.
  ])
  public getPartnerAccountRelations(data: {
    user_guid: string;
    partner_relationship?: "clientof" | "partof";
    partner_relationship_role?: string;
    show_not_accepted?: string;
    data_options?: IPartnerDataOptions;
    page?: string | number;
    records_per_page?: string | number;
  }) {
    return this.post("/service/user/get-partners/", data, {
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        4: { message: "User not active in the system." },
        6: { message: "Not authorized to use this function or its disabled." },
        8: { message: "Internal error." },
        16: { message: "Invalid hash." },
      },
      retry: true,
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Add_new_partner_-_account_relation",
  )
  @filterInput([
    "user_guid", // (Required) The GUID of the user.
    "partner_ext_id", // (Required) The external id of the partner.
    "partner_relationship", // (Required) The relationship between the partner and the account. Valid values are “clientof” and “partof”.
    "partner_roles", // (Optional) The roles assigned to this relationship. If empty the default roles configured for this instance of CIS will be automatically assigned.
    "partner_status", // (Required) The status of the relationship between the partner and user. Valid status values are submitted, accepted, pending and refused.
    "notify", // Flag used to determine if the preset notification email has to be sent to the user. If the value is "1" then the email is sent.
  ])
  public createPartnerAccountRelation(
    data: IPartnerAccountRelationCreateInput,
  ) {
    return this.post("/service/partners/add/", data, {
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        6: { message: "Not authorised to use this function or its disabled." },
        8: { message: "Internal error." },
        16: { message: "Invalid hash." },
        19: { message: "Partner not found." },
      },
      hashKeys: [
        "user_guid",
        "partner_ext_id",
        "partner_relationship",
        "partner_status",
      ],
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Delete_a_partner_-_account_relation",
  )
  @filterInput([
    "user_guid", // (Required) The GUID of the user.
    "partner_ext_id", // (Required) The external id of the partner.
    "partner_relationship", // (Required) The relationship between the partner and the account. Valid values are “clientof” and “partof”.
  ])
  public deletePartnerAccountRelation(
    data: IPartnerAccountRelationDeleteInput,
  ) {
    return this.post("/service/partners/delete/", data, {
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        6: { message: "Not authorised to use this function or its disabled." },
        8: { message: "Internal error." },
        16: { message: "Invalid hash." },
        19: { message: "Partner not found." },
      },
      hashKeys: [
        "user_guid",
        "partner_ext_id",
        "partner_relationship",
      ],
    });
  }

  /*
    Manage pets
  */

  @doc("http://doc.omnipartners.be/index.php/Retrieve_pet_information")
  @filterInput(["user_guid"])
  public getPets(data: { user_guid: string }): Promise<{ data: IUserPet[] }> {
    return this.get("/service/pets/get", data, {
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        8: { message: "Internal error." },
        16: { message: "Invalid hash." },
      },
      hashNoKey: true,
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_information_by_pet_guid")
  @filterInput(["pet_guid"])
  public getPet(data: {
    pet_guid: string;
    data_options?: IUsetPetDataOptions;
  }): Promise<{ data: IUsetPetWithOwner }> {
    return this.get("/service/pets/get-pet", data, {
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        8: { message: "Internal error." },
        9: { message: "Pet not found in the system." },
        16: { message: "Invalid hash." },
      },
      hashNoKey: true,
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Add_new_pet")
  @filterInput([
    "user_guid", // (Required) The GUID of the owner of the pet.
    "pet_name", // (Required) The name of the pet.
    "pet_type", // (Required) The type of pet. Please refer Animal types list for valid values.
    "pet_breed", // (Required if pet_breed_com_id not supplied) The id of the pet breed. Please refer Animal breeds list for valid values.
    "pet_breed_com_id", // (Required if pet_breed not supplied) The common id of the pet breed. Please refer Animal breeds list for valid values. If both pet_breed and pet_breed_com_id are supplied pet_breed_com_id has the priority.
    "pet_pedigreename", // (Optional) The pedigree name of the pet.
    "pet_dob", // (Required) The birthday of the pet in the format YYYY-MM-DD.
    "pet_dob_approx", // (Optional) States whether pet date of birth is approximative. Valid values are 0 (no correction), 1 (day is not provided by user) and 2 (day and month are not provided by user). Default value is 0.
    "pet_neutered", // (Optional) This state whether pet is neutered or not. Valid values are “Y” and “N”.
    "pet_neutering_date", // (Optional) The date which the pet was neutered in the format YYYY-MM-DD.
    "pet_gender", // (Optional) The gender of the pet. Valid values are “M” and “F”.
    "vaccination_date", // (Optional) The date of vaccination in the format YYYY-MM-DD.
    "pet_insured", // (Optional) This state whether pet is insured or not. Valid values are “Y” and “N”.
    "pet_medical_condition", // (Optional) The medical conditions for the pet.Multiple values could be specified by mimicking the submission behavior of check boxes in an html form. Please refer Animal medical conditions list for valid values.
    "pet_lifestyle", // (Optional) The lifestyle of the pet. Please refer Animal lifestyles list for valid values.
    "pet_brand", // (Optional) The brand products given to the pet. Please refer Brands list for valid values.
    "pet_declarative_product", // (Optional) The products given to the pet. Please refer Product collections list for valid values.
    "tattoo_number", // (Optional) The tattoo number of the pet.
    "chip_number", // (Optional) The chip number of the pet.
    "pet_picture", // (Optional) The picture should be uploaded using POST request.
    "kc_number", // (Optional) The Kennel Club identifier.
    "pet_ext_id", // (Optional) The external id of the pet. This should be a unique value.
  ])
  public createPet(data: IUserPetCreateInput): Promise<{ data: IUserPet }> {
    return this.get("/service/pets/add", data, {
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        6: { message: "Not authorised to use this function or its disabled." },
        8: { message: "Internal error." },
        16: { message: "Invalid hash." },
        35: { message: "Pet limit reached for this account." },
      },
      hashKeys: ["pet_name", "user_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Update_pet_information")
  @filterInput([
    "pet_guid",
    "pet_name",
    "pet_type",
    "pet_breed",
    "pet_pedigreename",
    "pet_breed_com_id",
    "pet_dob",
    "pet_dob_approx",
    "pet_gender",
    "pet_neutered",
    "pet_neutering_date",
    "vaccination_date",
    "pet_insured",
    "pet_medical_condition",
    "pet_lifestyle",
    "pet_brand",
    "pet_declarative_product",
    "tattoo_number",
    "chip_number",
    "kc_number",
    "pet_picture",
    "pet_ext_id",
  ])
  public updatePet(data: IUserPetUpdateInput): Promise<{ data: IUserPet }> {
    return this.get("/service/pets/update", data, {
      errorMap: {
        2: {
          message:
            "Invalid request in which required header or parameters are either missing or invalid.",
        },
        3: { message: "User not found in the system." },
        6: { message: "Not authorised to use this function or its disabled." },
        8: { message: "Internal error." },
        9: { message: "Pet not found in the system." },
        16: { message: "Invalid hash." },
      },
      hashKeys: ["pet_name", "pet_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Retrieve_pet_picture")
  public getPetPictureUrl(data: {
    pet_guid: string;
    w?: number;
    h?: number;
  }): string {
    const { qs, uri } = this.signForGet("/service/pets/get-picture", data, {
      hashKeys: ["w", "h"],
    });
    return `${uri}?${querystring.stringify(qs)}`;
  }
}
