import Api, { IApiFetchOptions, IApiPostData } from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";
import {
  IDeal,
  IDirectCashbackDealDetail,
  IUserEligibleDirectCashbackDeal,
} from "../../types";

export interface ISubscribeToDealInput {
  user_guid: string;
  ref: string;
  partner_extid: string;
  ean_code?: string;
  secure_code?: string;
  pet_guid?: string;
  iban?: string;
  bic?: string;
  referral_code?: string;
  delivery_address_id?: string;
}

export interface ISubscribeToDirectCashbackDealInput {
  user_guid: string;
  deal_ref: string;
  pet_guid?: string;
  child_guid?: string;
}

export interface IDealProductCollection {
  generic_name?: string;
  reference?: string;
  name?: { [key: string]: string };
  has_image: boolean;
}

export interface IDealProduct {
  ean: string;
  id: string;
  label: string;
  friendly_name?: string;
  min_qty: number;
  collection: IDealProductCollection;
}

export interface IDealEligiblePet {
  pet_guid: string;
  pet_name: string;
}

export interface IDirectCashbackVoucherListInput {
  user_guid: string;
  pet_guid?: string;
  child_guid?: string;
  from?: string;
  to?: string;
  deal_ref?: string;
  p_length: string;
  p_page: string;
}

export interface IDirectCashbackVoucherList {
  records: IDirectCashbackVoucherListItem[];
  p_total: number;
  p_length: number;
  p_page: number;
}

export interface IDirectCashbackVoucherListItem {
  user_guid: string;
  barcode: string;
  pet_guid: string;
  child_guid: string;
  status: string;
  ts_created: string;
  benefit_id: string;
  deal_ref: string;
  benefit_amount: string;
  benefit_currency: string;
  benefit_product_id: string;
  redemption_request_in_progress: 0 | 1;
}

export default class Deals extends Api {
  public defaultHost = "https://deals.clixray.io/";

  public errorMap = {
    1005: { message: "Database connection or SQL error." },
    1006: {
      message:
        "Unauthorized user access, input authenticate key might be invalid.",
    },
    1008: { message: "Deals Service Key not sent." },
    1009: { message: "Deals Service Hash not sent." },
    1010: { message: "Deals Service action not sent." },
    1024: { message: "Invalid Hash text sent with request." },
    2021: { message: "User GUID is not found in database." },
    3020: { message: "Parameter user_guid not available in the request." },
    3022: { message: "Subscription status code is not set in request." },
    3023: { message: "Subscription status code is not valid text." },
    3026: { message: "The ref parameter not available in the request" },
    3033: {
      message: "When the post body empty or content not valid JSON obejct",
    },
    3035: { message: "invalid deal reference." },
    3044: {
      message: "Partner can't resolve by the supplied external-customer-id",
    },
    3059: { message: "Parameter partner_extid not available in the request." },
    3051: { message: "Parameter ean_code not available in the request" },
    3034: { message: "Invalid EAN code" },
    1019: { message: "Can't resolve partner." },
    3055: { message: "Subscription fail due to error in barcode generation." },
    3028: { message: "Inactive deal" },
    3029: { message: "Deal already expired." },
    3045: { message: "Can't find a record for given data" },
    3049: { message: "Stock not available." },
    3030: { message: "User not in the allowed segment." },
    3056: { message: "User not have a pet with a restricted pet type." },
    3052: { message: "User not have a pet with a restricted pet breed." },
    3053: {
      message: "If pet is required for the deal and user not have a pet.",
    },
    3054: { message: "User subscription limit reach." },
    3057: { message: "Deal is not allowed for the supplied product." },
    3058: { message: "The deal is not allowed for the supplied partner." },
    3060: { message: "'code' is not available in the request parameters" },
    3061: { message: "Secure code already used" },
    3063: { message: "Secure code parameter not available in the request" },
    3064: { message: "Invalid secure code" },
    3069: { message: "Invalid pet guid" },
    3086: { message: "Invalid IBAN" },
    3087: { message: "Invalid BIC" },
    3088: {
      message:
        "The minimum number of loyalty points required to subscribe is not reached.",
    },
    3091: {
      message: "The deal is denied for the user since user is inactive.",
    },
    3092: {
      message:
        "Use Send invitation Link to send invitation since user is inactive.",
    },
    3093: { message: "Saving date of the deal has expired." },
    3097: {
      message:
        "Not enough points for pay off the deal subscription point redemption",
    },
    3098: { message: "User doesn't have a pet in allowed age limit." },
    3108: { message: "Referral code parameter not available in the request." },
    3109: { message: "Invalid Referral code parameter." },
    3110: { message: "Referral code is not allowed." },
    3111: {
      message: "Delivery address ID parameter is not available in the request.",
    },
    3112: { message: "Doesn't have any address associated with the user." },
    3113: { message: "Invalid delivery address ID." },
    5000: { message: "Internal Error." },
  };

