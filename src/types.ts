type IUserDataOption =
  | "owner_details"
  | "pet_details"
  | "pet_breed_details"
  | "pet_medical_condition_details"
  | "preferences"
  | "related_partners"
  | "related_partners_details"
  | "segments"
  | "stamp_counts"
  | "loyalty_cards"
  | "access_rights"
  | "children"
  | "pet_eco_systems"
  | "user_tags"
  | "-owner_details"
  | "-pet_details"
  | "-preferences"
  | "-loyalty_cards"
  | "-access_rights";
export type IUserDataOptions = IUserDataOption[] | IUserDataOption;

export interface IUserPartial {
  statusCode: 0;
  user_guid: string;
  user_email: string;
  user_mobile_phone: string;
  user_language: string;
  user_status: string;
  data: {
    user_guid: string;
    user_ext_id: string | null;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_mobile_phone: string;
    user_country: string | null;
    user_language: string;
    user_status: string;
    user_confirmed: string;
    user_created_on: string;
    user_updated_on: string;
    user_has_password: 1;
    user_email_status: string;
  };
}

interface IUserPartner {
  ptn_ext_customer_id: string;
  ptn_type: string;
  partner_ext_id: string;
  partner_type: string;
  updated_on: string;
  partner_relationship_roles: [];
  partner_relationship_status: string;
  partner_relationship_is_explicit: string;
  partner_relationship_deleted: string;
  partner_relationship_implicit_on: null;
  partner_relationship_explicit_on: null;
  partner_relationship_deleted_on: null;
  partner_relationship_added_on: string;
}

interface IUserCard {
  card_id: string;
  program_id: string;
  personal_reference: string;
  activated_partner: null;
  expiration_month: null;
  expiration_year: null;
  added_on: string;
}

export interface IUserPet {
  guid: string;
  id: string;
  _id: string;
  pet_guid: string;
  pet_ext_id: null;
  name: string;
  birthDate: string;
  pet_dob: string;
  pet_dob_approx: string;
  breed: string;
  petType: string;
  pedigreeName: string;
  dateCreated: string;
  lastUpdated: string;
  gender: string;
  neutered: boolean;
  pet_neutering_date: null;
  pet_neutered: string;
  owner: null;
  pet_owner_since: null;
  tattooId: null;
  chipNumber: null;
  pet_lifestyle: null;
  pet_brand: null;
  pet_declarative_product: null;
  pet_ideal_product: null;
  vaccinationDate: null;
  type: string;
  profile_completion: string;
  has_picture: 1;
  status: string;
  pet_status: string;
  insured: string;
  pet_referrer: null;
  pet_origin: null;
  kcNumber: string;
  breedDetails: {
    id: string;
    name: string;
    type: string;
    pet_breed_com_id: string;
    com_id: string;
    universe_id: string;
    name_fr: string;
  };
  pet_stage: null;
  pet_feeding_stage: null;
  medicalConditions: [];
}

export interface IUserOwner {
  id: string;
  _id: string;
  guid: string;
  user_guid: string;
  user_ext_id: null;
  user_public_token: string;
  user_facebook_id: null;
  user_force_password_reset: 1;
  user_blacklisted: 0;
  user_customer_group: null;
  user_origin: string;
  user_origin_details: null;
  user_creation_origin: null;
  user_creation_origin_details: null;
  country: string;
  country_name: string;
  dateCreated: string;
  lastUpdated: string;
  user_activated_on: null;
  email: string;
  user_email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  language: string;
  telephone: string;
  mobilePhone: string;
  user_mobile_phone: string;
  passwordHash: string;
  status: string;
  user_status: string;
  user_confirmed: string;
  title: string;
  number: string;
  street1: string;
  street2: null;
  city: string;
  zip: string;
  longitude: null;
  latitude: null;
  user_national_id: null;
  user_email_status: string;
  type: string[];
  businessName: string;
  dob: null;
  countyId: null;
  website: string;
  profile_completion: string;
  user_has_profile_logo: 1;
  profile_logo: string;
  profile_logo_small: string;
  profile_logo_medium: string;
  profile_logo_large: string;
  default_address: null;
}

export interface IUser {
  feedback: {
    unauthorized_data_options: [];
  };
  accessToken: string;
  session_token: string;
  owner: IUserOwner;
  pets: IUserPet[];
  communicationPreferences: [];
  interests: [];
  subscriptions: string[];
  user_access_rights: [];
  cards: IUserCard[];
  partners: {
    clientof: IUserPartner[];
    partof: IUserPartner[];
  };
  segments: Array<{
    id: number;
    handle: string;
  }>;
  stamps_count: number | null;
}

export interface IUserAddress {
  address_id: number;
  address_name: string;
  address_company: string | null;
  address_phone: string | null;
  address_region: string | null;
  address_streetnum: string;
  address_street1: string;
  address_street2: string | null;
  address_postal_code: string;
  address_city: string;
  address_county: string | null;
  address_country: string;
  address_type: string;
  address_is_default: boolean;
  address_comment: string | null;
  address_latitude: number;
  address_longitude: number;
  user_streetnum: string;
  user_street1: string;
  user_street2: string | null;
  user_postal_code: string;
  user_city: string;
  user_county: string | null;
  is_default: boolean;
}
