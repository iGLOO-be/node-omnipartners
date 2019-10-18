import Api, { IApiFetchOptions, IApiPostData } from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";
import {
  ILoyaltyBalance, ILoyaltyTransactionHistory
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
  filter_null_transactions?: "1"
}


export default class Loyalty extends Api {
  public defaultHost = "https://rewards.clixray.io/points";

  public errorMap = {
    99: { message: "Missing key." },
    100: { message: "Missing action." },
    101: { message: "Missing program ID." },
    103: { message: "Inactive Key" },
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
        1055: { message: "ptn_ext_customer_id ( partner_ext_id ) record not found" },
        1056: { message: "Required fields are not found in service request" },
        1059: { message: "Internal error - Account Database access error" },
        1063: { message: "Card number does not belong to any program." },
        1065: { message: "Key /Action authorization records retrieve error" },
        1067: { message: "Key not found" },
        1070: { message: "program_id required" },
        1071: { message: "Internal error - Program id resolution for the card" },
        1072: { message: "User Guid not found for that partner ext id" },
        1091: { message: "Default program is not set in control center." },
        1094: { message: "Invalid parameter values sent in request." },
        1023: { message: "Transaction history records not found" },
        1024: { message: "Transaction history records retrieve error" },
        1025: { message: "Invalid Key" },
        1026: { message: "Key retrieve error" },
        1027: { message: "Invalid Secret Key" },
        1064: { message: "Partner extension id records retrieve error" },
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
    "filter_null_transactions"
  ])
  public retrieveTransactionHistory(
    data: ILoyaltyRetrieveTransactionHistoryInput
  ): Promise<{ data: ILoyaltyTransactionHistory[] }> {
    return this._call("transacnhistory", data, {
      errorMap: {
        1043: { message: "User (GUID) not found" },
        1056: { message: "Required fields are not found in service request" },
        1059: { message: "Internal error - Account Database access error" },
        1065: { message: "Key /Action authorization records retrieve error" },
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
