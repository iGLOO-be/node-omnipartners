export interface IPartnerAccountRelationCreateInput {
  user_guid: string;
  partner_ext_id: string;
  partner_relationship: string;
  partner_roles?: string;
  partner_status: string;
  notify?: boolean;
}
export interface IPartnerAccountRelationDeleteInput {
  user_guid: string;
  partner_ext_id: string;
  partner_relationship: string;
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
  indexed_result?: 0;
  partner_type?: string;
  partner_group_handle?: string;
  excl_partner_group_handle?: string;
  collection_ref?: string;
  stock_level?: string;
  search_term?: string;
  radius?: number;
  limit?: number;
  show_hidden?: 0;
  add_cis_guid?: 1;
  partner_status?: string;
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

export interface IPartnerDetails {
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
  partner_custom_conv?: string;
  partner_custom_discountcode?: string;
  partner_custom_edicode?: string;
  partner_custom_matrix?: string;
  partner_custom_salesmanemail?: string;
  partner_custom_species?: string;
  partner_short_description_generic?: string;
  partner_opening_hours?: IPartnerOpeningHours | null;
  partner_breed_relations?: IPartnerBreedRelation[] | null;
}

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
  partner_is_hidden?: 0 | 1;
  partner_timezone?: string;
  partner_self_id?: string;
  partner_self_prefix?: string;
  partner_deals_redirection_url?: string;
  partner_referral_code?: string;
  // Optional	partner_custom_xxxxx	Apart from the field specified above custom fields could be added to the profile of a partner. Custom fields should be prefixed by "partner_custom_" for the service to identify them. The value of a custom field could be any string up to 100 characters in length. Field with empty values will be ignored by the service
}

export interface IPartnerAddOpeningHoursInput {
  partner_ext_id: string;
  data: IPartnerOpeningHours;
}

export interface IPartnerDeleteOpeningHoursInput {
  partner_ext_id: string;
  day: number | string;
}
