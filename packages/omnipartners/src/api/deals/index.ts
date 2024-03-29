import Api, { IApiFetchOptions, IApiPostData } from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";
import {
  IDeal,
  IDealListItem,
  IDirectCashbackDealDetail,
  IDirectCashbackRedemptionInput,
  IDirectCashbackRedemptionRequestInput,
  IDirectCashbackVoucherDetail,
  IUserDirectCashbackDealEligiblePet,
  IUserEligibleDirectCashbackDeal,
} from "../../types";
import { IDealProduct } from "../../deal-types";

export interface IRedeemWithReceiptInput {
  barcode: string; // Subscription barcode without any formattings
  receipt_date: string; // Date of the receipt
  mime_type: string; // Mime type of the receipt image.
  product_ean_code?: string; // EAN code of the product.
  redemption_partner_extid?: string; // external-customer-id of the redemption partner.
}

export interface IGetDealsListInput {
  partner_extid?: string;
  saving_product_ean?: string;
  saving_collection_reference?: string;
  benefit_product_ean?: string;
  benefit_collection_reference?: string;
  pet_search_by?: "PET_UNIVERSE" | "PET_BREED" | "PET_TYPE";
  pet_search_val?: string;
  deal_type?: string;
  display_on_terminal?: 0 | 1;
  deal_visibility?: "all" | "public";
  active_only?: 0 | 1;
  deal_group_handle?: string;
  excl_deal_group_handle?: string;
}

interface IUpdateSecureCodePropertiesInput {
  access_code: string;
  status?: string;
  referral_partner_ext_id?: string;
  expiry_date?: string;
  deal_ref?: string;
}

export interface ISubscribeToDealInput {
  user_guid: string;
  ref: string;
  partner_extid?: string;
  ean_code?: string;
  collection_ref?: string;
  secure_code?: string;
  pet_guid?: string;
  child_guid?: string;
  external_tracking_ref?: string;
  iban?: string;
  bic?: string;
  referral_code?: string;
  referral_code_type?: string;
  delivery_address_id?: string;
  lang?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
}

interface ISubscribeToDealReturnPartner {
  name: string;
  street1: string;
  street2: string;
  streetnum: string;
  postal_code: string;
  city: string;
  region: string;
  country: string;
  id: string;
  extid: string;
  type: string;
  lat: string;
  lng: string;
  pub_name: string;
  pub_street1: string;
  pub_street2: string;
  pub_streetnum: string;
  pub_postal_code: string;
  pub_city: string;
  pub_region: string;
  pub_country: string;
  distance: string;
  ptn_status: string;
}

export interface ISubscribeToDealReturn {
  id: number;
  user_guid: string;
  external_tracking_reference: string;
  ts_created: string;
  barcode: string;
  secure_code: string;
  subs_partner_id: number;
  coupon_id: number;
  status: string;
  pet_guid: string;
  pet_status: string;
  ts_redeemed: string;
  barcode_url: string;
  ts_subscribe: string;
  product_id: string;
  product: string;
  saving_end_date: string;
  redeem_validity_from: string;
  redeem_validity_to: string;
  redirect_url: string;
  referral_partner: string[];
  delivery_address: string[];

  partner: ISubscribeToDealReturnPartner;
  deal: IDeal;
}

export interface ISubscribeToDirectCashbackDealInput {
  user_guid: string;
  deal_ref: string;
  pet_guid?: string;
  child_guid?: string;
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
  p_length?: string;
  p_page?: string;
}

interface IPageInfo {
  p_total: number;
  p_length: number;
  p_page: number;
}

export interface IDirectCashbackVoucherList extends IPageInfo {
  records: IDirectCashbackVoucherListItem[];
}

export interface IDirectCashbackVoucherListItem {
  user_guid: string;
  barcode: string;
  pet_guid?: string;
  child_guid?: string;
  status: string;
  ts_created: string;
  benefit_id?: string;
  deal_ref: string;
  benefit_amount?: string;
  benefit_currency?: string;
  benefit_product_id?: string;
  redemption_request_in_progress: 0 | 1;
  subs_ts_subscribe: string;
  external_tracking_reference?: string;
  subs_partner_id?: string;
  coupon_id: number;
  ts_redeemed?: string;
  restriction_code?: string;
  redeem_validity_from: string;
  redeem_validity_to: string;
  num_invi_resend: number;
  ts_last_send?: string;
  invt_link?: string;
}

export interface IDirectCashbackRedemptionRequestListInput {
  user_guid: string;
  status?: string;
  barcode?: string;
  sort_field?: string;
  sort_order?: string;
  p_length?: string;
  p_page?: string;
}

export interface IDirectCashbackRedemptionRequestDetailInput {
  receipt_id?: string;
}

export interface IDirectCashbackRedemptionRequestDetail {
  id: string;
  image_url: string;
  barcode: string;
  payment_type: string;
  status: string;
  benefit: IDirectCashbackRedemptionRequestDetailBenefit;
  iban: string;
  bic: string;
  created_on: string;
  updated_on: string;
}

