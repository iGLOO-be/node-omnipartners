import { IUserDataOptions } from "./types";

type booleanNumber = 0 | 1;

export interface IPartnerAccountRelationCreateInput {
  user_guid: string;
  partner_ext_id: string;
  partner_relationship: "clientof" | "partof";
  partner_roles?: string;
  is_primary_contact?: "1" | "0";
  notify?: "1" | "0";
  partner_status?: string; // Deprecated
}
export interface IPartnerAccountRelationDeleteInput {
  user_guid: string;
  partner_ext_id: string;
  partner_relationship: string;
}

export interface IGetUserPartnerAccountRelationsInput {
  partner_ext_id: string;
  partner_relationship: "clientof" | "partof";
  show_not_accepted?: string;
  active_users_only?: "1" | "0";
  role?: string;
  customer_group?: string;
  group_results_by_status?: "1" | "0";
  page: number;
  records_per_page: number;
  data_options?: IUserDataOptions;
}

export interface IUserPartnerAccountRelation {
  user_guid: string;
  user_status: string;
  partner_relationship_is_explicit: string;
  partner_added_on: string;
  partner_updated_on: string;

  // Available only if role parameter is not specified
  partner_relationship_roles?: string[];

  // data_options: owner_details
  user_first_name?: string;
  user_last_name?: string;
  user_email?: string;
  user_mobile_phone?: string;
  user_title?: string;
  user_language?: string;
  user_country?: string;
  user_phonetic_first_name?: string;
  user_phonetic_last_name?: string;
}

export interface IPartnerListItem {
  partner_name: string;
  partner_ext_id: string;
  partner_type: string;
  partner_lat: string;
  partner_lng: string;
  partner_user_guid: string;
  partner_status: string;
  partner_updated_date: string;
  partner_self_id: string;
  partner_self_prefix: string;
  partner_pub_name: string;
  partner_pub_street1: string;
  partner_pub_street2: string;
  partner_pub_streetnum: string;
  partner_pub_postal_code: string;
  partner_pub_city: string;
  partner_pub_region: string;
  partner_pub_country: string;
}

export interface IPartnerListItemInput {
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
}

export interface IPartnerLocatorInput {
  partner_lat: string;
  partner_lng: string;
  indexed_result?: boolean;
  partner_type?: string;
  partner_group_handle?: string;
  excl_partner_group_handle?: string;
  product_ean?: string;
  collection_ref?: string;
  stock_level?: string | number;
  search_term?: string;
  radius?: number;
  limit?: number;
  show_hidden?: booleanNumber;
  add_cis_guid?: booleanNumber;
  partner_status?: string;
  include_unknown_stock_level?: booleanNumber;
}

export interface IPartnerLocatorLocateInput {
  partner_lat?: string;
  partner_lng?: string;
  indexed_result?: string;
  partner_type?: string;
  partner_group_handle?: string;
  excl_partner_group_handle?: string;
  product_ean?: string;
  collection_ref?: string;
  stock_level?: number;
  search_term?: string;
  radius?: number;
  show_hidden?: booleanNumber;
  partner_status?: "A" | "I" | "ANY";
  deal_ref?: string;
  partner_mode?: "subscription" | "redemption" | "referral";
  page?: number;
  records_per_page?: number;
  data_options?: IPartnerDetailsDataOptions;
}

export interface IPartnerLink {
  link_id: number;
  contents: {
    [lang: string]: string;
  };
}

export interface IPartnerLinks {
  [k: string]: IPartnerLink[];
}

export type IPartnerOpeningHoursDay =
  | "day_1"
  | "day_2"
  | "day_3"
  | "day_4"
  | "day_5"
  | "day_6"
  | "day_7";

export type IPartnerOpeningHours = {
  [key in IPartnerOpeningHoursDay]?: { from: string; to: string }[];
};

interface IPartnerBreedRelation {
  id: string;
  name: string;
  species: string;
  com_id: string;
  universe: string;
}

