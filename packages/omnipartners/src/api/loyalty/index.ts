import Api, { IApiFetchOptions, IApiPostData } from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";
import {
  ILoyaltyBalance,
  ILoyaltyPointDeduction,
  ILoyaltyPointsExpirationDate,
  ILoyaltyPointStampAddition,
  ILoyaltyTransactionHistory,
  ILoyaltyUserProfile,
} from "../../types";
import { IVoucherDetail } from "../deals";

export interface ILoyaltyRetrieveBalanceInput {
  program_id: string;
  card_program_id?: string;
  auth_type?: "user_guid" | "card_no" | "mobile_no" | "partner_ext_id";
  user_id: string;
}

export interface ILoyaltyRetrieveTransactionHistoryInput {
  program_id: string;
  shop_id?: string;
  partner_ext_id?: string;
  user_id: string;
  starting_record?: string;
  record_count?: string;
  starting_date?: string;
  ending_date?: string;
  filter_null_transactions?: "1";
  sort?:
    | "transaction_date ASC"
    | "transaction_date DESC"
    | "transaction_id ASC"
    | "transaction_id DESC";
}

export interface ILoyaltyGetPointsExpirationDateInput {
  program_reference: string;
  user_id: string;
  user_id_type?: "user_loyalty_card_number" | "user_mobile" | "partner_ext_id";
}

export interface ILoyaltyPointStampAdditionInput {
  program_id: string;
  shop_id: string;
  type?: "terminal" | "extid";
  user_id: string;
  auth_type?: "user_guid" | "card_no";
  message?: string;
  source: "SYSTEM" | "WEBSITE";
  points?: number;
  stamps?: number;
  transaction_ext_id?: string;
  transaction_ext_origin?: string;
}

export interface ILoyaltyPointDeductionInput {
  program_id: string;
  shop_id: string;
  type?: "terminal" | "extid";
  user_id: string;
  auth_type?: "user_guid" | "card_no";
  source: "SYSTEM" | "WEBSITE";
  points: number;
  reason?: "redemption" | "expiration" | "adjustment";
  transaction_ext_id?: string;
  transaction_ext_origin?: string;
}

export interface ILoyaltyEshopPurchaseInput {
  program_id: string;
  shop_id: string;
  user_id: string;
  source: string;
  transaction_ext_id?: string;
  transaction_ext_origin?: string;
  points: number;
}

export interface ILoyaltyeEshopPurchase {
  transactionpoints: number;
  newtotalpoints: number;
  message: string;
  user_profile: ILoyaltyUserProfile;
}

export interface ILoyaltyRetrieveTransactionHistoryResult {
  data: ILoyaltyTransactionHistory[];
  total_records: number;
  selected_records: number;
  status: string;
}

export interface ILoyaltyTransactionHistoryStatsInput {
  program_id: string;
  shop_id?: string;
  partner_ext_id?: string;
  user_id: string;
  start_date?: string;
  end_date?: string;
  filter_null_transactions?: "1";
}

export interface ILoyaltyActivateCardInput {
  source: string;
  program_id?: string;
  card_no?: string;
  mobile_no?: string;
  user_email?: string;
  user_guid?: string;
  shop_id?: string;
  type?: "terminal" | "extid";
  user_language?: string;
  transaction_ext_id?: string;
  transaction_ext_origin?: string;
  init_points?: string;
  init_stamps?: string;
}

export interface ILoyaltyGetCardStatusInput {
  program_id: string;
  card_no: string;
  shop_id?: string;
  type?: "terminal" | "extid";
}

export interface ILoyaltyActivateCardResult {
  status: string;
  user_guid: string;
  message: string;
  extended_rule_messages: string[];
  transactionpoints: number;
  newtotalpoints: string;
  transactionstamps: number;
  new_total_all_stamps: string;
  new_total_partner_stamps: string;
  card_number: string;
}

export interface ILoyaltyPurchaseProductInput {
  source: string;
  user_id: string;
  program_id?: string;
  user_guid?: string;
  shop_id?: string;
  type?: "terminal" | "extid";
  auth_type?: "user_guid" | "card_no" | "mobile_no";
  product_codes?: string;
  transaction_value?: string;
  transaction_points?: string;
  mobile_no?: string;
  user_email?: string;
  transaction_ext_id?: string;
  transaction_ext_origin?: string;
}