  @doc("http://doc.omnipartners.be/index.php/Get_deals_details")
  @filterInput([
    "ref", // (Required) Deal reference code
    "default_lang", // (Optional) Language code.
  ])
  public getDeal(data: {
    ref: string;
    default_lang: string;
  }): Promise<{ data: IDeal }> {
    return this._call("get-deal-details", data, {
      hashKeys: ["ref"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_registered_partners")
  @filterInput([
    "deal_ref", // (Required) Deal reference
    "search_term", // (Optional) Search term of the partner. This could be "Partner invoice name", "Partner public name" or "Partner email"
    "p_length", // (Optional) Item per page
    "p_page", // (Optional) current page. start at 0
    "partner_lat", // (Optional) latitude value of the base location of the search
    "partner_lng", // (Optional) longitude value of the base location of the search
    "radius", // (Optional) Radius in km, If not set then it set as 10km, Service will check partners located with in that "Radius"
    "partner_status", // (Optional) Used to filter results using partner status. If this is not specified, default value is "A".
  ])
  public getRegisteredPartners(data: {
    deal_ref: string;
    search_term: string;
    p_length: number;
    p_page: number;
    partner_lat: number;
    partner_lng: number;
    radius: number;
    partner_status: string;
  }) {
    return this._call("get-registered-partners", data, {
      hashKeys: ["deal_ref"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_visible_partners")
  @filterInput([
    "deal_ref",
    "user_guid",
    "search",
    "favorite_only",
    "partner_lat",
    "partner_lng",
    "radius",
    "p_page",
    "p_length",
    "limit",
  ])
  public getVisiblePartner(data: {
    deal_ref: string;
    user_guid: string;
    search: string;
    favorite_only: boolean;
    partner_lat: number;
    partner_lng: number;
    radius: number;
    p_page: number;
    p_length: number;
    limit: number;
  }) {
    return this._call("get-visible-partners-for-user", data, {
      hashKeys: ["deal_ref"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Check_deal_validity")
  @filterInput(["user_guid", "pet_guid", "deal_ref"])
  public checkDealValidity(data: {
    user_guid: string;
    pet_guid: string;
    deal_ref: string;
  }) {
    return this._call("check-deal-validity", data, {
      hashKeys: ["deal_ref", "user_guid"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Subscribe_to_a_deal")
  @filterInput([
    "user_guid", // (Required) GUID of an active user
    "ref", // (Required) deal reference code
    "partner_extid", // (Required) external-customer-id of the partner, user can only redeem on that partner
    "ean_code", // (Optional) EAN code of the product, This is required if the deal restricted to a certain product or product group. Otherwise it can be empty.
    "secure_code", // (Required for locked deals) available secure code for the deal
    "pet_guid", // (Optional) A Pet guid of the user. If omitted, the system will try to get a applicable pet from the user's pets. If pet is not required for the deal, no pet is assigned for the subscription.
    "iban", // (Required for "CASHBACK" deals) International Bank Account Number for cashback deal. IBAN needs to be between 15 and 34 alphanumeric characters long.
    "bic", // (Optional) BIC number. This needs to be maximum 12 alphanumeric characters long.
    "referral_code", // (Optional) Referral code of the referring partner
    "delivery_address_id", // (Optional) Id of the delivery address. The id should be an address id which is taken from List User Addresses
  ])
  public subscribeToDeal(data: ISubscribeToDealInput) {
    return this._call("deal-subscribe", data, {
      hashKeys: ["ref"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/List_vouchers")
  @filterInput([
    "user_guid", // Subscribed or invited user's GUID
    "show", // Flag to attache additional detailed to response object. Has two possible values 'basic' and 'extended'. Response object will contain 'owner' and 'pet' information for the extended
    "from", // Date time value to filter on creation date/subscription date (date is taken according to the status filter)
    "to", // Date time value to filter on creation date/subscription date (date is taken according to the status filter)
    "redeemed_from", // Date time value to filter on redeemed date
    "redeemed_to", // Date time value to filter on redeemed date
    "barcode", // Barcode value to filter. This could be full or a part of the barcode
    "partner_extid", // To filter on the specified partner. Allowed only valid external-customer-id.
    "deal_ref", // Deal reference. Filter on the specified deal.
    "status", // The status of the coupons subscription to filter. allowed values INVITED,SUBSCRIBED,REDEEMED.
    "inv_resend_count", // To filter on the number of invitation send
    "sort_field", // Field name to be apply the sorting. Allowed fields ts_created,subs_partner_id,coupon_id,status,num_invi_resend,ts_last_send,partner_name,user_identity
    "sort_order", // Sort order. possible values are DESC,ASC
    "q", // Can apply global searching on partner name and the user identity which use to send the invitation
    "p_length", // Item per page
    "p_page", // current page. start at 0
  ])
  public listVouchers(data: {
    user_guid: string;
    show: string;
    from: string;
    to: string;
    redeemed_from: string;
    redeemed_to: string;
    barcode: string;
    partner_extid: string;
    deal_ref: string;
    status: string;
    inv_resend_count: string;
    sort_field: string;
    sort_order: string;
    q: string;
    p_length: number;
    p_page: number;
  }) {
    return this._call("listoffers", data, {
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/List_Eligible_Pets")
  @filterInput(["deal_ref", "user_guid"])
  public listEligiblePets(data: {
    deal_ref: string;
    user_guid: string;
  }): Promise<{ data: IDealEligiblePet[] }> {
    return this._call("list-eligible-pets", data, {
      hashKeys: undefined,
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_product_list")
  @filterInput(["deal_ref"])
  public getProductList(data: {
    deal_ref: string;
  }): Promise<{ data: IDealProduct[] }> {
    return this._call("get-product-list", data, {
      hashKeys: ["deal_ref"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Check_secure_code")
  @filterInput(["deal_ref", "code"])
  public checkSecureCode(data: {
    deal_ref?: string;
    code: string;
  }): Promise<{
    data: {
      is_available: boolean;
      deals: string[];
    };
  }> {
    return this._call("check-secure-code", data, {
      hashKeys: ["deal_ref", "code"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/New_secure_code")
  @filterInput(["deal_ref"])
  public getSecureCode(data: {
    deal_ref?: string;
  }): Promise<{
    data: {
      code: string;
    };
  }> {
    return this._call("generate-secure-code", data, {
      hashKeys: ["deal_ref"],
      retry: true,
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Get_List_of_eligible_Direct_Cashback_Deals",
  )
  @filterInput(["user_guid"])
  public listEligibleDirectCashbackDeals(data: {
    user_guid: string;
    pet_guid?: string;
    child_guid?: string;
  }): Promise<{
    data: IUserEligibleDirectCashbackDeal[];
  }> {
    return this._call("list-direct-cashback-eligible-deals", data, {
      retry: true,
      hashKeys: undefined,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_direct_cashback_deal_details")
  @filterInput(["ref"])
  public getDirectCashbackDealDetail(data: {
    ref: string;
  }): Promise<{
    data: IDirectCashbackDealDetail;
  }> {
    return this._call("get-direct-cashback-deal-details", data, {
      retry: true,
      hashKeys: undefined,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_direct_cashback_voucher_list")
  @filterInput([
    "user_guid", // (Required) Subscribed user's GUID
    "pet_guid", // (optional) Pet GUID of the subscription
    "child_guid", // (Optional) A Child guid of the user.
    "from", // (optional) Date time value to filter on creation date/subscription date
    "to", // (optional) Date time value to filter on creation date/subscription date
    "deal_ref", // (optional) Deal reference. Filter on the specified deal.
    "p_length", // (Required) Item per page
    "p_page", // (Required) current page. start at 0
  ])
  public getDirectCashbackVoucherList(
    data: IDirectCashbackVoucherListInput,
  ): Promise<{
    data: IDirectCashbackVoucherList;
  }> {
    return this._call("get-direct-cashback-voucher-list", data, {
      retry: true,
      hashKeys: undefined,
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Subscribe_to_a_Direct_Cashback_Deal",
  )
  @filterInput([
    "user_guid", // GUID of an active user
    "deal_ref", // Deal reference code
    "pet_guid", // A Pet guid of the user. If pet is not required for the deal, no pet is assigned for the subscription.
    "child_guid", // A Child guid of the user. This is required if the deal restricted for child limitations. Otherwise it can be empty.
  ])
  public subscribeToDirectCashbackDeal(
    data: ISubscribeToDirectCashbackDealInput,
  ) {
    return this._call("direct-cashback-subscribe", data, {
      retry: true,
      hashKeys: undefined,
    });
  }

  private _call(
    action: string,
    data: IApiPostData,
    options: IApiFetchOptions = {},
  ) {
    return this.post(
      "/",
      {
        action,
        ...data,
      },
      {
        hashKeys: ["action"],
        ...options,
      },
    );
  }
}
