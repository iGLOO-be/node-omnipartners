import { Readable } from "stream";
import Api, { IApiFetchOptions } from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";
import {
  IPartnerAddOpeningHoursInput,
  IPartnerDeleteOpeningHoursInput,
  IPartnerDetails,
  IPartnerLink,
  IPartnerLinks,
  IPartnerListItem,
  IPartnerLocatorInput,
  IPartnerUpdateInput,
} from "../../partner-types";

export interface IPartnerGroup {
  partner_group_name: string;
  partner_group_handle: string;
  is_availability_group: "0" | "1";
}

export default class Partners extends Api {
  public defaultHost = "https://partners.clixray.io/";

  public errorMap = {
    1000: { message: "Action not available." },
    1001: { message: "Invalid action." },
    1002: { message: "Client key not available." },
    1003: { message: "Invalid client key." },
    1004: { message: "Hash not available." },
    1005: { message: "Invalid hash." },
    1006: { message: "Access denied." },
    1007: {
      message:
        "Invalid request. This code is returned upon data validation failure.",
    },
    1008: { message: "Missing required fields" },
    1025: { message: "Internal Error" },
    1032: { message: "Partner_ext_id not found." },
    1036: { message: "Service input data is Invalid." },
    1040: { message: "Terminal id not found." },
  };