export interface ILoyaltyPurchaseInput {
  user_id: string;
  partner_id: string;
  /** required if user_id_type !== user_loyalty_card_number */
  program_reference?: string;
  user_id_type?:
    | "user_guid"
    | "user_loyalty_card_number"
    | "user_mobile"
    | "partner_ext_id";
  partner_id_type?: "terminal" | "partner_ext_id";
  product_codes?: string;
  transaction_value?: string;
  /** ex: EUR, GBP */
  transaction_currency_code?: string;
  transaction_points?: string;
  user_mobile?: string;
  user_email?: string;
  transaction_ext_id?: string;
  transaction_ext_origin?: string;
  /** Format: YYYY-MM-DD  */
  transaction_date?: string;
  custom_logger_info?: string;
}

export interface ILoyaltyListPurchasesInput {
  program_id: string;
  user_guid: string;
  partner_ext_id?: string;
  starting_record?: string;
  record_count?: string;
  start_date?: string;
  end_date?: string;
  sort?: string;
}

export interface ILoyaltyResolveUserGUIDInput {
  /** don't specify program_id if auth_type === mobile_no */
  program_id?: string;
  card_program_id?: string;
  user_id: string;
  auth_type: string;
}

export default class Loyalty extends Api {
  public defaultHost = "https://rewards.clixray.io/points";

  public errorMap = {
    99: { message: "Missing key." },
    100: { message: "Missing action." },
    101: { message: "Missing program ID." },
    102: { message: "Point amount cannot be negative value" },
    103: { message: "Inactive Key" },
    1000: {
      message:
        "Current user total points are insufficient to perform this points deduction action",
    },
    1001: {
      message:
        "Error on performing user points data logging in deduction action",
    },
    1003: { message: "Database access error in Activity Process Action" },
    1004: {
      message: "Points Service Secret is not available for that key.",
    },
    1005: { message: "Points Service Secret key retrieve error" },
    1006: {
      message: "Unauthorized user access, input secret key might be invalid.",
    },
    1008: { message: "Error on performing product purchase action." },
    1009: {
      message:
        "Error on extended logic rule activity process action – Points offerer selection.",
    },
    1010: { message: "Error on performing extended logic rule activities" },
    1011: { message: "Error on performing user points data logging" },
    1012: {
      message:
        "Error on performing instant discount deal - extended rule - Partner currency not set",
    },
    1014: {
      message: "Error on performing instant discount deal - extended rule",
    },
    1023: { message: "Transaction history records not found" },
    1024: { message: "Transaction history records retrieve error" },
    1025: { message: "Invalid Key" },
    1026: { message: "Key retrieve error" },
    1027: { message: "Invalid Secret Key" },
    1042: { message: "Resolve the Card Number - Invalid Request" },
    1043: {
      message: "Resolve the Card Number / Mobile Number - User not found",
    },
    1044: { message: "Associated user account is not active" },
    1045: { message: "Resolve the Card Number - Card not found" },
    1046: { message: "Resolve the Card Number - Card expired" },
    1047: { message: "Resolve the Card Number - Card inactive" },
    1049: { message: "Card-No / Mobile Number - User Record already exist" },
    1051: { message: "Partner terminal map records not found" },
    1053: {
      message:
        "Shop Id (partner Id) not mapped with program OR Partner does not exist or not active.",
    },
    1054: { message: "Authentication key and action not mapped" },
    1055: {
      message: "ptn_ext_customer_id ( partner_ext_id ) record not found",
    },
    1056: { message: "Required fields are not found in service request" },
    1058: { message: "Multiple programs exist for that user" },
    1059: { message: "Internal error - Account Database access error" },
    1060: { message: "Resolve the user - Invalid user_guid sent." },
    1061: { message: "Invalid reason" },
    1062: { message: "Card number does not belong to the partner / group" },
    1063: { message: "Card number does not belong to any program." },
    1064: { message: "Partner extension id records retrieve error" },
    1065: { message: "Key /Action authorization records retrieve error" },
    1066: {
      message: "Partner associated user account is not available in the system",
    },
    1067: { message: "Key not found" },
    1069: { message: "Shop associated programs resolution error" },
    1070: { message: "program_id required" },
    1071: { message: "Internal error - Program id resolution for the card" },
    1072: { message: "User Guid not found for that partner ext id" },
    1073: { message: "Internal error - Check product status" },
    1075: { message: "This phone number is not a valid Mobile Phone number." },
    1076: { message: "Internal error - Strict mobile phone validation error." },
    1089: { message: "Invalid User E-Mail address." },
    1091: { message: "Default program is not set in control center." },
    1092: { message: 'Invalid "Transaction Value" sent in request.' },
    1093: { message: 'Invalid "Transaction Points" sent in request.' },
    1094: { message: "Invalid parameter values sent in request." },
    2000: { message: "Internal error - no more cards available in the range." },
    2001: { message: "Internal error - no virtual card range specified" },
    2002: {
      message:
        "Internal error - Card number you sent with partner/group card range restriction. So partner is required to specify in request.",
    },
    2003: {
      message:
        "Invalid init_points parameter value sent in the request. It should be a number.",
    },
    2004: {
      message:
        "Invalid init_stamps parameter value sent in the request. It should be a number.",
    },
    2005: { message: "Anonymous cards activation not allowed." },
    3001: { message: "Internal error." },
  };