export interface IDirectCashbackRedemptionRequestDetailBenefit {
  amount: string;
  currency: string;
}

export interface IDirectCashbackDealBenefit {
  benefit_id: string;
  benefit_value: string;
  benefit_type: string;
}

export interface IDirectCashbackRedemptionRequestList extends IPageInfo {
  records: IDirectCashbackRedemptionRequestListItem[];
}

export interface IDirectCashbackRedemptionRequestListItem {
  user_guid: string;
  image_url: string;
  benefit_id: string;
  barcode: string;
  status: string;
  iban: string;
  bic: string;
  created_on: string;
  updated_on: string;
  deal: {
    ref: string;
  };
}

interface IDirectCashbackVoucherApprovalHistorySubscriptionHistory {
  status: string;
  changed_on: string;
}

interface IDirectCashbackVoucherApprovalHistoryRedemptionRequestHistory {
  id: string;
  created_on: string;
  updated_on: string;
  transaction_id: string;
  external_payment_ref: string;
  payment_ref: {
    iban: string;
  };
  payment_id: string;
  estimated_delivery_date: string;
  status: string;
  image_url: string;
  history: {
    changed_on: string;
    old_status: string;
    new_status: string;
    message: string;
    error?: string;
    description?: string;
  }[];
}

export interface IDirectCashbackVoucherApprovalHistory {
  sub_id: string;
  sub_barcode: string;
  sub_current_status: string;
  sub_created: string;
  sub_updated: string;
  sub_history: IDirectCashbackVoucherApprovalHistorySubscriptionHistory[];
  sub_redemption_requests: IDirectCashbackVoucherApprovalHistoryRedemptionRequestHistory[];
}

export type IDirectCashbackDealDataOptions =
  | IDirectCashbackDealDataOption
  | IDirectCashbackDealDataOption[];
type IDirectCashbackDealDataOption =
  | "basic_details"
  | "benefits"
  | "benefit_product_detail";

export interface IDirectCashbackDealDetailInput {
  ref: string;
  default_lang?: string;
  data_options?: IDirectCashbackDealDataOptions;
}

export type IDealDataOptions = IDealDataOption | IDealDataOption[];
type IDealDataOption =
  | "collection_association"
  | "basic_details"
  | "products"
  | "product_collections"
  | "product_collection_images"
  | "product_quantity_details"
  | "benefits"
  | "benefit_product_details"
  | "benefit_products"
  | "benefit_product_collections"
  | "benefit_product_collection_images"
  | "partner_restriction_detail"
  | "partner_restrictions"
  | "groups"
  | "pet_restrictions"
  | "loyalty_reward"
  | "pet_tags"
  | "pet_stages"
  | "subscription_limit";

export type IDealSubscriptionDataOptions =
  | IDealSubscriptionDataOption
  | IDealSubscriptionDataOption[];
type IDealSubscriptionDataOption = "partner";

export type DealType =
  | "COUPON"
  | "PRESENT"
  | "SAVING"
  | "PAYING"
  | "LOYALTY"
  | "CASHBACK"
  | "DIRECT CASHBACK";

type IVoucherListInputDealTypes = DealType | DealType[];

export interface IVoucherListInput {
  user_guid?: string;
  pet_guid?: string;
  child_guid?: string;
  show?: "basic" | "extended";
  from?: string;
  to?: string;
  redeemed_from?: string;
  redeemed_to?: string;
  barcode?: string;
  external_tracking_ref?: string;
  partner_extid?: string;
  deal_ref?: string;
  deal_types?: IVoucherListInputDealTypes;
  redemption_request_status?: string;
  deal_data_options?: IDealDataOptions;
  data_options?: IDealSubscriptionDataOptions;
  coupon_id?: string;
  status?: "INVITED" | "SUBSCRIBED" | "REDEEMED";
  inv_resend_count?: string;
  sort_field?: string;
  sort_order?: string;
  q?: string;
  p_length?: number;
  p_page?: number;
  default_lang?: string;
}

export interface IVoucher {
  user_guid: string;
  pet_guid: string | null;
  child_guid: string | null;
  ts_created: string;
  subs_ts_subscribe: string | null;
  external_tracking_reference: string | null;
  barcode: string;
  subs_partner_id: number;
  coupon_id: number;
  status: string;
  deal_ref: string;
  ts_redeemed: string | null;
  restriction_code: string | null;
  redeem_validity_from: string | null;
  redeem_validity_to: string | null;

  product: string;
  num_invi_resend: number;
  ts_last_send: string;
  invt_link: string;

