import querystring from "querystring";
import Api from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";
import {
  IPartnerAccountRelationCreateInput,
  IPartnerAccountRelationDeleteInput,
  IGetUserPartnerAccountRelationsInput,
  IUserPartnerAccountRelation,
} from "../../partner-types";
import {
  IPartnerDataOptions,
  IRegisterUserAddressInput,
  IRegisterUserInput,
  IUpdateUserAddressInput,
  IUser,
  IUserAddress,
  IUserChild,
  IUserChildCreateInput,
  IUserChildUpdateInput,
  IUserConfirmLegalFormsInput,
  IUserDataOptions,
  IUserFavourites,
  IUserFavouritesAddInput,
  IUserFavouritesDeleteInput,
  IUserLegalFormsItems,
  IUserOwner,
  IUserPartial,
  IUserPartnerRelationFromGet,
  IUserPet,
  IUserPetBmiEntry,
  IUserPetBmiEntryAddInput,
  IUserPetCreateInput,
  IUserPetDeleteInput,
  IUserPetPlaceOfPurchase,
  IUserPetPlaceOfPurchaseDeleteInput,
  IUserPetPlaceOfPurchaseUpdateInput,
  IUserPetUpdateInput,
  IUserPetWeightEntry,
  IUserPetWeightEntryAddInput,
  IUserPlaceOfPurchase,
  IUserPreferences,
  IUserSegment,
  IUserUpdateInput,
  IUserUpdatePlacesOfPurchaseInput,
  IUserUpdateSubscriptionsInput,
  IUsetPetDataOptions,
  IUsetPetWithOwner,
  IUserPetDietRecommendationAddInput,
  IUserPetDietRecommendationEntry,
  IUserPetDietRecommendationDeleteInput,
  IAddUserTagsInput,
  IDeleteUserTagsInput,
  ISocialNetwork,
  ISocialNetworkInput,
  ISocialNetworkDeleteInput,
  IAddPetTagsInput,
  IDeletePetTagsInput,
} from "../../types";

export interface IUserGetPartnerAccountRelationsResult {
  clientof: IUserPartnerRelationFromGet[];
  partof: IUserPartnerRelationFromGet[];
}

export default class Identity extends Api {
  public errorMap = {
    9: { message: "Pet not found" },
    19: { message: "Partner not found." },
  };