export type IPartnerDetails<T extends Record<string, unknown> = {}> = {
  partner_ext_id: string;
  partner_inv_name: string;
  partner_inv_street1?: string;
  partner_inv_street2?: string;
  partner_inv_streetnum?: string;
  partner_inv_postal_code?: string;
  partner_inv_city?: string;
  partner_inv_region?: string;
  partner_inv_country?: string;
  partner_pub_name: string;
  partner_pub_street1?: string;
  partner_pub_street2?: string;
  partner_pub_streetnum?: string;
  partner_pub_postal_code?: string;
  partner_pub_city?: string;
  partner_pub_region?: string;
  partner_pub_country?: string;
  partner_email?: string;
  partner_emergency?: string;
  partner_phone?: string;
  partner_fax?: string;
  partner_website?: string;
  partner_facebook?: string;
  partner_twitter?: string;
  partner_vat?: string;
  partner_type: string;
  partner_subtype?: string;
  partner_prim_cnt_guid?: string;
  partner_prim_cnt_title?: string;
  partner_prim_cnt_first_name?: string;
  partner_prim_cnt_last_name?: string;
  partner_prim_cnt_email?: string;
  partner_prim_cnt_mobile?: string;
  partner_salesrep?: string;
  partner_sales_support?: string;
  partner_prim_cnt_language: string;
  partner_short_description?: string;
  partner_short_description_translations?: {
    language: string;
    value: string;
  }[];
  partner_eshop_url?: string;
  partner_lat?: string;
  partner_lng?: string;
  partner_status?: string;
  partner_is_hidden?: string;
  partner_timezone?: string;
  partner_self_id?: string;
  partner_self_prefix?: string;
  partner_deals_redirection_url?: string;
  partner_referral_code?: string;
  partner_snap?: string;
  partner_instagram?: string;
  partner_pinterest?: string;
  partner_linkedin?: string;
  partner_googleplus?: string;
  partner_viadeo?: string;
  partner_whatsapp?: string;
  partner_youtube?: string;
  partner_groups?: string[];
  partner_user_guid?: string;
  partner_logo?: string;
  partner_logo_small?: string;
  partner_logo_medium?: string;
  partner_logo_large?: string;
  links?: IPartnerLinks;
  partner_short_description_generic?: string;
  partner_opening_hours?: IPartnerOpeningHours | null;
  partner_breed_relations?: IPartnerBreedRelation[] | null;
  stock_level?: string; // This will be returned only if stock level parameter is provided along with "product_ean" or "collection_ref"
  partner_custom_conv?: string;
  partner_custom_discountcode?: string;
  partner_custom_edicode?: string;
  partner_custom_matrix?: string;
  partner_custom_salesmanemail?: string;
  partner_custom_species?: string;
} & T;

export interface IPartnerUpdateInput {
  partner_ext_id: string;
  partner_inv_name?: string;
  partner_inv_street1?: string;
  partner_inv_street2?: string;
  partner_inv_streetnum?: string;
  partner_inv_postal_code?: string;
  partner_inv_city?: string;
  partner_inv_region?: string;
  partner_inv_country?: string;
  partner_pub_name?: string;
  partner_pub_street1?: string;
  partner_pub_street2?: string;
  partner_pub_streetnum?: string;
  partner_pub_postal_code?: string;
  partner_pub_city?: string;
  partner_pub_region?: string;
  partner_pub_country?: string;
  partner_email?: string;
  partner_emergency?: string;
  partner_phone?: string;
  partner_fax?: string;
  partner_website?: string;
  partner_facebook?: string;
  partner_twitter?: string;
  partner_instagram?: string;
  partner_linkedin?: string;
  partner_whatsapp?: string;
  partner_youtube?: string;
  partner_vat?: string;
  partner_type?: string;
  partner_subtype?: string;
  partner_prim_cnt_title?: string;
  partner_prim_cnt_first_name?: string;
  partner_prim_cnt_last_name?: string;
  partner_prim_cnt_email?: string;
  partner_prim_cnt_mobile?: string;
  partner_salesrep?: string;
  partner_sales_support?: string;
  partner_prim_cnt_language?: string;
  partner_short_description?: string;
  partner_short_description_translations?: {
    language: string;
    value: string;
  }[];
  partner_eshop_url?: string;
  partner_lat?: string;
  partner_lng?: string;
  partner_status?: string;
  partner_is_hidden?: booleanNumber;
  partner_timezone?: string;
  partner_self_id?: string;
  partner_self_prefix?: string;
  partner_deals_redirection_url?: string;
  partner_referral_code?: string;
  partner_group_handles?: string | string[];
  // Optional	partner_custom_xxxxx	Apart from the field specified above custom fields could be added to the profile of a partner. Custom fields should be prefixed by "partner_custom_" for the service to identify them. The value of a custom field could be any string up to 100 characters in length. Field with empty values will be ignored by the service
  [key: string]: string | Record<string, any> | booleanNumber | undefined;
}

export interface IPartnerAddOpeningHoursInput {
  partner_ext_id: string;
  data: IPartnerOpeningHours;
}

export interface IPartnerDeleteOpeningHoursInput {
  partner_ext_id: string;
  day: number | string;
}

export type IPartnerDetailsDataOptions =
  | IPartnerDetailsDataOption
  | IPartnerDetailsDataOption[];
type IPartnerDetailsDataOption =
  | "partner_details"
  | "links"
  | "activities"
  | "services"
  | "extended_profile"
  | "primary_contact_details"
  | "open_close_hours"
  | "logo_images"
  | "groups"
  | "location"
  | "translations"
  | "show_all_translations"
  | "partner_breed_relations";