  // show: "extended"
  partner: {
    name: string;
    street1: string;
    street2: string;
    streetnum: string;
    postal_code: string;
    city: string;
    region: string;
    country: string;
    id: string;
    extid: string;
    type: string;
    lat: string;
    lng: string;
    pub_name: string;
    pub_street1: string;
    pub_street2: string;
    pub_streetnum: string;
    pub_postal_code: string;
    pub_city: string;
    pub_region: string;
    pub_country: string;
    distance: string;
    ptn_status: string;
  };
  child?: {
    child_birthday: string;
    child_added_on: string;
    child_updated_on: string;
    child_gender: string;
    child_guid: string;
    child_first_name: string;
    child_parent: string;
    child_status: string;
    child_ext_id: string;
  };
  deal?: IDeal;
}

export interface IVoucherDetail {
  id: string;
  user_guid: string;
  barcode: string;
  status: string;
  pet_guid: string;
  ts_redeemed: string;
  active_redemption_request_status: string;
  ts_subscribed: string;
  redeem_validity_from: string;
  redeem_validity_to: string;
  deal: IDeal;
  ts_created: string;
  secure_code?: string;
  subs_partner_id?: string;
  coupon_id: number;
  is_in_redeemable_status: 0 | 1;
  is_redeemed: boolean;
  pet_status: string;
  redeem_partner_id?: string;
  redeem_partner: string[];
  barcode_url?: string;
  product_id: string;

  // deal_data_options: `benefits`
  benefit: IVoucherBenefit;
}

export interface IVoucherBenefit {
  product_id?: string;
  amount?: string;
  currency?: string;
}

export interface IVoucherDetailInput {
  barcode: string;
  coupon_id?: string;
  deal_data_options?: IDealDataOptions;
  data_options?: IDealSubscriptionDataOptions;
}

export interface IGetVisiblePartnerInput {
  deal_ref: string;
  user_guid: string;
  search?: string;
  favorite_only?: boolean;
  partner_lat?: string;
  partner_lng?: string;
  radius?: string;
  p_page?: number;
  p_length?: number;
  limit?: number;
}

export type IRegisteredPartnerDataOptions =
  | IRegisteredPartnerDataOption
  | IRegisteredPartnerDataOption[];
type IRegisteredPartnerDataOption =
  | "public_info"
  | "location"
  | "groups"
  | "logo";

export interface IGetRegisteredPartnerInput {
  deal_ref: string;
  search_term?: string;
  partner_lat?: string;
  partner_lng?: string;
  radius?: string;
  p_page: number;
  p_length?: number;
  partner_type?: string;
  partner_status?: string;
  partner_group?: string;
  partner_mode?: "subscription" | "redemption" | "referral";
  data_options?: IRegisteredPartnerDataOptions;
}

export interface IDealPartner {
  name: string;
  street1?: string;
  street2?: string;
  streetnum?: string;
  postal_code?: string;
  city?: string;
  region?: string;
  country?: string;
  id: string;
  extid: string;
  type: string;
  lat?: string;
  lng?: string;
  pub_name?: string;
  pub_street1?: string;
  pub_street2?: string;
  pub_streetnum?: string;
  pub_postal_code?: string;
  pub_city?: string;
  pub_region?: string;
  pub_country?: string;
  distance?: string;
  ptn_status?: string;
  // data_options: groups
  groups?: string[];
  // data_options: logo
  has_logo?: 0 | 1;
  logo?: string | null;
  logo_small?: string | null;
  logo_medium?: string | null;
  logo_large?: string | null;
}

export type ISecureCodeDataOptions =
  | ISecureCodeDataOption
  | ISecureCodeDataOption[];
type ISecureCodeDataOption =
  | "subscription"
  | "deals"
  | "referral_partner"
  | "expiration_date";

interface IReferralPartner {
  id: string;
  ref_name: string;
  extid: string;
  street1: string;
  street2: string;
  streetnum: string;
  postal_code: string;
  city: string;
  country: string;
  status: string;
}

export interface IRedeemVoucherInput {
  barcode?: string;
  secure_code?: string;
  user_guid?: string;
  pet_guid?: string;
  child_guid?: string;
  external_tracking_ref?: string;
  iban?: string; // Required for "CASHBACK" deals
  bic?: string;
  delivery_address_id?: string;
  ean_code?: string;
  ref?: string; // required for redemption with account and without subscription

  shop_id?: string;
  type?: "terminal" | "extid";
  referral_code?: string;
  referral_code_type?: string;
}

export interface IRedeemVoucherResult {
  data: {
    user_guid: string;
    ts_created: string;
    barcode: string;
    subs_partner_id: number;
    coupon_id: number;
    status: string;
    deal_voucher: IVoucher;
    subscription_status_code: number;
    feedback_msg: string;
  };
  status: string;
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
    2001: { message: "Redeem period expired." },
    2002: { message: "Deal is not active at the moment." },
    2003: { message: "Coupon is already redeemed." },
    2006: { message: "Invalid partner" },
    2008: {
      message: "The voucher already redeemed or canceled by the CC admin.",
    },
    2021: { message: "User GUID is not found in database." },
    3020: { message: "Parameter user_guid not available in the request." },
    3022: { message: "Subscription status code is not set in request." },
    3023: { message: "Subscription status code is not valid text." },
    3026: { message: "The ref parameter not available in the request" },
    3031: { message: "Subscription cannot be found." },
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
    3027: { message: "Can't resolve user." },
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
    3144: { message: "Subscription failure due to secure code expiry." },
    5000: { message: "Internal Error." },