  @doc("http://doc.omnipartners.be/index.php/Retrieve_balance")
  @filterInput([
    "program_id", // (Required) Request sender specify the “program Id” related to the loyalty points program here
    "card_program_id", // (Optional) This is used to specify the program which the card belong to.
    "auth_type", // (Optinal) One of "card_no" | "mobile_no" | "partner_ext_id"
    "user_id", // (Required) : { message: "Service request sender needs to set user GUID information / Card Number / Mobile Number / partner_ext_id information here."},
  ])
  public retrieveBalance(
    data: ILoyaltyRetrieveBalanceInput,
  ): Promise<ILoyaltyBalance> {
    return this._call("getpointbalance", data, {
      hashKey: "sigid",
      hashKeys: ["action", "program_id", "user_id"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Retrieve_transaction_history")
  @filterInput([
    "program_id",
    "shop_id",
    "partner_ext_id",
    "user_id",
    "starting_record",
    "record_count",
    "starting_date",
    "ending_date",
    "filter_null_transactions",
    "sort",
  ])
  public retrieveTransactionHistory(
    data: ILoyaltyRetrieveTransactionHistoryInput,
  ): Promise<ILoyaltyRetrieveTransactionHistoryResult> {
    return this._call("transacnhistory", data, {
      errorMap: {
        1023: { message: "Transaction history records not found" },
        1024: { message: "Transaction history records retrieve error" },
        1067: { message: "Key not found" },
      },
      hashKeys: ["action", "program_id", "shop_id", "user_id"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Points_Expiration_Date")
  @filterInput(["program_reference", "user_id", "user_id_type"])
  public getPointsExpirationDate(
    data: ILoyaltyGetPointsExpirationDateInput,
  ): Promise<ILoyaltyPointsExpirationDate> {
    return this._call("get-points-expiration-date", data, {
      errorMap: {
        1070: { message: "program_id required" },
      },
      hashKeys: [
        "action",
        "key",
        "program_reference",
        "user_id",
        "user_id_type",
      ],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Point_/_Stamps_addition")
  @filterInput([
    "program_id",
    "shop_id",
    "type",
    "user_id",
    "auth_type",
    "message",
    "source",
    "points",
    "stamps",
    "transaction_ext_id",
    "transaction_ext_origin",
  ])
  public pointStampsAddition(
    data: ILoyaltyPointStampAdditionInput,
  ): Promise<ILoyaltyPointStampAddition> {
    return this._call("addition", data, {
      errorMap: {
        1070: { message: "program_id required" },
      },
      hashKey: "sigid",
      hashKeys: ["source", "user_id", "action"],
      retry: false,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Point_deduction")
  @filterInput([
    "program_id",
    "shop_id",
    "type",
    "user_id",
    "auth_type",
    "source",
    "points",
    "reason",
    "transaction_ext_id",
    "transaction_ext_origin",
  ])
  public pointStampsDeduction(
    data: ILoyaltyPointDeductionInput,
  ): Promise<ILoyaltyPointDeduction> {
    return this._call("deduction", data, {
      errorMap: {
        1070: { message: "program_id required" },
      },
      hashKey: "sigid",
      hashKeys: ["source", "user_id", "action"],
      retry: false,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Loyalty_eShop_purchase")
  @filterInput([
    "program_id",
    "shop_id",
    "user_id",
    "source",
    "transaction_ext_id",
    "transaction_ext_origin",
    "points",
  ])
  public eshopPurchase(
    data: ILoyaltyEshopPurchaseInput,
  ): Promise<ILoyaltyeEshopPurchase> {
    return this._call("shop-redemption", data, {
      hashKey: "sigid",
      hashKeys: ["source", "user_id", "action"],
      retry: false,
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

  @doc("http://doc.omnipartners.be/index.php/Get_transaction_history_stats")
  @filterInput([
    "program_id",
    "shop_id",
    "partner_ext_id",
    "user_id",
    "start_date",
    "end_date",
    "filter_null_transactions",
  ])
  public transactionHistoryStats(
    data: ILoyaltyTransactionHistoryStatsInput,
  ): Promise<{
    status: number;
    data: {
      addition?: number;
      deduction?: number;
      "pet-sale"?: number;
      activatecard?: number;
      purchase?: number;
    };
  }> {
    return this._call("get-transaction-history-stats", data, {
      errorMap: {
        1023: { message: "Transaction history records not found" },
        1043: { message: "User (GUID) not found" },
      },
      hashKey: "sigid",
      hashKeys: ["action", "program_id", "shop_id", "user_id"],
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Card_activation")
  @filterInput([
    "source", // (Required)
    "program_id", // (Optional)
    "card_no", // (Optional)
    "mobile_no", // (Optional)
    "user_email", // (Optional)
    "user_guid", // (Optional)
    "shop_id", // (Optional)
    "type", // (Optional)
    "user_language", // (Optional)
    "transaction_ext_id", // (Optional)
    "transaction_ext_origin", // (Optional)
    "init_points", // (Optional)
    "init_stamps", // (Optional)
  ])
  public activateCard(
    data: ILoyaltyActivateCardInput,
  ): Promise<{
    status: number;
  }> {
    return this._call("activatecard", data, {
      hashKey: "sigid",
      hashKeys: ["mobile_no", "program_id", "card_no"],
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Get_Card_Status")
  @filterInput([
    "program_id", // (Required)
    "card_no", // (Required)
    "shop_id", // (Optional)
    "type", // (Optional)
  ])
  public getCardStatus(
    data: ILoyaltyGetCardStatusInput,
  ): Promise<{
    status: number;
    data: {
      partner_extid: string;
      activation_date: string;
      member_status: string;
      has_email: string;
      has_mobile_phone: string;
    };
  }> {
    return this._call("get-card-status", data, {
      hashKeys: ["program_id", "card_no"],
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Product_purchase")
  @filterInput([
    "program_id", // (Required)
    "user_id", // (Required)
    "shop_id", // (Required)
    "auth_type", // (Optional)
    "type", // (Optional)
    "product_codes", // (Optional)
    "transaction_value", // (Optional)
    "transaction_points", // (Optional)
    "mobile_no", // (Optional)
    "user_email", // (Optional)
    "transaction_ext_id", // (Optional)
    "transaction_ext_origin", // (Optional)
  ])
  public purchaseProduct(
    data: ILoyaltyPurchaseProductInput,
  ): Promise<{
    status: number;
  }> {
    return this._call("purchase", data, {
      hashKey: "sigid",
      hashKeys: ["shop_id", "user_id", "action"],
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Purchase")
  @filterInput([
    "transaction_type", // (Required) Constant defining the transaction_type “purchase”.
    "program_reference", // (Required) Unique identifier of the loyalty program. It is used to evaluate points and rules, access and restrictions, and set balances.
    "user_id", // (Required) Unique identifier of the person receiving points.
    "user_id_type", // (Optional) Used to specify the type of unique identifier provided.
    "partner_id", // (Required) Unique identifier of the partner where the transaction takes place. This is used to create automatic implicit tripartite relationships.
    "partner_id_type", // (Optional) Used to specify the type of unique partner identifier provided.
    "product_codes", // (Optional) Specify user product information with quantity purchase by user.
    "transaction_value", // (Optional) Purchase value of the transaction used to calculate point according to the conversion factor set in the program settings.
    "transaction_currency_code", // (Optional) This should be a valid currency code (Eg: EUR, GBP)
    "transaction_points", // (Optional) Fix number of points added for the transaction.
    "user_mobile", // (Optional) User mobile number specified to automatically activate a new non anonymous card in a purchase transaction. This requires a feature to be activated at the program level (see below / "Automatic Card Activation").
    "user_email", // (Optional) User email address specified to automatically activate a new non anonymous card in a purchase transaction. This requires a feature to be activated at the program level (see below / "Automatic Card Activation").
    "transaction_ext_id", // (Optional) 0 chars	External reference of the transaction. If request sender sending 'transaction_ext_origin' then this is required
    "transaction_ext_origin", // (Optional) 0 chars	Free text containing Origin of the transaction. If request sender sending 'transaction_ext_id' then this is required
    "transaction_date", // (Optional) Valid Date value in text. Format: YYYY-MM-DD Eg: "2018-12-29" This value will override the transaction date picked by the system
    "custom_logger_info", // (Optional) Custom values to add as logging values. Ex. {"tag_1":"custom_tag_1", "tag_2":"custom_tag_2"}
  ])
  public purchase(
    data: ILoyaltyPurchaseInput,
  ): Promise<{
    status: number;
    log_id: number;
    transaction_id: number;
    ruleids: string[];
    logicids: string[];
    product_count: number;
    transactionpoints: number;
    transactionstamps: number;
    newtotalpoints: string;
    new_total_all_stamps: string;
    new_total_partner_stamps: string;
    simple_rules_new_points: number;
    extended_rules_new_points: number;
    instant_discount_point_deduction_execution: number;
    product_codes_warning: string;
    message: string;
    extended_rule_messages: string[];
    instant_discount_confirmation_message: string[];
    saving_deals_status: string[];
    saving_deals_received: string[];
    vouchers: IVoucherDetail[];
    deal_vouchers: IVoucherDetail[];
    user_hold_points: number;
    user_profile: {
      user_status: string;
      has_email: "Y" | "N";
      has_mobile_phone: "Y" | "N";
      user_email_status: string;
    };
    time: number;
    user_guid: string;
  }> {
    return this._call(
      "rewards-transaction",
      {
        transaction_type: "purchase",
        ...data,
      },
      {
        hashKeys: undefined,
      },
    );
  }

  @doc("https://doc.clixray.com/index.php?title=List_purchases")
  @filterInput([
    "program_id", // (Required)This is a required field and it cannot be null / ignored. Request sender needs to specify the “program code” related to the loyalty points program here. Its data type is TEXT. A unique value for each program will be provided during the set-up of the service.
    "partner_ext_id", // (Optional)This is not required and it can be null / ignored. Request sender need to specify the shop related partner ext Id here. Its data type is TEXT. If this is set then service will return partner related transaction history.
    "user_guid", // (Required)This is required and it cannot be null / ignored. Service request sender needs to set user GUID information here. Then service will return user related transaction history.
    "starting_record", // (Optional)It can be null / ignored. If Request sender needs to filter few records then he need to specify starting record index value here. Its type is TEXT. If this is keep empty then no need to set record_count value as well.
    "record_count", // (Optional)It can be null / ignored. If request sender needs to filter the result, then he needs to specify max number of transactions here, then starting_record field value also need to be set.
    "start_date", // (Optional)It can be null / ignored. This will used to filter the transaction information within this date value range. If it is set then service request sender needs to set end_date as well. Then service will filter and return the result within that date range.
    "end_date", // (Optional)It can be null / ignored. This will used to filter the transaction information within this date value range. If it is set then service request sender needs to set start_date as well. Then service will filter and return the result within that date range.
    "sort", // (Optional)This field contains array of string specifying the sort fields and direction.
  ])
  public listPurchases(
    data: ILoyaltyListPurchasesInput,
  ): Promise<{
    data: {
      transaction_id: string;
      partner_ext_id: string;
      partner_id: string;
      program_id: string;
      user_guid: string;
      purchase_date: string;
    }[];
    total_records: number;
    selected_records: number;
    status: string;
  }> {
    return this._call("list-purchases", data, {
      hashKeys: ["action", "program_id", "user_guid"],
    });
  }

  @doc("https://doc.clixray.com/index.php?title=Resolve_User_GUID")
  @filterInput([
    "program_id", // (Optional) Request sender specify the “program code” related to the loyalty points program here. Its data type is TEXT. But its not a required field now.
    "card_program_id", // (Optional) This is used to specify the program which the card belong to. This allows the system to identify a user by a card number of some other program associated to him or her. Here request sender should be set “auth_type” parameter as “card_no” and also “user_id” should contain a card number.
    "user_id", // (Required) Service request sender needs to set card number / mobile number information here. Its data type is TEXT.
    "auth_type", // (Required) It could be contain ‘card_no’ OR ‘mobile_no’ text value .
  ])
  public resolveUserGuid(
    data: ILoyaltyResolveUserGUIDInput,
  ): Promise<{
    data: {
      user_guid: string;
      user_profile: {
        user_status: string;
        has_email: string;
        has_mobile_phone: string;
      };
    };
  }> {
    return this._call("resolveuserguid", data, {
      hashKey: "sigid",
      hashKeys: ["action", "program_id", "user_id"],
    });
  }
}