  public _call(action: string, data?: {}, options: IApiFetchOptions = {}) {
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

  @doc("http://doc.omnipartners.be/index.php/List_Partners")
  @filterInput([
    "partner_type", // (Optional) The “Partner Type” used to filter and retrieve partners information relative to the types. Eg: "shops,vets,suppliers" .
    "partner_group_handle", // (Optional) The “Partner Group Handle” used to filter the partners with that partner group handle's. Eg: "handle_1,handle_2" .
    "collection_ref", // (Optional) Collection reference to which the stock level is associated. Required if "stock_level" is provided.
    "stock_level", // (Optional) Stock level which is a value between 0 and 10. The comparison will be done as ">= stock_level". Required if "collection_ref" is provided.
    "search_term", // (Optional) The “Search Term” used to filter and retrieve partners information relative to the searched term text. It will check that term exists in partner invoice name, partner public name, email or partner VAT information.
    "search_strict", // (Optional) Defines the behavior of the “Search Term”. Valid values are 0 and 1. If the value is 0 partial matches will appear in the result. If the value is 1 search term will be matched exactly. Default value is 0.
    "partner_status", // (Optional) The “Partner Status” used to filter the partners with that partner status. Valid Status are A and I ( A: active partners I: inactive partners ) If not send this parameter then service will return active partners only. If this parameter is with empty string (Eg: partner_status:"" ) then it will return all active and inactive partners information.
    "partner_updated_date", // (Optional) This is to list all partners that have been updated on or after the date specified. It should be valid date with this format.
    // (Eg: partner_updated_date:"2014-06-05" OR  partner_updated_date:"2014-06-05 14:10" time should be in 24H format )
    // When the partner_updated_date is empty string OR not send with request we return all records.
    "page", // (Optional) The “Page” used for pagination. Page number of the result. Its a number. The default value is 1.
    "rows", // (Optional) The “Rows” used for pagination. Number of records per page. Its a number. The default value is 10. The maximum value is 100.
    "show_hidden", // (Optional) States whether to include the hidden partners in the result. (Valid Values: 0 OR 1) default 0
  ])
  public listPartners(data: {
    partner_type?: string;
    partner_group_handle?: string;
    collection_ref?: string;
    stock_level?: string;
    search_term?: string;
    search_strict?: string;
    partner_status?: string;
    partner_updated_date?: string;
    page?: string;
    rows?: string;
    show_hidden?: string;
  }): Promise<{
    data: IPartnerListItem[];
    page: string;
    total_rows: string;
    rows: string;
  }> {
    return this._call("get-partners", data, { retry: true });
  }

  @doc("http://doc.omnipartners.be/index.php/Find_Partners")
  @filterInput([
    "partner_lat",
    "partner_lng",
    "indexed_result",
    "partner_type",
    "partner_group_handle",
    "excl_partner_group_handle",
    "collection_ref",
    "stock_level",
    "search_term",
    "radius",
    "limit",
    "show_hidden",
    "add_cis_guid",
    "partner_status",
  ])
  public findPartners(
    data: IPartnerLocatorInput,
  ): Promise<{ data: IPartnerDetails[] }> {
    return this._call("find-partners", data, {
      errorMap: {
        1008: { message: "Missing required fields" },
        1030: { message: "Invalid partner group handle." },
        1031: { message: "Invalid partner type." },
      },
      hashKeys: ["action", "partner_lat", "partner_lng"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Partners_Details")
  @filterInput([
    "partner_ext_id", // (Required) The “Partner Ext Id” used to filter the partners using Partner Ext Id. If you need to filter the partners with multiple ext_ids, then its value should be comma separated.
    "indexed_result", // (Optional) The “Indexed Result” used get result indexed with partner_ext_id. Possible values are TRUE/FALSE
    "lang", // The language used to retrieve the translated contents.If not specified generic values will be returned instead of translated contents.
    "data_options", // This defines information that is returned in the profile object. It should be a comma separated list of values. For more information please refer Data Options.
  ])
  public partnerDetails(data: {
    partner_ext_id: string;
    indexed_result?: string;
    lang?: string;
    data_options?: string;
  }): Promise<{ data: IPartnerDetails[] }> {
    const options = {
      ...data,
      partner_ext_id: data.partner_ext_id
        ? data.partner_ext_id.toString()
        : null,
    };
    if (data.data_options) {
      options.data_options = Array.isArray(data.data_options)
        ? data.data_options.join(",")
        : data.data_options;
    }
    return this._call("get-partner-details", options, {
      hashKeys: ["action", "partner_ext_id"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Featured_Activities")
  @filterInput([
    "lang", // (Optional) The language used to return the translated contents
  ])
  public featuredActivities(data: { lang: string }) {
    return this._call(
      "get-featured-activities",
      {
        ...data,
      },
      { retry: true },
    );
  }

  @doc("http://doc.omnipartners.be/index.php/Retrieve_Links")
  @filterInput([
    "partner_ext_id", // (Required) The ext id of the partner.
    "type", // (Optional) Links have a type (photo, video) to start with. If set then gives relative type of records only.
  ])
  public getLinks(data: {
    partner_ext_id: string;
    type: string;
  }): Promise<{
    statusCode: number;
    links: IPartnerLinks;
  }> {
    return this._call(
      "get-partner-links",
      {
        ...data,
        partner_ext_id: data.partner_ext_id
          ? data.partner_ext_id.toString()
          : null,
      },
      {
        errorMap: {
          1032: { message: "Partner_ext_id not found." },
        },
        hashKeys: ["action", "partner_ext_id"],
        retry: true,
      },
    );
  }

  @doc("http://doc.omnipartners.be/index.php/Add_Link")
  @filterInput([
    "partner_ext_id", // (Required) The ext id of the partner.
    "type", // (Required) Links have a type (photo, video) to start with. If set then gives relative type of records only.
    "link_data", // (Required) json enccoded array data, it fill with languge code and its link data
  ])
  public addLink(data: {
    partner_ext_id: string;
    type: string;
    link_data: IPartnerLink["contents"];
  }): Promise<{
    statusCode: number;
    link_id?: number;
    type?: string;
  }> {
    return this._call(
      "add-partner-links",
      {
        ...data,
        partner_ext_id: data.partner_ext_id
          ? data.partner_ext_id.toString()
          : null,
      },
      {
        hashKeys: ["action", "partner_ext_id", "type"],
        retry: true,
      },
    );
  }

  @doc("http://doc.omnipartners.be/index.php/Delete_Links")
  @filterInput([
    "partner_ext_id", // (Required) The ext id of the partner.
    "type",
    "link_id",
  ])
  public deleteLink(data: {
    partner_ext_id: string;
    type: string;
    link_id: number;
  }): Promise<{
    statusCode: number;
  }> {
    return this._call(
      "delete-partner-links",
      {
        ...data,
        partner_ext_id: data.partner_ext_id
          ? data.partner_ext_id.toString()
          : null,
      },
      {
        hashKeys: ["action", "partner_ext_id", "type", "link_id"],
        retry: true,
      },
    );
  }

  @doc("http://doc.omnipartners.be/index.php/Update_Partner")
  @filterInput([
    "partner_ext_id",
    "partner_inv_name",
    "partner_inv_street1",
    "partner_inv_street2",
    "partner_inv_streetnum",
    "partner_inv_postal_code",
    "partner_inv_city",
    "partner_inv_region",
    "partner_inv_country",
    "partner_pub_name",
    "partner_pub_street1",
    "partner_pub_street2",
    "partner_pub_streetnum",
    "partner_pub_postal_code",
    "partner_pub_city",
    "partner_pub_region",
    "partner_pub_country",
    "partner_email",
    "partner_emergency",
    "partner_phone",
    "partner_fax",
    "partner_website",
    "partner_facebook",
    "partner_twitter",
    "partner_vat",
    "partner_type",
    "partner_subtype",
    "partner_prim_cnt_title",
    "partner_prim_cnt_first_name",
    "partner_prim_cnt_last_name",
    "partner_prim_cnt_email",
    "partner_prim_cnt_mobile",
    "partner_salesrep",
    "partner_sales_support",
    "partner_prim_cnt_language",
    "partner_short_description",
    "partner_short_description_translations",
    "partner_eshop_url",
    "partner_lat",
    "partner_lng",
    "partner_status",
    "partner_is_hidden",
    "partner_timezone",
    "partner_self_id",
    "partner_self_prefix",
    "partner_deals_redirection_url",
    "partner_referral_code",
  ])
  public updatePartner(data: IPartnerUpdateInput) {
    return this._call("update-partner", data, {
      hashKeys: ["action", "partner_ext_id"],
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Resolve_Partner_by_Terminal_Id")
  @filterInput([
    "terminal_id", // (Required) The terminal id associated to the partner
  ])
  public resolvePartnerByTerminalId(data: {
    terminal_id: string;
  }): Promise<{ data: { partner_ext_id: string } }> {
    return this._call("resolve-partner-by-terminal-id", data, {
      hashKeys: ["action", "key", "terminal_id"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/List_Partners_Group")
  @filterInput([
    "partner_group_handle", // (Optional)	The “Partner Group Handle” used to filter and retrieve partner group information relative to the handle.
    "partner_type", // (Optional)	The “Partner Type” used to filter and retrieve partner group information based on the partner assignment to that group.
  ])
  public listPartnerGroups(data: {
    partner_group_handle?: string;
    partner_type?: string;
  }): Promise<{ data: IPartnerGroup[] }> {
    return this._call("get-partner-groups", data, {
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Add_Relation")
  @filterInput([
    "partner_ext_id",
    "relation_type", // Code of the relation type
    "reference",
  ])
  public addRelation(data: {
    partner_ext_id: string;
    relation_type: string;
    reference: string;
  }): Promise<{ statusCode: number }> {
    return this._call("add-partner-relations", data, {
      hashKeys: [
        "action",
        "key",
        "partner_ext_id",
        "reference",
        "relation_type",
      ],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Delete_Relation")
  @filterInput([
    "partner_ext_id",
    "relation_type", // Code of the relation type
    "reference",
  ])
  public deleteRelation(data: {
    partner_ext_id: string;
    relation_type: string;
    reference: string;
  }): Promise<{ statusCode: number }> {
    return this._call("delete-partner-relations", data, {
      hashKeys: [
        "action",
        "key",
        "partner_ext_id",
        "reference",
        "relation_type",
      ],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Update_Partner_Logo_Image")
  @filterInput(["partner_ext_id", "partner_logo"])
  public updatePartnerLogo(data: {
    partner_ext_id: string;
    partner_logo:
      | string
      | Readable
      | {
          value: Buffer;
          options: {
            filename: string;
          };
        };
  }): Promise<{ statusCode: number }> {
    return this._call("update-partner-logo", data, {
      hashKeys: ["action", "partner_ext_id"],
      multipart: true,
      errorMap: {
        1033: {
          message:
            "Partner logo image upload error. Partner logo should be with valid file type - JPG, PNG or GIF",
        },
      },
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Add_Partner_Opening_Hours")
  @filterInput(["partner_ext_id", "data"])
  public addOpeningHours(
    data: IPartnerAddOpeningHoursInput,
  ): Promise<{ statusCode: number }> {
    return this._call("add-partner-opening-hours", data, {
      hashKeys: ["action", "partner_ext_id"],
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Delete_Partner_Opening_Hours")
  @filterInput([
    "partner_ext_id",
    "day", // Day is the day number (Mon = 1, Sun = 7) Eg: "day":"1,3,4"
  ])
  public deleteOpeningHours(
    data: IPartnerDeleteOpeningHoursInput,
  ): Promise<{ statusCode: number }> {
    return this._call("delete-partner-opening-hours", data, {
      hashKeys: ["action", "partner_ext_id", "day"],
      retry: true,
    });
  }
}