    1023: { message: "Input barcode is not set." },
    1025: { message: "Input barcode is not valid." },
    1027: { message: "Maximum redemption request limit reached." },
    1029: {
      message: "Benefit Id not set. / Invalid Benefit type define in the deal",
    },
    1030: {
      message: "Already redeemed voucher subscription or its in progress.",
    },
    1032: { message: "Benefit Id not found." },
    1035: { message: "Receipt Storage location not configured." },
    1036: { message: "Target currency not set." },
    1037: { message: "Invalid Payment details sent. (eg: Invalid IBAN)" },
    1038: { message: "Invalid currency code." },
    1039: { message: "Invalid payment detail parameters sent." },
    1040: { message: "Invalid customer details." },
    1042: { message: "Voucher cannot redeem." },
    1047: { message: "Issue in refund service connection." },
    1046: { message: "Already paid IBAN is used." },
    1048: {
      message: "Maximum number of payment count for the selected IBAN reached.",
    },
    1049: {
      message: "Maximum date for submitting the redemption request exceed.",
    },
    1050: { message: "Reward purchase transaction id not sent." },
    1051: { message: "Reward purchase transaction id not found." },
    1052: {
      message: "Invalid purchase amount get from reward purchase transaction.",
    },
    1053: { message: "Reward purchase transaction id already used." },
    3025: { message: "Subscription was expired, so cannot redeem it." },
    3050: { message: "Invalid subscription." },
    3062: { message: "Missing required parameter." },
    3124: { message: "Invalid benefit amount." },
    3048: { message: "Already redeemed coupon." },
    3094: { message: "Invalid receipt date." },
    3096: { message: "Invalid image mime type." },
    3115: { message: "Subscription failure due to user status." },
    3119: { message: "Fail due to pet inclusion/exclusion restrictions" },
    3118: { message: "Parameter 'pet_guid' not available in the request" },
    3120: { message: "Fail due to pet stage inclusion/exclusion restrictions" },
    3121: {
      message: "Fail due to purchase place inclusion/exclusion restrictions",
    },
    3122: {
      message:
        "Fail due to concurrent subscription is not allowed for the deal",
    },
    3127: { message: "User doesn't have a pet in allowed date pool limit." },
    3128: { message: "User doesn't have a pet in allowed neutered state." },
    3131: {
      message: "Required parameter 'child_guid' not available in the request",
    },
    3132: { message: "Invalid 'child_guid'." },
    3133: { message: "Subscription failure due to child gender." },
    3134: { message: "Subscription failure due to child age." },
    3135: { message: "Subscription failure due to child count." },
    3116: {
      message:
        "Subscription failure due to invalid external tracking reference format.",
    },
    3123: {
      message:
        "Invalid Referral code type. Valid values are 'referral_code' or 'ext_id'",
    },
  };

  @doc("https://doc.clixray.com/index.php?title=Get_deals_list")
  @filterInput([
    "partner_extid",
    "saving_product_ean",
    "saving_collection_reference",
    "benefit_product_ean",
    "benefit_collection_reference",
    "pet_search_by",
    "pet_search_val",
    "deal_type",
    "display_on_terminal",
    "deal_visibility",
    "active_only",
    "deal_group_handle",
    "excl_deal_group_handle",
  ])
  public getDealsList(
    data: IGetDealsListInput,
  ): Promise<{ data: IDealListItem[]; status: string }> {
    return this._call("list-deals", data, {
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_deals_details")
  @filterInput([
    "ref", // (Required) Deal reference code
    "default_lang", // (Optional) Language code.
    "data_options", // This defines information that is returned in the deal details object. Multiple values should be comma separated. For more information please refer Deal Data Options.
  ])
  public getDeal({
    data_options,
    ...data
  }: {
    ref: string;
    default_lang: string;
    data_options?: IDealDataOptions;
  }): Promise<{ data: IDeal }> {
    return this._call(
      "get-deal-details",
      {
        ...data,
        data_options: data_options
          ? Array.isArray(data_options)
            ? data_options.join(",")
            : data_options
          : undefined,
      },
      {
        hashKeys: ["ref"],
        retry: true,
      },
    );
  }

  @doc("https://doc.clixray.com/index.php?title=Get_registered_partners")
  @filterInput([
    "deal_ref", // (Required) Deal reference
    "search_term", // (Optional) Search term of the partner. This could be "Partner invoice name", "Partner public name" or "Partner email"
    "p_length", // (Optional) Item per page
    "p_page", // (Optional) current page. start at 0
    "partner_lat", // (Optional) latitude value of the base location of the search
    "partner_lng", // (Optional) longitude value of the base location of the search
    "radius", // (Optional) Radius in km, If not set then it set as 10km, Service will check partners located with in that "Radius"
    "partner_type", // (Optional) Filter partners by their type. Eg: partner_type:"type1" Or partner_type:"type1,type2"
    "partner_group", // (Optional) Filter partners by their partner group handle. Eg: partner_group:"handle_1" Or partner_group:"handle_1,handle_2"
    "partner_mode", // (Optional) Filter partners by subscription,redemption or referral. Valid values are "subscription","redemption" or "referral". Default value is "subscription"
    "partner_status", // (Optional) Used to filter results using partner status. If this is not specified, default value is "A".
    "data_options", // (Optional) This defines the partner information that is returned in the result. For more information please refer Deal Partner Data Options.
  ])
  public getRegisteredPartners({
    data_options,
    ...data
  }: IGetRegisteredPartnerInput): Promise<
    {
      data: IDealPartner[];
    } & IPageInfo
  > {
    return this._call(
      "get-registered-partners",
      {
        ...data,
        data_options: data_options
          ? Array.isArray(data_options)
            ? data_options.join(",")
            : data_options
          : undefined,
      },
      {
        hashKeys: ["deal_ref"],
        retry: true,
      },
    );
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
  public getVisiblePartner(
    data: IGetVisiblePartnerInput,
  ): Promise<
    {
      data: IDealPartner[];
    } & IPageInfo
  > {
    return this._call("get-visible-partners-for-user", data, {
      hashKeys: ["deal_ref"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Check_partner_validity")
  @filterInput([
    "deal_ref", // (Required) Deal reference
    "partner_extid", // (Required) Partner extid that need to check the validity for give deal
  ])
  public checkPartnerValidity(data: {
    deal_ref: string;
    partner_extid: string;
  }): Promise<{ data: { is_valid: boolean } }> {
    return this._call("check-partner-validity", data, {
      hashKeys: ["deal_ref"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Check_deal_validity")
  @filterInput(["user_guid", "pet_guid", "child_guid", "deal_ref"])
  public checkDealValidity(
    data:
      | {
          user_guid: string;
          deal_ref: string;
        }
      | {
          user_guid: string;
          pet_guid: string;
          deal_ref: string;
        }
      | {
          user_guid: string;
          child_guid: string;
          deal_ref: string;
        },
  ) {
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
    "collection_ref", // Reference to a collection which will be stored along with the subscription
    "secure_code", // (Required for locked deals) available secure code for the deal
    "pet_guid", // (Optional) A Pet guid of the user. If omitted, the system will try to get a applicable pet from the user's pets. If pet is not required for the deal, no pet is assigned for the subscription.
    "child_guid", // A Child guid of the user. This is required if the deal restricted for child limitations. Otherwise it can be empty.
    "external_tracking_ref", // External tracking reference code.
    "iban", // (Required for "CASHBACK" deals) International Bank Account Number for cashback deal. IBAN needs to be between 15 and 34 alphanumeric characters long.
    "bic", // (Optional) BIC number. This needs to be maximum 12 alphanumeric characters long.
    "referral_code", // (Optional) Referral code of the referring partner
    "referral_code_type", // Referral code type of the referring partner. Valid values are 'referral_code' or 'ext_id'. Default value is 'referral_code'.
    "delivery_address_id", // (Optional) Id of the delivery address. The id should be an address id which is taken from List User Addresses
    "lang",
    "utm_source", // (Optional), UTM source for the subscription
    "utm_campaign", // (Optional), UTM campaign for the subscription
    "utm_medium", // (Optional), UTM medium for the subscription
  ])
  public subscribeToDeal(
    data: ISubscribeToDealInput,
  ): Promise<{ data: ISubscribeToDealReturn }> {
    return this._call("deal-subscribe", data, {
      hashKeys: ["ref"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/List_vouchers")
  @filterInput([
    "user_guid", // Subscribed or invited user's GUID
    "pet_guid", // Pet GUID of the subscription
    "child_guid", // A Child guid of the user
    "show", // Flag to attache additional detailed to response object. Has two possible values 'basic' and 'extended'. Response object will contain 'owner' and 'pet' information for the extended
    "from", // Date time value to filter on creation date/subscription date (date is taken according to the status filter)
    "to", // Date time value to filter on creation date/subscription date (date is taken according to the status filter)
    "redeemed_from", // Date time value to filter on redeemed date
    "redeemed_to", // Date time value to filter on redeemed date
    "barcode", // Barcode value to filter. This could be full or a part of the barcode
    "external_tracking_ref", // External tracking reference. Filter on the specified external_tracking_ref.
    "partner_extid", // To filter on the specified partner. Allowed only valid external-customer-id.
    "deal_ref", // Deal reference. Filter on the specified deal.
    "deal_types", // Deal Types. Filter on the specified deal types. allowed values COUPON, PRESENT, SAVING, PAYING, LOYALTY, CASHBACK, DIRECT CASHBACK
    "redemption_request_status", // The status of the cashback receipt. allowed values ACTIVE, PENDING, PENDING_FILE, PENDING_PROCESSING, PROCESSING, REJECTED, PAYMENT_PENDING, PAYMENT_PROCESSING, PAYMENT_SENT, PAYMENT_REJECTED
    "deal_data_options", // This defines information that is returned in the deal details node
    "data_options", // This defines information that is returned in the deal subscription details node
    "coupon_id", // you can use coupon_id instead of barcode if it available
    "status", // The status of the coupons subscription to filter. allowed values INVITED,SUBSCRIBED,REDEEMED.
    "inv_resend_count", // To filter on the number of invitation send
    "sort_field", // Field name to be apply the sorting. Allowed fields ts_created,subs_partner_id,coupon_id,status,num_invi_resend,ts_last_send,partner_name,user_identity
    "sort_order", // Sort order. possible values are DESC,ASC
    "q", // Can apply global searching on partner name and the user identity which use to send the invitation
    "p_length", // Item per page
    "p_page", // current page. start at 0
    "default_lang",
  ])
  public listVouchers(
    data: IVoucherListInput,
  ): Promise<
    {
      data: IVoucher[];
      status: string;
    } & IPageInfo
  > {
    return this._call("listoffers", data, {
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Redeem_voucher")
  @filterInput([
    "shop_id", // If you use terminal id, then the “type” parameter needs to be “terminal”. For the external customer id, the “type” parameter needs to be “extid”.
    "type",
    "referral_code",
    "referral_code_type",
    "barcode",
    // REDEMPTION WITH ACCOUNT AND WITHOUT SUBSCRIPTION
    "ref", // (Required) deal reference code
    "secure_code", // (Required for locked deals), available secure code for the deal
    "ean_code", // (depend on deal)	EAN code of the product, This is required if the deal restricted to a certain product or product group. Otherwise it can be empty.
    "external_tracking_ref", // (Optional) External tracking reference code. This needs to be maximum 20 alphanumeric characters long.
    "bic", // (Optional)	BIC number. This needs to be maximum 12 alphanumeric characters long.
    "delivery_address_id", // (Optional) Id of the delivery address. The id should be an address id which is taken from List User Addresses
    "iban", // (Required for "CASHBACK" deals) International Bank Account Number for cashback deal. IBAN needs to be between 15 and 34 alphanumeric characters long.
    "user_guid", // (Optional) GUID of an active user. This is required if pet_guid or child_guid is not provided.
    "pet_guid", // (Optional) GUID of a pet. User GUID will be retrieved from this if user_guid is not provided. This is required if the deal restricted for pet limitations. Otherwise it can be empty.
    "child_guid", // (Optional) GUID of a child. User GUID will be retrieved from this if user_guid is not provided. This is required if the deal restricted for child limitations. Otherwise it can be empty.
  ])
  public redeemVoucher(
    data: IRedeemVoucherInput,
  ): Promise<IRedeemVoucherResult> {
    return this._call("redemption", data, {
      hashKeys: [
        data.barcode ? "barcode" : data.secure_code ? "secure_code" : "",
      ],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_deals_subscription_details")
  @filterInput([
    "barcode", // (Required) Subscription barcode without any formattings
    "coupon_id", // (Optional) you can use coupon_id instead of barcode if it available. 'coupon_id' is internal sequence id, it's available in the List coupons result set. You need to use either barcode or coupon_id
    "deal_data_options", // (Optional) This defines information that is returned in the deal details node. For more information please refer Deal Data Options.
    "data_options", // (Optional) This defines information that is returned in the deal subscription details node. For more information please refer Deal Subscription Data Options.
  ])
  public getVoucherDetail(
    data: IVoucherDetailInput,
  ): Promise<{ data: IVoucherDetail }> {
    return this._call("get-subscription-details", data, {
      retry: true,
      hashKeys: ["barcode", "coupon_id"],
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
  @filterInput(["deal_ref", "code", "data_options"])
  public checkSecureCode({
    data_options,
    ...data
  }: {
    deal_ref?: string;
    code: string;
    data_options?: ISecureCodeDataOptions;
  }): Promise<{
    data: {
      is_available: boolean;
      deals: string[];
      referral_partner?: IReferralPartner;
    };
  }> {
    return this._call(
      "check-secure-code",
      {
        ...data,
        data_options: data_options
          ? Array.isArray(data_options)
            ? data_options.join(",")
            : data_options
          : undefined,
      },
      {
        hashKeys: ["deal_ref", "code"],
        retry: true,
      },
    );
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

  @doc("http://doc.omnipartners.be/index.php/Update_secure_code_properties")
  @filterInput([
    "access_code", // (Required) Updating access code
    "status", // (optional) The status of the access code. This can only be 'AVAILABLE' or 'PUBLISHED'.
    "referral_partner_ext_id", // (optional) Ext ID of the referral partner.
    "expiry_date", // (optional) Expiry date of the access code. (ex: "2019-03-12 11:10:49")
    "deal_ref", // (optional) New deal reference for the access code. This will update the deal of the access code only if the code status is 'AVAILABLE'
  ])
  public updateSecureCodeProperties(
    data: IUpdateSecureCodePropertiesInput,
  ): Promise<{
    successCode: number;
  }> {
    return this._call("update-access-code-properties", data, {
      hashKeys: undefined,
      retry: true,
      errorMap: {
        1019: { message: "Referral partner ext id not exist." },
        3062: { message: "At least one parameter must provide to update." },
        3063: { message: "Access code does not exist." },
        3129: {
          message:
            "Invalid status provided. Valid values are 'AVAILABLE' and 'PUBLISHED'.",
        },
        3130: { message: "Error on updating the record." },
      },
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Get_List_of_eligible_Direct_Cashback_Deals",
  )
  @filterInput(["user_guid", "pet_guid", "child_guid"])
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

  @doc(
    "http://doc.omnipartners.be/index.php/List_Direct_Cashback_Eligible_Pets",
  )
  @filterInput(["user_guid", "deal_ref"])
  public listDirectCashbackEligiblePets(data: {
    deal_ref: string;
    user_guid: string;
  }): Promise<{
    data: IUserDirectCashbackDealEligiblePet[];
  }> {
    return this._call("list-direct-cashback-eligible-pets", data, {
      retry: true,
      hashKeys: undefined,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_direct_cashback_deal_details")
  @filterInput([
    "ref", // (Required) Deal reference code
    "default_lang", // (Optional) Language code.
    "data_options", // (Optional) This defines information that is returned in the deal details object. Multiple values should be comma separated. For more information please refer Direct Cashback Deal Data Options.
  ])
  public getDirectCashbackDealDetail(
    data: IDirectCashbackDealDetailInput,
  ): Promise<{
    data: IDirectCashbackDealDetail;
  }> {
    return this._call(
      "get-direct-cashback-deal-details",
      {
        ...data,
        data_options: data.data_options
          ? Array.isArray(data.data_options)
            ? data.data_options.join(",")
            : data.data_options
          : undefined,
      },
      {
        retry: true,
        hashKeys: undefined,
      },
    );
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
    "http://doc.omnipartners.be/index.php/Get_direct_cashback_voucher_details",
  )
  @filterInput(["barcode", "deal_data_options"])
  public getDirectCashbackVoucherDetail({
    deal_data_options,
    ...data
  }: {
    barcode: string;
    deal_data_options?: IDirectCashbackDealDataOptions;
  }): Promise<{
    data: IDirectCashbackVoucherDetail;
  }> {
    return this._call(
      "get-direct-cashback-voucher-details",
      {
        ...data,
        deal_data_options: deal_data_options
          ? Array.isArray(deal_data_options)
            ? deal_data_options.join(",")
            : deal_data_options
          : undefined,
      },
      {
        retry: true,
        hashKeys: undefined,
      },
    );
  }

  @doc("https://doc.clixray.com/index.php?title=Find_Benefit")
  @filterInput([
    "deal_ref", // (Required) Direct cashback deal reference
    "product_ean", // (Required) EAN of the product
  ])
  public getDirectCashbackDealBenefit(data: {
    product_ean: string;
    deal_ref: string;
  }): Promise<{
    data: IDirectCashbackDealBenefit;
  }> {
    return this._call("find-benefit", data, {
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
  ): Promise<{
    barcode: string;
    status: number;
  }> {
    return this._call("direct-cashback-subscribe", data, {
      retry: true,
      hashKeys: undefined,
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Create_direct_cashback_redemption_request",
  )
  @filterInput([
    "barcode", // (Required) Subscription barcode without any formattings
    "benefit_id", // (Optional) The befit id of the deal
    "receipt_date", // (Required) Date of the receipt
    "receipt_image_mime_type", // (Required) Mime type of the receipt image.
    "target_currency", // (Required) Target currency code Eg: EUR / GBP
    "payment_details", // (Required) Details of the payment, It should be a json object.
    "benefit_product_ean", // (Optional) ean of the purchased product. This is required for the deals which are having percentage benefit amount for products.
    "benefit_product_purchase_value", // (Optional) Purchase value of the product. This is required for the deals which are having percentage benefit amount for products.
    "tier_purchase_receipt_image_mime_type", // Mime type of the non product purchased receipt image to verify the purchase. This is required if the purchase is non product based.
  ])
  public createDirectCashbackRedemptionRequest(
    data: IDirectCashbackRedemptionRequestInput,
  ): Promise<{
    data: {
      presigned_url: string;
      tier_purchase_image_presigned_url?: string;
    };
  }> {
    return this._call("create-direct-cashback-redemption-request", data, {
      retry: true,
      hashKeys: (d) =>
        [
          "key",
          ...Object.keys(d).filter((k) => k !== "payment_details"),
        ].sort(),
    });
  }

  @doc(
    "https://doc.clixray.com/index.php?title=Create_direct_cashback_redemption",
  )
  @filterInput([
    "barcode", // (Required) Subscription barcode without any formatting
    "transaction_id", // (Required) Transaction id of the reward purchase transaction
    "payment_details", // (Required) Details of the payment, It should be a json object.
  ])
  public createDirectCashbackRedemption(
    data: IDirectCashbackRedemptionInput,
  ): Promise<{
    statusCode: string;
  }> {
    return this._call("create-direct-cashback-redemption", data, {
      hashKeys: (d) =>
        [
          "key",
          ...Object.keys(d).filter((k) => k !== "payment_details"),
        ].sort(),
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Get_user_direct_cashback_redemption_request_list",
  )
  @filterInput([
    "user_guid", // (Required) Subscribed or invited user's GUID
    "status", // (optional) The status of the cashback reciept. allowed values PENDING, PENDING_FILE, PENDING_PROCESSING, PROCESSING, REJECTED, PAYMENT_PENDING, PAYMENT_PROCESSING, PAYMENT_SENT, PAYMENT_REJECTED
    "barcode", // (optional) The barcode of the direct cashback subscription.
    "sort_field", // (optional) Field name to be apply the sorting. Allowed fields updated_on,receipt_date
    "sort_order", // (optional) Sort order. possible values are DESC,ASC
    "p_length", // (optional) Item per page
    "p_page", // (optional) Current page. start at 0
  ])
  public getDirectCashbackRedemptionRequestList(
    data: IDirectCashbackRedemptionRequestListInput,
  ): Promise<{
    data: IDirectCashbackRedemptionRequestList;
  }> {
    return this._call(
      "get-user-direct-cashback-redemption-request-list",
      data,
      {
        retry: true,
        hashKeys: undefined,
      },
    );
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Get_user_direct_cashback_redemption_request",
  )
  @filterInput([
    "receipt_id", // (optional) Id of the purchase receipt. (see http://doc.omnipartners.be/index.php/Get_user_direct_cashback_purchase_receipt_list).
  ])
  public getDirectCashbackRedemptionRequestDetail(
    data: IDirectCashbackRedemptionRequestDetailInput,
  ): Promise<{
    data: IDirectCashbackRedemptionRequestDetail;
  }> {
    return this._call("get-user-direct-cashback-redemption-request", data, {
      retry: true,
      hashKeys: undefined,
    });
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Get_direct_cashback_voucher_approval_history",
  )
  @filterInput([
    "barcode", // (Required) Barcode of the cashback subscription.
    "lang", // (optional) Language ID will use to filter the collection name. (see http://doc.omnipartners.be/index.php/Language_list)
    "sort_field", // (optional) Field name to be apply the sorting. Allowed fields subscription_changed_on,redeem_history_changed_on
    "sort_order", // (optional) Sort order. possible values are DESC,ASC
  ])
  public getDirectCashbackVoucherApprovalHistory(data: {
    barcode: string;
    lang?: string;
    sort_field?: string;
    sort_order?: "DESC" | "ASC";
  }): Promise<{
    data: IDirectCashbackVoucherApprovalHistory;
  }> {
    return this._call("get-direct-cashback-voucher-approval-history", data, {
      retry: true,
      hashKeys: undefined,
    });
  }

  @doc("https://doc.clixray.com/index.php/Get_Voucher_PDF")
  @filterInput(["barcode"])
  public getVoucherPDF(data: {
    barcode: string;
  }): Promise<{
    url: string;
    status: string;
  }> {
    return this._call("get-voucher-pdf-location", data, {
      retry: true,
      hashKeys: ["barcode"],
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Disable_voucher_redemption")
  @filterInput(["barcode"])
  public disableVoucherRedemption(data: { barcode: string }): Promise<{}> {
    return this._call("disable-voucher-redemption", data, {
      retry: false,
      hashKeys: undefined,
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Send_voucher_email")
  @filterInput(["barcode", "email", "default_lang"])
  public sendVoucher(data: {
    barcode: string;
    email?: string;
    default_lang?: string;
  }): Promise<{}> {
    return this._call("sendvoucher", data, {
      retry: false,
      hashKeys: ["barcode"],
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Redeem_with_Receipt")
  @filterInput([
    "barcode",
    "receipt_date",
    "mime_type",
    "product_ean_code",
    "redemption_partner_extid",
  ])
  public redeemWithReceipt(
    data: IRedeemWithReceiptInput,
  ): Promise<{
    data: {
      presigned_url: string;
    };
  }> {
    return this._call("redeem-with-receipt", data, {
      retry: false,
      hashKeys: ["barcode"],
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
