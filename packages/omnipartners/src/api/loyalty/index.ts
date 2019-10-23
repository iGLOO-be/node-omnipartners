import Api, { IApiFetchOptions, IApiPostData } from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";
import {
  ILoyaltyBalance, ILoyaltyPointsExpirationDate, ILoyaltyTransactionHistory
} from "../../types";

export interface ILoyaltyRetrieveBalanceInput {
  program_id: string,
  card_program_id?: string,
  auth_type?: "card_no" | "mobile_no" | "partner_ext_id";
  user_id: string,
}

export interface ILoyaltyRetrieveTransactionHistoryInput {
  program_id: string,
  shop_id?: string,
  partner_ext_id?: string,
  user_id: string,
  starting_record?: string,
  record_count?: string,
  starting_date?: string,
  ending_date?: string,
  filter_null_transactions?: "1",
  sort?: "transaction_date ASC" | "transaction_date DESC" | "transaction_id ASC" | "transaction_id DESC"
}

export interface ILoyaltyGetPointsExpirationDateInput {
  program_reference: string,
  user_id: string,
  user_id_type: "user_loyalty_card_number" | "user_mobile" | "partner_ext_id",
}


export default class Loyalty extends Api {
  public defaultHost = "https://rewards.clixray.io/points";

  public errorMap = {
    99: { message: "Missing key." },
    100: { message: "Missing action." },
    101: { message: "Missing program ID." },
    103: { message: "Inactive Key" },
    1025: { message: "Invalid Key" },
    1026: { message: "Key retrieve error" },
    1027: { message: "Invalid Secret Key" },
    1043: { message: "User (GUID) not found" },
    1055: { message: "ptn_ext_customer_id ( partner_ext_id ) record not found" },
    1056: { message: "Required fields are not found in service request" },
    1059: { message: "Internal error - Account Database access error" },
    1063: { message: "Card number does not belong to any program." },
    1064: { message: "Partner extension id records retrieve error" },
    1065: { message: "Key /Action authorization records retrieve error" },
    1067: { message: "Key not found" },
    1070: { message: "program_id required" },
    1071: { message: "Internal error - Program id resolution for the card" },
    1072: { message: "User Guid not found for that partner ext id" },
    1094: { message: "Invalid parameter values sent in request." },
  };

  @doc("http://doc.omnipartners.be/index.php/Retrieve_balance")
  @filterInput([
    "program_id", // (Required) Request sender specify the “program Id” related to the loyalty points program here
    "card_program_id", // (Optional) This is used to specify the program which the card belong to.
    "auth_type", // (Optinal) One of "card_no" | "mobile_no" | "partner_ext_id"
    "user_id", // (Required) 	Service request sender needs to set user GUID information / Card Number / Mobile Number / partner_ext_id information here.
  ])
  public retrieveBalance(
    data: ILoyaltyRetrieveBalanceInput
  ): Promise<ILoyaltyBalance> {
    return this._call("getpointbalance", data, {
      errorMap: {
        1004: { message: "Points Service Secret is not available for that key." },
        1005: { message: "Points Service Secret key retrieve error" },
        1006: { message: "Unauthorized user access, input secret key might be invalid." },
        1054: { message: "Authentication key and action not mapped" },
        1042: { message: "Resolve the Card Number - Invalid Request" },
        1043: { message: "Resolve the Card Number / Mobile Number - User not found" },
        1044: { message: "Associated user account is not active" },
        1045: { message: "Resolve the Card Number - Card not found" },
        1046: { message: "Resolve the Card Number - Card expired" },
        1091: { message: "Default program is not set in control center." },
      },
      hashKey: "sigid",
      hashKeys: [
        "action",
        "program_id",
        "user_id"
      ],
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
    data: ILoyaltyRetrieveTransactionHistoryInput
  ): Promise<{ data: ILoyaltyTransactionHistory[] }> {
    return this._call("transacnhistory", data, {
      errorMap: {
        1023: { message: "Transaction history records not found" },
        1024: { message: "Transaction history records retrieve error" },
        1067: { message: "Key not found" },
      },
      hashKeys: [
        "action",
        "program_id",
        "shop_id",
        "user_id"
      ],
      retry: true
    })
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Points_Expiration_Date")
  @filterInput([
    "program_reference",
    "user_id",
    "user_id_type",
  ])
  public getPointsExpirationDate(
    data: ILoyaltyGetPointsExpirationDateInput
  ): Promise<ILoyaltyPointsExpirationDate> {
    return this._call("get-points-expiration-date", data, {
      errorMap: {
        1004: { message: "Points Service Secret is not available for that key." },
        1005: { message: "Points Service Secret key retrieve error" },
        1006: { message: "Unauthorized user access, input secret key might be invalid." },
        1054: { message: "Authentication key and action not mapped" },
        1042: { message: "Resolve the Card Number - Invalid Request" },
        1043: { message: "Resolve the Card Number / Mobile Number - User not found" },
        1044: { message: "Associated user account is not active" },
        1045: { message: "Resolve the Card Number - Card not found" },
        1046: { message: "Resolve the Card Number - Card expired" },
        1064: { message: "Resolve the User Partner Ext Id error. ( with user_id_type => 'partner_ext_id' )" },
        1070: { message: "program_id required" },
      },
      hashKeys: [
        "action",
        "program_id",
        "shop_id",
        "user_id"
      ],
      retry: true
    })
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