  @doc("http://doc.omnipartners.be/index.php/Delete_User_Accounts")
  @filterInput(["user_guid"])
  public deleteUser(data: { user_guid: string }) {
    return this.get("/service/account/delete", data, {
      hashKeys: ["user_guid"],
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Update_Password")
  @filterInput(["token", "password"])
  public updateRecoveredPassword(data: {
    token: string;
    password: string;
  }): Promise<{
    statusCode: number;
    data: {
      user_guid: string;
    };
  }> {
    return this.get("/service/account/create-password", data, {
      hashKeys: ["password"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Check_Password_Token_Validity")
  @filterInput(["token"])
  public checkPasswordTokenValidity(data: { token: string }) {
    return this.get("/service/account/check-password-token-validity", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Create_Access_Token")
  @filterInput(["session_token", "ttl"])
  public getAccessToken(data: {
    session_token: string;
    ttl: string | number;
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
  }): Promise<IUserPartial> {
    return this.get("/service/user/resolve-by-mobile-number", data, {
      hashKeys: ["mobile_no"],
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
  public findAccountByPublicToken(data: { token: string }): Promise<{
    data: {
      user_guid: string;
      user_updated_on: string;
    };
  }> {
    return this.get("/service/user/resolve-by-public-token", data, {
      retry: true,
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Find_account_GUID_by_partner_ext_id",
  )
  @filterInput(["partner_ext_id"])
  public findAccountByPartnerExtId(data: { partner_ext_id: string }) {
    return this.get("/service/user/resolve-by-partner", data, {
      hashKeys: ["partner_ext_id"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Recover_by_email_or_user_id")
  @filterInput(["uid", "mode", "url"])
  public recoverPassword(data: { uid: string; mode?: string; url?: string }) {
    return this.get("/service/account/recover-password", data, {
      errorMap: {
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

  @doc("https://doc.clixray.com/index.php/Recover_by_mobile_phone")
  @filterInput(["mobile", "message"])
  public recoverPasswordSMS(data: { mobile: string; message?: string }) {
    return this.get("/service/account/recover-password-sms", data, {
      hashKeys: ["mobile"],
    });
  }

  @doc("https://doc.clixray.com/index.php/Create_User_Accounts")
  public register(data: IRegisterUserInput): Promise<{ data: IUser }> {
    return this.get("/service/user/register", data, {
      errorMap: {
        8: { message: "Error saving data to the database." },
        9: { message: "Pet information required but not specified." },
        18: { message: "Email address already exists in the system." },
        23: { message: "Duplicate request." },
      },
      hashKeys: [
        data.user_email ? "user_email" : "user_mobile_phone",
        "user_password",
      ],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Force_Activate_User_Account")
  @filterInput(["user_guid"])
  public forceActivate(data: { user_guid: string }) {
    return this.get("/service/account/force-activate", data, {
      errorMap: {
        1: { message: "Internal error." },
        6: { message: "Not authorized to use this function or its disabled." },
        19: { message: "There is no confirmed partner relationship." },
        34: { message: "Account already active." },
      },
      hashKeys: ["user_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Confirm_User_Accounts")
  @filterInput(["identifier"])
  public confirmUserAccount(data: { identifier: string }) {
    return this.get("/service/account/confirm", data, {
      errorMap: {
        1: { message: "Internal error." },
        4: { message: "User is not active in the system" },
        6: { message: "Not authorized to use this function or its disabled." },
        24: { message: "Account already confirmed." },
      },
      hashKeys: ["identifier"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Edit_User_Accounts")
  public update(data: IUserUpdateInput): Promise<{ data: IUserOwner }> {
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
  public retrieveUserSubscriptions(data: { user_guid: string }): Promise<{
    data: IUserPreferences;
  }> {
    return this.get("/service/preferences/get", data, {
      errorMap: {
        6: { message: "Not authorised to use this function or it's disabled." },
        8: { message: "Error saving data to the database." },
      },
      hashKeys: ["user_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Update_user_preferences")
  @filterInput(["user_guid", "com_prefs", "interests", "subscriptions"])
  public updateSubscriptions(data: IUserUpdateSubscriptionsInput) {
    return this.get("/service/preferences/update", data, {
      errorMap: {
        8: { message: "Error saving data to the database." },
        36: { message: "User in blacklist." },
      },
      hashKeys: ["user_guid"],
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_places_of_purchase_preferences_of_a_user_account",
  )
  @filterInput(["user_guid"])
  public retrieveUserPlacesOfPurchase(data: { user_guid: string }): Promise<{
    data: null | IUserPlaceOfPurchase[];
  }> {
    return this.get("service/preferences/get-places-of-purchase", data, {
      errorMap: {
        6: {
          message:
            "Either key is invalid or the method is restricted for the key",
        },
      },
      hashKeys: ["user_guid"],
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Add_a_place_of_purchase_preference_to_the_user_account",
  )
  @filterInput(["user_guid", "place_id", "place_rating"])
  public updateUserPlacesOfPurchase(data: IUserUpdatePlacesOfPurchaseInput) {
    return this.get("/service/preferences/add-place-of-purchase", data, {
      errorMap: {
        6: {
          message:
            "Either key is invalid or the method is restricted for the key",
        },
      },
      hashKeys: ["user_guid", "place_id", "place_rating"],
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Delete_a_place_of_purchase_preference_from_a_user_account",
  )
  @filterInput(["user_guid", "place_id"])
  public deleteUserPlacesOfPurchase(data: {
    user_guid: string;
    place_id: string;
  }) {
    return this.get("/service/preferences/delete-place-of-purchase", data, {
      hashKeys: ["user_guid", "place_id"],
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
        3: { message: "Specified user not found." },
        8: { message: "Error saving data to the database." },
        39: { message: "Error in File upload." },
        40: { message: "Legal form is already confirmed." },
        41: { message: "Invalid File." },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Confirmed_Legal_Forms")
  @filterInput(["user_guid"])
  public getConfirmedLegalForm(data: {
    user_guid: string;
  }): Promise<{ data: IUserLegalFormsItems[] }> {
    return this.post("/service/legal-form/get-confirmed-legal-forms", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Revoke_Legal_Form")
  @filterInput(["legal_form_code", "user_guid", "send_notification"])
  public revokeLegalForm(data: {
    legal_form_code: string;
    user_guid: string;
    send_notification?: "1";
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
  public authenticateByEmail(data: {
    email: string;
    data_options?: IUserDataOptions;
  }): Promise<IUser> {
    return this.get("/service/auth/email", data, {
      hashKeys: ["email"],
      retry: true,
    });
  }

  @doc(
    "https://doc.clixray.com/index.php?title=Retrieve_Profile_Using_User_External_Id_ONLY",
  )
  @filterInput([
    "user_ext_id", // (Required)	External Id of the account.
    "data_options", // (Optional)	This defines information that is returned in the profile object. For more information please refer Data Options.
    "pet_data_options", // (Optional)	This defines information that is returned in the pet object. For more information please refer Pet Data Options.
    "partner_data_options", // (Optional)	This defines information that is returned in the partner profiles for the related partners. For more information please refer Partner Data Options.
    "pet_partner_type", // (Optional)	Pet's partner type code. Please refer http://doc.omnipartners.be/index.php/Get_Partner_Types_List for the codes of the types.
    "related_partners_filter_xxxx", // (Optional)	A set of filters that could be used to filter partner relationships. For more information please refer Partner Relationship Filter.
  ])
  public authenticateByExternalId({
    data_options,
    partner_data_options,
    pet_data_options,
    ...data
  }: {
    user_ext_id: string;
    data_options?: IUserDataOptions;
    pet_data_options?: IUsetPetDataOptions;
    partner_data_options?: IPartnerDataOptions;
    pet_partner_type?: string;
    related_partners_filter_xxxx?: string;
  }): Promise<IUser> {
    return this.get(
      "/service/auth/user-ext-id",
      {
        ...data,
        data_options: data_options
          ? Array.isArray(data_options)
            ? data_options.join(",")
            : data_options
          : undefined,
        partner_data_options: partner_data_options
          ? Array.isArray(data_options)
            ? data_options.join(",")
            : data_options
          : undefined,
        pet_data_options: pet_data_options
          ? Array.isArray(data_options)
            ? data_options.join(",")
            : data_options
          : undefined,
      },
      {
        retry: true,
      },
    );
  }

  @doc("http://doc.omnipartners.be/index.php/Create_Auth_Code")
  @filterInput(["type", "value", "ttl"])
  public createAuthCode(data: {
    type: "email" | "mobile";
    value: string;
    ttl: number;
  }) {
    return this.post("/service/auth/get-auth-code", data, {
      retry: true,
      errorMap: {
        1: {
          message:
            "Failed to generate the auth code. This error usually appears when system fails to generate a unique identifier because it has already generated too many and filled up the most of the possibilities.",
        },
        6: { message: "Not authorized to use this function or its disabled." },
        11: {
          message:
            "Too many consecutive requests for the the same account. Requests are allowed once in every 2 minutes per account.",
        },
        26: { message: "User Mobile number not available in user profile." },
        50: { message: "SMS Template not available." },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Retrieve_Profile_Using_Auth_Code")
  @filterInput(["auth_code"])
  public async authenticateByCode(data: {
    auth_code: string;
    data_options?: IUserDataOptions;
  }): Promise<IUser> {
    return this.get(
      "/service/auth/code",
      {
        ...data,
        data_options: Array.isArray(data.data_options)
          ? data.data_options.join(",")
          : data.data_options,
      },
      {
        retry: true,
        errorMap: {
          7: { message: "Auth Code not found in the system." },
          49: { message: "User not confirmed." },
        },
      },
    );
  }

  /*
    Manage partners
  */

  @doc("http://doc.omnipartners.be/index.php/Get_partners_-_account_relations")
  @filterInput([
    "user_guid", // (Required) The GUID of the user.
    "partner_relationship", // (Optional) The relationship between the partner and the account. Valid values are “clientof” and “partof”.
    "partner_relationship_role", // (Optional) The role of the relationship.
    "partner_groups", // (Optional) A comma separated list of partner group handles. Partners in the relationship will be checked against the groups to see if they belong to at least one group.
    "show_not_accepted", // (Optional) Sates whether to include the relationships that are not in accepted state. Valid values are 1 and 0. Default values is 0.
    "data_options", // (Optional) This defines information that is returned in the partner profiles for the related partners. For more information please refer Partner Data Options.
    "page", // (Optional) The page number to be retrieved.
    "records_per_page", // (Optional) The number of records per page. Minimum value is 1 and maximum is 100.
  ])
  public getPartnerAccountRelations(data: {
    user_guid: string;
    partner_relationship?: "clientof" | "partof";
    partner_relationship_role?: string;
    partner_groups?: string | string[];
    show_not_accepted?: string;
    data_options?: IPartnerDataOptions;
    page?: string | number;
    records_per_page?: string | number;
  }): Promise<{
    data: IUserGetPartnerAccountRelationsResult;
  }> {
    return this.post(
      "/service/user/get-partners/",
      {
        ...data,
        partner_groups: Array.isArray(data.partner_groups)
          ? data.partner_groups.join(",")
          : data.partner_groups,
        data_options: Array.isArray(data.data_options)
          ? data.data_options.join(",")
          : data.data_options,
      },
      {
        errorMap: {
          4: { message: "User not active in the system." },
          6: {
            message: "Not authorized to use this function or its disabled.",
          },
        },
        retry: true,
      },
    );
  }

  @doc("https://doc.clixray.com/index.php/Add_new_partner_-_account_relation")
  @filterInput([
    "user_guid", // (Required) The GUID of the user.
    "partner_ext_id", // (Required) The external id of the partner.
    "partner_relationship", // (Required) The relationship between the partner and the account. Valid values are “clientof” and “partof”.
    "partner_roles", // (Optional) The roles assigned to this relationship. If empty the default roles configured for this instance of CIS will be automatically assigned.
    "is_primary_contact", // Flag used to indicate that the this particular user is the primary contact of the partner indicated in the request. Valid values are "1" or "0". Default is "0".
    "notify", // Flag used to determine if the preset notification email has to be sent to the user. If the value is "1" then the email is sent.
    "partner_status", // (Deprecated) The status of the relationship between the partner and user. Valid status values are submitted, accepted, pending and refused.
  ])
  public createPartnerAccountRelation(
    data: IPartnerAccountRelationCreateInput,
  ) {
    return this.post("/service/partners/add/", data, {
      errorMap: {
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
    "http://doc.omnipartners.be/index.php/Update_partner_-_account_relation_status",
  )
  @filterInput([
    "user_guid", // (Required) The GUID of the user.
    "partner_ext_id", // (Required) The external id of the partner.
    "partner_relationship", // (Required) The relationship between the partner and the account. Valid values are “clientof” and “partof”.
    "partner_roles", // (Optional) The roles assigned to this relationship. If empty the default roles configured for this instance of CIS will be automatically assigned.
    "partner_status", // (Required) The status of the relationship between the partner and user. Valid status values are submitted, accepted, pending and refused.
    "notify", // Flag used to determine if the preset notification email has to be sent to the user. If the value is "1" then the email is sent.
  ])
  public updatePartnerAccountRelation(
    data: IPartnerAccountRelationCreateInput,
  ) {
    return this.post("/service/partners/update/", data, {
      errorMap: {
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
        19: { message: "Partner not found." },
      },
      hashKeys: ["user_guid", "partner_ext_id", "partner_relationship"],
    });
  }

  @doc(
    "https://doc.clixray.com/index.php?title=Get_users_of_partner_-_account_relations",
  )
  @filterInput([
    "partner_ext_id", // (Required)	The Ext ID of the partner.
    "partner_relationship", // (Required)	The relationship between the partner and the account. Valid values are “clientof” and “partof”.
    "show_not_accepted", // (Optional)	Sates whether to include the relationships that are not in accepted state.
    "active_users_only", // (Optional)	Sates whether to include the users that are in active state only. Valid values are “1” and “0”. When 1 is specified only the active users will be included. When 0 is specified active and temporary users will be included. If the this parameter is omitted from the request all users will there in the result including the deleted ones.
    "role", // (Optional)	The role associated to the partner-user relationship.
    "customer_group", // (Optional)	The customer group of the users associated to the partner.
    "group_results_by_status", // (Optional)	States whether to group the results by the relationship status. Valid values are “1” and “0”. Default values is “1”.
    "page", // (Required)	The page number to be retrieved.
    "records_per_page", // (Required)	The number of records per page. Minimum value is 10 and maximum is 200.
    "data_options", // (Optional)	This defines information that is returned in the result. At the moment only owner_details option is valid. For more information please refer Data Options.
  ])
  public getUserPartnerAccountRelations(
    data: IGetUserPartnerAccountRelationsInput,
  ): Promise<{
    data: {
      records: { accepted: IUserPartnerAccountRelation[] };
      page: string;
      records_per_page: string;
      total_record_count: string;
      total_pages: number;
      // Deprecated
      recordsPerPage: string;
      totalRecordCount: string;
      totalPages: number;
    } | null;
  }> {
    return this.get(
      "/service/partners/get-users/",
      {
        ...data,
        data_options:
          data.data_options && Array.isArray(data.data_options)
            ? data.data_options.join(",")
            : data.data_options,
      },
      {
        hashKeys: undefined,
      },
    );
  }

  /*
    Manage pets
  */

  @doc("http://doc.omnipartners.be/index.php/Retrieve_pet_information")
  @filterInput(["user_guid", "data_options"])
  public getPets(
    data: { user_guid: string; data_options?: IUsetPetDataOptions },
    options?: { locale?: string },
  ): Promise<{ data: IUserPet[] }> {
    return this.get(
      "/service/pets/get",
      {
        ...data,
        data_options: Array.isArray(data.data_options)
          ? data.data_options.join(",")
          : data.data_options,
      },
      {
        hashNoKey: true,
        hashKeys: ["user_guid"],
        retry: true,
        ...(options &&
          options.locale && {
            headers: {
              "X-LANGUAGE": options.locale,
            },
          }),
      },
    );
  }

  @doc("http://doc.omnipartners.be/index.php/Get_information_by_pet_guid")
  @filterInput(["pet_guid", "data_options"])
  public getPet(data: {
    pet_guid: string;
    data_options?: IUsetPetDataOptions;
  }): Promise<{ data: IUsetPetWithOwner }> {
    return this.get(
      "/service/pets/get-pet",
      {
        ...data,
        data_options: Array.isArray(data.data_options)
          ? data.data_options.join(",")
          : data.data_options,
      },
      {
        errorMap: {
          9: { message: "Pet not found in the system." },
        },
        hashNoKey: true,
        hashKeys: ["pet_guid"],
        retry: true,
      },
    );
  }

  @doc("https://doc.clixray.com/index.php?title=Get_information_by_pet_ext_id")
  @filterInput(["pet_ext_id", "data_options"])
  public getPetByExternalId(data: {
    pet_ext_id: string;
    data_options?: IUsetPetDataOptions;
  }): Promise<{ data: IUsetPetWithOwner; statusCode: number }> {
    return this.get(
      "/service/pets/get-pet-by-external-id",
      {
        ...data,
        data_options: Array.isArray(data.data_options)
          ? data.data_options.join(",")
          : data.data_options,
      },
      {
        errorMap: {
          9: { message: "Pet not found in the system." },
          21: { message: "Pet not active in the system." },
        },
        hashNoKey: true,
        hashKeys: ["pet_ext_id"],
        retry: true,
      },
    );
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
    return this.post("/service/pets/add", data, {
      multipart: true,
      errorMap: {
        35: { message: "Pet limit reached for this account." },
      },
      hashKeys: ["pet_name", "user_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Delete_existing_pet")
  @filterInput([
    "pet_guid", // (Required) GUID of the pet.
    "pet_deletion_cause", // (Optional) Code of pet deletion cause. Please refer Animal deletion causes list for valid values.
  ])
  public deletePet(data: IUserPetDeleteInput) {
    return this.post("/service/pets/delete", data, {
      hashKeys: ["pet_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Animal_deletion_causes_list")
  @filterInput([
    "lang", // (Optional) The language in which the list of animal types must be retrieved. Please refer Language list for valid values.
  ])
  public getPetDeletionCauses(data: { lang?: string }) {
    return this.post("service/data/get-animal-deletion-causes", data, {
      hashKeys: undefined,
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
    "pet_special_needs",
  ])
  public updatePet(data: IUserPetUpdateInput): Promise<{ data: IUserPet }> {
    return this.post("/service/pets/update", data, {
      multipart: true,
      errorMap: {
        9: { message: "Pet not found in the system." },
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

  @doc("http://doc.omnipartners.be/index.php/Update_pet_picture")
  @filterInput(["pet_guid", "pet_picture"])
  public updatePetPicture(data: {
    pet_guid: string;
    pet_picture: IUserPetUpdateInput["pet_picture"];
  }): Promise<{ statusCode: number }> {
    return this.post("/service/pets/update-picture", data, {
      multipart: true,
      hashKeys: ["pet_guid"],
      errorMap: {
        9: { message: "Pet not found in the system." },
        10: { message: "File upload error." },
      },
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Add_a_place_of_purchase_preference_to_the_pet_account",
  )
  @filterInput([
    "pet_guid", // (Required)	The GUID of the pet.
    "place_id", // (Required)	Identification code of the place of purchase. Valid codes can be listed from http://doc.omnipartners.be/index.php/Get_Place_of_Purchase.
    "place_rating", // (Required)	Rating of the place of purchase. The scale is 1 to 5.
    "replace_existing_preferences", // (Optional)	If this is set to yes/1, then the preferences of the pet are replaced by this single new entry. Applicable values are 'yes' or '1' / 'no' or '0'. Default value for this is 'yes'.
  ])
  public updatePetPlaceOfPurchase(
    data: IUserPetPlaceOfPurchaseUpdateInput,
  ): Promise<{ statusCode: number }> {
    return this.post("/service/pet-purchase-place/add-place/", data, {
      hashKeys: undefined,
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_places_of_purchase_preferences_of_a_pet_account",
  )
  @filterInput([
    "pet_guid", // (Required)	The GUID of the pet.
  ])
  public retrievePetPlaceOfPurchase(data: {
    pet_guid: string;
  }): Promise<{ data: IUserPetPlaceOfPurchase[] | null }> {
    return this.post("service/pet-purchase-place/get-places/", data, {
      hashKeys: undefined,
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Delete_a_place_of_purchase_preference_from_a_pet_account",
  )
  @filterInput([
    "pet_guid", // (Required)	The GUID of the pet.
    "place_id", // (Required)	Identification code of the place of purchase. Valid codes can be listed from http://doc.omnipartners.be/index.php/Get_Place_of_Purchase.
    "place_rating", // (Required)	Rating of the place of purchase. The scale is 1 to 5.
    "replace_existing_preferences", // (Optional)	If this is set to yes/1, then the preferences of the pet are replaced by this single new entry. Applicable values are 'yes' or '1' / 'no' or '0'. Default value for this is 'yes'.
  ])
  public deletePetPlaceOfPurchase(
    data: IUserPetPlaceOfPurchaseDeleteInput,
  ): Promise<{ statusCode: number; data: any }> {
    return this.post("/service/pet-purchase-place/delete-place/", data, {
      hashKeys: undefined,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Add_weight_entry")
  @filterInput([
    "pet_guid", // (Required)The GUID of the pet.
    "date", // (Required)Date value for the pet weight record. Date format is ”YYYY-MM-DD”.
    "weight", // (Required)Weight of the pet (in grams).
    "partner_ext_id", // (Optional)Ext ID of the partner who adds the entry.
    "source", // (Required)It’s a text value and specifies the source of the request.
    "ideal_weight", // (Optional)Ideal Weight of the pet (in grams).
  ])
  public addPetWeight(data: IUserPetWeightEntryAddInput) {
    return this.post("/service/pets/add-weight/", data, {
      hashKeys: ["pet_guid", "date", "weight", "source"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Retrieve_weight_Series")
  @filterInput([
    "pet_guid", // (Required)The GUID of the pet.
    "partner_ext_id", // (Optional)Ext ID of the partner who adds the entry.
  ])
  public getPetWeight(data: {
    pet_guid: string;
    partner_ext_id?: string;
  }): Promise<{ statusCode: number; data: IUserPetWeightEntry[] }> {
    return this.post("/service/pets/get-weight/", data, {
      hashKeys: ["pet_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Delete_weight_entry")
  @filterInput([
    "pet_guid", // (Required)The GUID of the pet.
    "date", // (Required)Date value for the pet weight record. Date format is ”YYYY-MM-DD”.
    "partner_ext_id", // (Optional)Ext ID of the partner who adds the entry.
  ])
  public deletePetWeight(
    data: Pick<
      IUserPetWeightEntryAddInput,
      "date" | "pet_guid" | "partner_ext_id"
    >,
  ) {
    return this.post("/service/pets/del-weight/", data, {
      hashKeys: ["pet_guid", "date"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Add_body_mass_index_entry")
  @filterInput([
    "pet_guid", // (Required)The GUID of the pet.
    "date", // (Required)Date value for the pet weight record. Date format is ”YYYY-MM-DD”.
    "bmi", // (Required) BMIof the pet.
    "partner_ext_id", // (Optional)Ext ID of the partner who adds the entry.
    "source", // (Required)It’s a text value and specifies the source of the request.
  ])
  public addPetBmi(data: IUserPetBmiEntryAddInput) {
    return this.post("/service/pets/add-bmi/", data, {
      hashKeys: ["pet_guid", "date", "bmi", "source"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Retrieve_body_mass_index_Series")
  @filterInput([
    "pet_guid", // (Required)The GUID of the pet.
    "partner_ext_id", // (Optional)Ext ID of the partner who adds the entry.
  ])
  public getPetBmi(data: {
    pet_guid: string;
    partner_ext_id?: string;
  }): Promise<{ statusCode: number; data: IUserPetBmiEntry[] }> {
    return this.post("/service/pets/get-bmi/", data, {
      hashKeys: ["pet_guid"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Delete_body_mass_index_entry")
  @filterInput([
    "pet_guid", // (Required)The GUID of the pet.
    "date", // (Required)Date value for the pet weight record. Date format is ”YYYY-MM-DD”.
    "partner_ext_id", // (Optional)Ext ID of the partner who adds the entry.
  ])
  public deletePetBmi(
    data: Pick<
      IUserPetBmiEntryAddInput,
      "date" | "pet_guid" | "partner_ext_id"
    >,
  ) {
    return this.post("/service/pets/del-bmi/", data, {
      hashKeys: ["pet_guid", "date"],
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Add_diet_recommendation")
  @filterInput([
    "pet_guid", // (Required) The GUID of the pet.
    "creation_date", // (Required) The creation date of the diet recommendation. Date format should be”YYYY-MM-DD”.
    "collection_reference", // (Required) The reference to the product collection.
    "expiration_date", // (Optional) The expiration date of the diet recommendation. Date format should be”YYYY-MM-DD”.
    "partner_ext_id", // (Optional) The Ext ID of the partner who adds the entry.
    "ration", // (Optional) The quantity of ration.
    "ration_unit", // (Optional) The units of the ration.
    "custom_logger_info", // (Optional) custom values to add as logging values. Ex. {"tag_1":"custom_tag_1", "tag_2":"custom_tag_2"}
  ])
  public addPetDietRecommendation(data: IUserPetDietRecommendationAddInput) {
    return this.post("/service/pets/add-diet-recommendation", data, {
      hashKeys: undefined,
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Retrieve_diet_recommendations")
  @filterInput([
    "pet_guid", // (Required) The GUID of the pet.
    "creation_date", // (Optional) The creation date of the diet recommendations.
    "partner_ext_id", // (Optional) Ext ID of the partner who added the entries.
  ])
  public getPetDietRecommendation(data: {
    pet_guid: string;
    creation_date?: string;
    partner_ext_id?: string;
  }): Promise<{ data: IUserPetDietRecommendationEntry[] }> {
    return this.post("/service/pets/get-diet-recommendations", data, {
      hashKeys: undefined,
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Delete_diet_recommendations")
  @filterInput([
    "pet_guid", // (Required) The GUID of the pet.
    "creation_date", // (Optional) The creation date of the diet recommendation. The Date format should be ”YYYY-MM-DD”.
    "collection_reference", // (Optional) The reference of the product collection.
    "partner_ext_id", // (Optional) Ext ID of the partner who added the entry.
    "custom_logger_info", // (Optional) custom values to add as logging values. Ex. {"tag_1":"custom_tag_1", "tag_2":"custom_tag_2"}
  ])
  public deletePetDietRecommendation(
    data: IUserPetDietRecommendationDeleteInput,
  ) {
    return this.post("/service/pets/delete-diet-recommendations", data, {
      hashKeys: undefined,
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Add_Pet_Tags")
  @filterInput([
    "pet_guid", // (Required) GUID of the tag adding pet.
    "pet_tags", // (Required) Tag which is going to add for the pet. Multiple values can be used for this by separating each by a comma. Each tag should contain only a-z A-Z _ characters.
    "replace_existing_tags", // (Optional) Flag used to determine whether existing tags have to be replaced by the given list or not. If the value is "1" or "yes" then the existing tags will be removed.
  ])
  public addPetTags(data: IAddPetTagsInput) {
    return this.post("/service/pet-tags/add-tag", data, {
      hashKeys: ["pet_guid"],
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Delete_Pet_Tags")
  @filterInput([
    "pet_guid", // (Required) GUID of the tag deleting pet.
    "pet_tags", // (Required) Tag which is going to delete from the user. Multiple values can be used for this by separating each by a comma. If this parameter is not sent or empty value is sent, all tags which are relate to the user will be deleted.
  ])
  public deletePetTags(data: IDeletePetTagsInput) {
    return this.post("/service/pet-tags/delete-tag", data, {
      hashKeys: ["pet_guid"],
    });
  }

  /*
    Manage children
  */

  @doc("https://doc.clixray.com/index.php?title=Add_new_child")
  @filterInput([
    "user_guid", // (Required)	The GUID of the parent account.
    "child_first_name", // (Required)	The name of the child.
    "child_birthday", // (Required)	The birthday of the child in the format YYYY-MM-DD.
    "child_gender", // (Optional)	The gender of the child. Valid values are “M”, “F” and “U” (for unknown).
    "child_ext_id", // (Optional)	The external id of the child. This should be a unique value.
    "multiples", // Valid values are '1' OR '0' When adding a child allow replacement of existing child if existing child has a Date of Birth within x days. X is an optional config parameter, not editable. If the parameter is set then replacement will be automatic unless the "multiples" option is used
  ])
  public createChild(
    data: IUserChildCreateInput,
  ): Promise<{ data: IUserChild }> {
    return this.post("/service/children/add", data, {
      hashKeys: undefined,
    });
  }

  @doc("https://doc.clixray.com/index.php/Retrieve_child_information")
  @filterInput([
    "user_guid", // (Required)	The GUID of the parent account.
  ])
  public getChildren(data: {
    user_guid: string;
  }): Promise<{ data: IUserChild[] }> {
    return this.post("/service/children/get", data, {
      hashKeys: undefined,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Update_child_information")
  @filterInput([
    "child_guid", // (Required)	The GUID of the child.
    "child_first_name", // (Optional)	The first name of the child.
    "child_birthday", // (Optional)	The date of birth of the child in the format YYYY-MM-DD.
    "child_gender", // (Optional)	The gender of the gender. Valid values are “M”, “F” and “U” (for unknown).
    "child_ext_id", // (Optional)	The external id of the child. This should be a unique value.
  ])
  public updateChild(
    data: IUserChildUpdateInput,
  ): Promise<{ data: IUserChild }> {
    return this.post("/service/children/update", data, {
      hashKeys: undefined,
    });
  }

  /*
    Manage segments
  */

  @doc("http://doc.omnipartners.be/index.php/Get_User_Segments")
  @filterInput(["user_guid"])
  public getUserSegments(data: {
    user_guid: string;
  }): Promise<{ data: IUserSegment[] }> {
    return this.post("/service/segments/get-user-segments", data, {
      hashNoKey: undefined,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Flush_User_Segment_Cache")
  @filterInput(["user_guid"])
  public flushUserSegmentCache(data: { user_guid: string }): Promise<{
    data: {
      statusCode: number;
    };
  }> {
    return this.post("/service/user/flush-segment-cache", data, {
      hashNoKey: undefined,
    });
  }

  /*
    Manage favourites
  */

  @doc(
    "http://doc.omnipartners.be/index.php/Add_a_favourite_to_the_user_account",
  )
  @filterInput([
    "user_guid", // The GUID of the user.
    "date", // Date value for the favorite to be added (YYYY-MM-DD).
    "type", // Text string used to define the type of favorite (eg: video / picture).
    "content", // Text string used to store the content of the favorite.
    "source", // Text string used to identify the source that created the favorite.
  ])
  public addUserFavourites(data: IUserFavouritesAddInput): Promise<{
    statusCode: number;
  }> {
    return this.get("/service/user/add-favorite/", data, {
      hashKeys: ["user_guid", "source", "date", "type"],
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Retrieve_favourites_of_a_user_account",
  )
  @filterInput([
    "user_guid", // (Required) The GUID of the user.
    "type", // (Optional) Text string used to define the type of favorite (eg: video / picture).
    "source", // (Optional) Text string used to define the source of favorite.
  ])
  public getUserFavourites(data: {
    user_guid: string;
    type?: string;
    source?: string;
  }): Promise<{
    data: IUserFavourites[];
  }> {
    return this.get("service/user/get-favorite/", data, {
      hashKeys: ["user_guid"],
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Delete_a_favourite_from_a_user_account",
  )
  @filterInput([
    "user_guid", // The GUID of the user.
    "content_id", // The content ID of the pet owner favorite record
  ])
  public deleteUserFavourites(data: IUserFavouritesDeleteInput): Promise<{
    statusCode: number;
  }> {
    return this.get("/service/user/del-favorite/", data, {
      hashKeys: ["user_guid", "content_id"],
    });
  }

  @doc("https://doc.clixray.com/index.php/Retrieve_Password_Validation_Rule")
  @filterInput([
    "user_guid", // Required if other identifiers not given - The guid of the user for whom the password validation rule should be retrieved.
    "user_email", // Required if other identifiers not given - The email of the user for whom the password validation rule should be retrieved.
    "user_username", // Required if other identifiers not given - The username of the user for whom the password validation rule should be retrieved.
  ])
  public getFormatPassword(
    data: {
      user_guid?: string;
      user_email?: string;
      user_username?: string;
    } = {},
  ): Promise<{
    data: {
      password_format: string | null;
      alt_password_format: string | null;
    };
  }> {
    return this.get("/service/account/get-password-format", data, {});
  }

  /*
    Manage tags
  */
  @doc("https://doc.clixray.com/index.php?title=Get_User_Tags")
  @filterInput(["user_guid"])
  public getUserTags(data: { user_guid: string }): Promise<{ data: string[] }> {
    return this.post("/service/user-tags/get-tags", data, {
      hashKeys: ["user_guid"],
    });
  }
  @doc("https://doc.clixray.com/index.php?title=Get_User_Tags")
  @filterInput([
    "user_guid", // (Required) GUID of the tag adding user.
    "user_tags", // (Required) Tag which is going to add for the user. Multiple values can be used for this by separating each by a comma. Each tag should contain only a-z A-Z _ characters.
    "replace_existing_tags", // (Optional) Flag used to determine whether existing tags have to be replaced by the given list or not. If the value is "1" or "yes" then the existing tags will be removed.
    "custom_logger_info", // (Optional) custom values to add as logging values. Ex. {"tag_1":"custom_tag_1", "tag_2":"custom_tag_2"}
  ])
  public addUserTags(
    data: IAddUserTagsInput,
  ): Promise<{ data: { added_tags: string[] } }> {
    return this.post("/service/user-tags/add-tag", data, {
      hashKeys: ["user_guid"],
    });
  }
  @doc("https://doc.clixray.com/index.php?title=Get_User_Tags")
  @filterInput([
    "user_guid", // (Required) GUID of the tag adding user.
    "user_tags", // (Required) Tag which is going to delete from the user. Multiple values can be used for this by separating each by a comma. If this parameter is not sent or empty value is sent, all tags which are relate to the user will be deleted.
    "custom_logger_info", // (Optional) custom values to add as logging values. Ex. {"tag_1":"custom_tag_1", "tag_2":"custom_tag_2"}
  ])
  public deleteUserTags(
    data: IDeleteUserTagsInput,
  ): Promise<{ data: { statusCode: number } }> {
    return this.post("/service/user-tags/delete-tag", data, {
      hashKeys: ["user_guid"],
    });
  }

  /*
     Manage User Socials Network
   */
  @doc("https://doc.clixray.com/index.php?title=Get_User_Social_Networks")
  @filterInput([
    "user_guid", // (Required) GUID of the user.
  ])
  public getUserSocialNetwork(data: {
    user_guid: string;
  }): Promise<{ data: ISocialNetwork[] }> {
    return this.post("/service/social-network/list", data, {
      hashKeys: undefined,
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Add_User_Social_Network")
  @filterInput([
    "user_guid", // (Required) GUID of the user.
    "social_network", // (Required) The social network. Please refer Get_Social_Networks for valid values.
    "username", // (Required) The username in the social network.
    "follower_count", // (Optional) Number of followers in the social network.
  ])
  public addUserSocialNetwork(
    data: ISocialNetworkInput,
  ): Promise<{ data: { statusCode: 0 } }> {
    return this.post("/service/social-network/add", data, {
      hashKeys: undefined,
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Update_User_Social_Network")
  @filterInput([
    "user_guid", // (Required) GUID of the user.
    "social_network", // (Required) The social network. Please refer Get_Social_Networks for valid values.
    "username", // (Required) The username in the social network.
    "follower_count", // (Optional) Number of followers in the social network.
  ])
  public updateUserSocialNetwork(
    data: ISocialNetworkInput,
  ): Promise<{ data: { statusCode: 0 } }> {
    return this.post("/service/social-network/update", data, {
      hashKeys: undefined,
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Delete_User_Social_Network")
  @filterInput([
    "user_guid", // (Required) GUID of the user.
    "social_network", // (Required) The social network. Please refer Get_Social_Networks for valid values.
    "username", // (Required) The username in the social network.
  ])
  public deleteUserSocialNetwork(
    data: ISocialNetworkDeleteInput,
  ): Promise<{ data: { statusCode: 0 } }> {
    return this.post("/service/social-network/delete", data, {
      hashKeys: undefined,
    });
  }
}
