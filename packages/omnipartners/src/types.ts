import { Readable } from "stream";
import { IDealProduct } from "./deal-types";

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

type IUserPetDataOption =
  // Basic information of the pet
  // The most basic information of the pet which includes name, species, breed, date of birth.
  | "basic_details"
  // Extended information of the pets
  // Rest of the information of the pet which is not included in basic information.
  | "extended_details"
  // Detailed information of pet breed.
  | "breed_details"
  // Detailed information of pet pathologies under the pet details.
  | "pet_medical_condition_details"
  // Special needs of the pet.
  | "special_needs"
  // The stage information of the pet
  | "stage"
  // Pathologies of the pet.
  | "medical_conditions"
  // The ecosystems of the pet.
  | "pet_eco_systems"
  // Information of pet tags.
  | "user_tags";
export type IUserPetDataOptions = IUserPetDataOption[] | IUserPetDataOption;

type IPartnerDataOption =
  // Basic information of the partner
  | "partner_details"
  // Links associated to the partner
  | "links"
  // Activities associated to the partner.
  | "activities"
  // Services associated to the partners.
  | "services"
  // The custom values specified in the partner profile.
  | "extended_profile"
  // The details of the primary contact.
  | "primary_contact_details"
  // CIS account guid associated to the partners. This is resolved by using the email address of primary contact.
  | "cis_account_guid"
  // Open hours of the partner.
  | "open_close_hours"
  // Links to the logo image.
  | "logo_images"
  // List of groups which partner belongs to.
  | "groups"
  // Coordinates of the location of the partner.
  | "location"
  // Specifies whether translatable values should be translated in the partner profile. In order for this to work the request should contain the desired language.
  | "translations"
  // Return breed relations information.
  | "partner_breed_relations";
export type IPartnerDataOptions = IPartnerDataOption[] | IPartnerDataOption;

type IProductDataOption =
  // Basic information of the collection
  // Properties : "reference","generic_name","name","energy_level","has_image".
  | "collection_details"
  // Images of the collection
  // Please refer "images" property here .
  | "images"
  // Key benefits of the collection.
  // Please refer "key_benefits" property here .
  | "key_benefits"
  // Collections that have relationships to the collection.
  // Please refer "related_collections" property here .
  | "related_collections"
  // Targeting Information of the collection.
  // Please refer "targeting" property here .
  | "targeting"
  // Range Information of the collection.
  // Please refer "range" property here .
  | "range"
  // Family of the collection range.
  // Please refer "family" property here .
  | "family"
  // Description of the collection.
  // Properties : "description","tag_line","introduction"
  | "collection_description"
  // Benefits list of the collection.
  // Please refer "benefits" property here .
  | "benefits"
  // Pathologies list of the collection.
  // Please refer "pathologies" property here .
  | "pathologies"
  // links list of the collection.
  // Please refer "links" property here .
  | "links"
  // products list of the collection.
  // Please refer "products" propety here .
  | "products"
  // Component list of the collection.
  // Please refer "components" property here .
  | "collection_components"
  // Available Product Packages of a collection.
  // Please refer "available_packages" property here .
  | "available_packages"
  // List of Product Groups.
  // Please refer "product_groups" property here .
  | "product_groups"
  // Information about the constraints of each field in collection targeting data. This option will be allowed only if targeting information are requested.
  // Please refer "targeting_constraints" property here .
  | "targeting_constraints";
export type IProductDataOptions = IProductDataOption[] | IProductDataOption;

type ICollectionDataOption =
  // Basic information of the collection
  // Properties : "reference","generic_name","name","energy_level","has_image".
  | "collection_details"
  // Images of the collection
  // Please refer "images" property here .
  | "images"
  // Key benefits of the collection.
  // Please refer "key_benefits" property here .
  | "key_benefits"
  // Collections that have relationships to the collection.
  // Please refer "related_collections" property here .
  | "related_collections"
  // Targeting Information of the collection.
  // Please refer "targeting" property here .
  | "targeting"
  // Range Information of the collection.
  // Please refer "range" property here .
  | "range"
  // Family of the collection range.
  // Please refer "family" property here .
  | "family"
  // Description of the collection.
  // Properties : "description","tag_line","introduction"
  | "collection_description"
  // Benefits list of the collection.
  // Please refer "benefits" property here .
  | "benefits"
  // Pathologies list of the collection.
  // Please refer "pathologies" property here .
  | "pathologies"
  // links list of the collection.
  // Please refer "links" property here .
  | "links"
  // products list of the collection.
  // Please refer "products" propety here .
  | "products"
  // Component list of the collection.
  // Please refer "components" property here .
  | "collection_components"
  // Available Product Packages of a collection.
  // Please refer "available_packages" property here .
  | "available_packages"
  // List of Product Groups.
  // Please refer "product_groups" property here .
  | "product_groups"
  // Information about the constraints of each field in collection targeting data. This option will be allowed only if targeting information are requested.
  // Please refer "targeting_constraints" property here .
  | "targeting_constraints";

export type ICollectionDataOptions =
  | ICollectionDataOption[]
  | ICollectionDataOption;

type IArticlesDataOption = "content" | "targeting" | "targeting_constraints";
export type IArticlesDataOptions = IArticlesDataOption[] | IArticlesDataOption;

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

export interface IUserPartnerRelation {
  ptn_ext_customer_id: string;
  ptn_type: string;
  partner_ext_id: string;
  partner_type: string;
  updated_on: string;
  partner_relationship_roles: string[];
  partner_relationship_status: string;
  partner_relationship_is_explicit: string;
  partner_relationship_deleted: string;
  partner_relationship_implicit_on: null;
  partner_relationship_explicit_on: null;
  partner_relationship_deleted_on: null;
  partner_relationship_added_on: string;
}

export interface IUserPartnerRelationFromGet {
  ptn_id: string;
  ptn_guid: string | null;
  ptn_created: string;
  ptn_updated: string;
  ptn_status: string;
  ptn_admin_id?: string | null;
  ptn_ext_customer_id: string;
  ptn_inv_name?: string;
  ptn_inv_street1?: string;
  ptn_inv_street2?: string;
  ptn_inv_streetnum?: string;
  ptn_inv_postal_code?: string;
  ptn_inv_city?: string;
  ptn_inv_region?: string;
  ptn_inv_country?: string;
  ptn_pub_name?: string;
  ptn_pub_street1?: string;
  ptn_pub_street2?: string;
  ptn_pub_streetnum?: string;
  ptn_pub_postal_code?: string;
  ptn_pub_city?: string;
  ptn_pub_region?: string;
  ptn_pub_country?: string;
  ptn_email?: string;
  ptn_emergency?: string;
  ptn_phone?: string;
  ptn_fax?: string;
  ptn_website?: string;
  ptn_facebook?: string;
  ptn_twitter?: string;
  ptn_vat?: string;
  ptn_type: string;
  ptn_subtype?: string;
  ptn_prim_cnt_guid?: string;
  ptn_prim_cnt_title?: string;
  ptn_prim_cnt_first_name?: string;
  ptn_prim_cnt_last_name?: string;
  ptn_prim_cnt_email?: string;
  ptn_prim_cnt_mobile?: string;
  ptn_prim_cnt_language?: string;
  ptn_stamp_image?: string | null;
  ptn_stamp_image_updated_on?: string | null;
  ptn_stamp_card_image?: string | null;
  ptn_stamp_card_image_updated_on?: string | null;
  ptn_default_user_guid?: string | null;
  ptn_stamp_unlock_count?: string | null;
  ptn_salesrep?: string;
  ptn_sales_support?: string;
  ptn_location_lookup?: string;
  ptn_short_description?: string;
  ptn_eshop_url?: string;
  ptn_has_logo?: string;
  ptn_logo_image_type?: string | null;
  ptn_logo_updated_on?: string | null;
  ptn_opening_hours?: string | null;
  ptn_closing_periods?: string | null;
  ptn_parent_id?: string | null;
  ptn_show_saving_deals?: string;
  ptn_is_hidden?: string;
  ptn_timezone?: string;
  ptn_self_id?: string;
  ptn_self_prefix?: string;
  ptn_deals_redirection_url?: string | null;
  ptn_referral_code?: string | null;
  ptn_snap?: string;
  ptn_instagram?: string;
  ptn_pinterest?: string;
  ptn_linkedin?: string;
  ptn_googleplus?: string;
  ptn_viadeo?: string;
  ptn_whatsapp?: string;
  ptn_youtube?: string;
  ptn_ext_id: string;
  ptn_groups?: string[];
  partner_lat?: string | null;
  partner_lng?: string | null;
  ptn_logo?: string | null;
  ptn_logo_small?: string | null;
  ptn_logo_medium?: string | null;
  ptn_logo_large?: string | null;
  links?: [];
  partner_short_description_generic?: string;
  ptn_user_guid?: string;
  partner_relationship_roles?: string[];
  partner_relationship_status?: string;
  updated_on?: string;
  partner_relationship_is_explicit?: string;
  partner_relationship_deleted?: string;
  partner_relationship_implicit_on?: string | null;
  partner_relationship_explicit_on?: string;
  partner_relationship_deleted_on?: string | null;
  partner_relationship_added_on?: string;
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

export interface IUserPetMedicalCondition {
  code: string;
  name: string;
  name_FR?: string;
}

export interface IUserPetSpecialNeed {
  code: string;
  name: string;
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
  breed?: string;
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
  pet_lifestyle: string | null;
  pet_brand: null;
  pet_declarative_product?: string;
  pet_ideal_product: null;
  vaccinationDate: null;
  type: string;
  profile_completion: string;
  has_picture: "0" | "1";
  status: string;
  pet_status: string;
  insured: string;
  pet_referrer: null;
  pet_origin: null;
  kcNumber: string;
  breedDetails: IUserPetBreedDetail;
  pet_stage?: string;
  pet_feeding_stage?: string;
  medicalConditions: IUserPetMedicalCondition[];

  // dataOptions: special_needs
  pet_special_needs?: IUserPetSpecialNeed[];
}

export interface IUserPetBreedDetail {
  id: string;
  name: string;
  type: string;
  pet_breed_com_id: string;
  com_id: string;
  universe_id: string;
  name_fr: string;
}

export interface IUsetPetWithOwner extends IUserPet {
  pet_owner: IUserOwner;
}

export interface IUserPetCreateInput {
  user_guid: string;
  pet_name: string;
  pet_type: string;
  pet_breed?: string;
  pet_breed_com_id?: string;
  pet_pedigreename?: string;
  pet_dob: string;
  pet_dob_approx?: number;
  pet_neutered?: "Y" | "N";
  pet_neutering_date?: string;
  pet_gender?: string;
  vaccination_date?: string;
  pet_insured?: string;
  pet_medical_condition?: string;
  pet_lifestyle?: string;
  pet_brand?: string;
  pet_declarative_product?: string;
  tattoo_number?: string;
  chip_number?: string;
  pet_picture?:
    | string
    | Readable
    | {
        value: Buffer;
        options: {
          filename: string;
        };
      };
  kc_number?: string;
  pet_ext_id?: string;
}

export interface IUserPetDeleteInput {
  pet_guid: string;
  pet_deletion_cause?: string;
}

export interface IUserPetUpdateInput {
  // The GUID of the pet.
  pet_guid: string;
  // The name of the pet.
  pet_name?: string;
  // The type of pet. Please refer <b><a href="/index.php/Animal_types_list" title="Animal types list">Animal types list</a></b> for valid values.
  pet_type?: string;
  // The id of the pet breed. Please refer <b><a href="/index.php/Animal_breeds_list" title="Animal breeds list">Animal breeds list</a></b> for valid values.
  pet_breed?: string;
  // The pedigree name of the pet.
  pet_pedigreename?: string;
  // The common id of the pet breed. Please refer <b><a href="/index.php/Animal_breeds_list" title="Animal breeds list">Animal breeds list</a></b> for valid values.  If both pet_breed and pet_breed_com_id are supplied pet_breed_com_id has the priority.
  pet_breed_com_id?: string;
  // The date of birth of the pet in the format YYYY-MM-DD.
  pet_dob?: string;
  // States whether pet date of birth is approximative. Valid values are 0 (no correction), 1 (day is not provided by user) and 2 (day and month are not provided by user). Default value is 0.
  pet_dob_approx?: string;
  // The gender of the pet. Valid values are “M” and “F”.
  pet_gender?: string;
  // This state whether pet is neutered or not. Valid values are “Y” and “N”.
  pet_neutered?: "Y" | "N";
  // The date which the pet was neutered.
  pet_neutering_date?: string;
  // The date of vaccination in the format YYYY-MM-DD.
  vaccination_date?: string;
  // This state whether pet is insured or not. Valid values are “Y” and “N”.
  pet_insured?: string;
  // The medical conditions for the pet. Multiple values (see metadata page) can be sent mimicking the submission behavior of check boxes in a html form. Please refer <b><a href="/index.php/Animal_medical_conditions_list" title="Animal medical conditions list">Animal medical conditions list</a></b> for valid values.
  pet_medical_condition?: string;
  // The lifestyle of the pet. Please refer <b><a href="/index.php/Animal_lifestyles_list" title="Animal lifestyles list">Animal lifestyles list</a></b> for valid values.
  pet_special_needs?: string;
  // The special need references for the pet.Multiple values could be specified by mimicking the submission behavior of check boxes in an html form. Please refer Get_Animal_Special_Needs for valid values.
  pet_lifestyle?: string;
  // The brand products given to the pet. Please refer <b><a href="/index.php/Brands_list" title="Brands list">Brands list</a></b> for valid values. Required if <i>pet_declarative_product</i> is specified.
  pet_brand?: string;
  // The products given to the pet. Please refer <b><a href="/index.php/Product_collections_list" title="Product collections list">Product collections list</a></b> for valid values.
  pet_declarative_product?: string;
  // The tattoo number of the pet.
  tattoo_number?: string;
  // The chip number of the pet.
  chip_number?: string;
  // The Kennel Club number of the pet.
  kc_number?: string;
  // The petpicture. The request should be a “POST” request if picture is specified.
  pet_picture?:
    | string
    | Readable
    | {
        value: Buffer;
        options: {
          filename: string;
        };
      };
  // The external id of the pet. This should be a unique value.
  pet_ext_id?: string;
}

export interface IUserPetPlaceOfPurchaseUpdateInput {
  pet_guid: string;
  place_id: string;
  place_rating: string;
  replace_existing_preferences?: string;
}

export interface IUserPetPlaceOfPurchase {
  place_id: string;
  place_rating: string;
  place_rated_on?: string;
}

export interface IUserPetPlaceOfPurchaseDeleteInput {
  pet_guid: string;
  place_id: string;
}

export interface IUserPetWeightEntryAddInput extends IUserPetWeightEntry {
  pet_guid: string;
}

export interface IUserPetWeightEntry {
  date: string;
  weight: number;
  partner_ext_id?: string;
  source: string;
  ideal_weight?: string;
}

export interface IUserPetBmiEntryAddInput extends IUserPetBmiEntry {
  pet_guid: string;
}

export interface IUserPetBmiEntry {
  date: string;
  bmi: number;
  partner_ext_id?: string;
  source: string;
}

export interface IUserPetDietRecommendationAddInput
  extends IUserPetDietRecommendationEntry {
  pet_guid: string;
  custom_logger_info?: string;
}

export interface IUserPetDietRecommendationDeleteInput
  extends Partial<
    Pick<
      IUserPetDietRecommendationEntry,
      "collection_reference" | "creation_date" | "partner_ext_id"
    >
  > {
  pet_guid: string;
  custom_logger_info?: string;
}

export interface IUserPetDietRecommendationEntry {
  creation_date: string;
  collection_reference: string;
  expiration_date?: string;
  partner_ext_id?: string;
  ration?: string;
  ration_unit?: string;
}

export interface IUserChild {
  child_birthday: string;
  child_added_on: string;
  child_updated_on: string;
  child_gender: string;
  child_guid: string;
  child_first_name: string;
  child_parent: string;
  child_status: string;
  child_ext_id: string;
  child_multiples?: string[] | null;
}

export interface IUserChildCreateInput {
  user_guid: string;
  child_first_name: string;
  child_birthday: string;
  child_gender: string;
  child_ext_id?: string;
  multiples?: 1 | 0;
}

export interface IUserChildUpdateInput
  extends Omit<Partial<IUserChildCreateInput>, "user_guid"> {
  child_guid: string;
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
  user_customer_group: string | null;
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
  dob: string;
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

export interface IUserSegment {
  id: number;
  handle: string;
}

export interface IUserFavourites {
  content_id: string;
  date: string;
  type: string;
  content: string;
  source: string;
}

export interface IUserFavouritesAddInput
  extends Omit<IUserFavourites, "content_id"> {
  user_guid: string;
}

export interface IUserFavouritesDeleteInput {
  content_id: string;
  user_guid: string;
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
    clientof: IUserPartnerRelation[];
    partof: IUserPartnerRelation[];
  };
  segments: IUserSegment[];
  stamps_count: number | null;
  user_tags: string[];
}

export interface IUserUpdateInput extends IBaseUserInput {
  // The GUID of the user.
  user_guid: string;
  user_context?: string;
}

interface IBaseUserInput {
  // The title code of the user. Please refer <b><a href="/index.php/User_title_list" title="User title list">User title list</a></b> for valid values.
  user_title?: string;
  // The first name of the user.
  // 50 chars
  user_first_name?: string;
  // The last name of the user.
  // 50 chars
  user_last_name?: string;
  // The date of birth of the user.
  user_dob?: string;
  // The gender of the user. Valid values are "M" for male and "F" for female.
  user_gender?: string;
  // Part of the user’s address.
  // 20 chars
  user_streetnum?: string;
  // Part of the user’s address.
  // 100 chars
  user_street1?: string;
  // Part of the user’s address.
  // 100 chars
  user_street2?: string;
  // Post code that comes along with the address.
  // 15 chars
  user_postal_code?: string;
  // City that comes along with the address.
  // 100 chars
  user_city?: string;
  // County that comes along with the address. Please refer <b><a href="/index.php/County_list" title="County list">County list</a></b> for valid values. Since county is dependent on country when updating the county it's advisable to supply the country as well to preserve the correctness of the information
  user_county?: string;
  // Country that comes along with the address. Please refer <b><a href="/index.php/Country_list" title="Country list">Country list</a></b> for valid values.
  user_country?: string;
  // The telephone number of the user.
  user_telephone?: string;
  // The mobile phone number of the user. It needs to be between 4 and 20 chars long. There is no regex validation. Regex specified in the <b><a href="/index.php/Country_list" title="Country list">Country list</a></b> is for front end information and validation.
  user_mobile_phone?: string;
  // The website of the user.
  // 255 chars
  user_website?: string;
  // The email address of the user.
  // 90 chars
  user_email?: string;
  // The username of the user. The username should be a unique value. If it's not supplied the value of email will be used.
  // 90 chars
  user_username?: string;
  // The password of the user. It needs to be at least 5 characters long.
  // 20 chars
  user_password?: string;
  // The language code of the user’s language. Please refer <b><a href="/index.php/Language_list" title="Language list">Language list</a></b> for valid values.
  user_language?: string;
  // The external id of the user. This should be a unique value.
  // 50 chars
  user_ext_id?: string;
  // National id of the user.
  // 20 chars
  user_national_id?: string;
  // The facebook id of the user. This should be a unique value.
  // 50 chars
  user_facebook_id?: string;
}

export interface IRegisterUserInput extends IBaseUserInput {
  // Latitude of the geo location associated to the user's address.
  user_lat?: string;
  // Longitude of the geo location associated to the user's address.
  user_lng?: string;
  // The confirmation status of the user. Valid values will be 0 or 1. Default value is 0. Please refer <b><a href="/index.php/Confirm_User_Accounts" title="Confirm User Accounts">Confirm User Accounts</a></b> for more details.
  user_confirmed?: string;
  // When no password is supplied for the user in the registration request this parameter specifies the method to retrieve a valid password. Valid values are <b>link</b>, <b>password</b> and <b>remoteform</b>. The default value is <b>link</b>. If <b>link</b> is specified the registration confirmation email will contain a link to create a new password. If <b>password</b> is specified the registration confirmation mail will contain a auto generated password for the account. Otherwise the response will contain an additional property called “url”. This property contains a url which a remote site could use to create a new password. Please refer to the <b><a href="/index.php/Update_Password" title="Update Password">Update Password</a></b> page for more details about using this feature.
  password_mode?: "link" | "password" | "remoteform";
  // This state whether the user has a pet. If there is no pet 1 should be passed and otherwise 0 should be passed. When noPets = 1 is passed then the account will be created as an active account even if there is a global / key constraint on pets. In other words this parameter allows to bypass the pet constraint for an active account.
  noPets?: string | 1 | 0;
  // Required if “noPet” is 0. The name of the pet.
  // 50 chars
  pet_name?: string;
  // Required if “noPet” is 0. The type of pet. Please refer <b><a href="/index.php/Animal_types_list" title="Animal types list">Animal types list</a></b> for valid values.
  pet_type?: string;
  // Required if “noPet” is 0 and pet_breed_com_id is not supplied. Please refer <b><a href="/index.php/Animal_breeds_list" title="Animal breeds list">Animal breeds list</a></b> for valid values.
  pet_breed?: string;
  // Required if “noPet” is 0 and pet_breed is not supplied. Please refer <b><a href="/index.php/Animal_breeds_list" title="Animal breeds list">Animal breeds list</a></b> for valid values. If both pet_breed and pet_breed_com_id are supplied pet_breed_com_id has the priority.
  pet_breed_com_id?: string;
  // The pedigree name of the pet.
  // 50 chars
  pet_pedigreename?: string;
  // Required if “noPet” is 0. The date of birth of the pet in the format YYYY-MM-DD.
  pet_dob?: string;
  // States whether pet date of birth is approximative. Valid values are 0 (no correction), 1 (day is not provided by user) and 2 (day and month are not provided by user). Default value is 0.
  pet_dob_approx?: string;
  // The gender of the pet. Valid values are “M” and “F”.
  pet_gender?: string;
  // This state whether pet is neutered or not. Valid values are “Y” and “N”.
  pet_neutered?: string;
  // The date of vaccination in the format YYYY-MM-DD.
  vaccination_date?: string;
  // This state whether pet is insured or not. Valid values are “Y” and “N”.
  pet_insured?: string;
  // The medical conditions for the pet. Multiple values (see metadata page) can be sent mimicking the submission behavior of check boxes in a html form. Please refer <b><a href="/index.php/Animal_medical_conditions_list" title="Animal medical conditions list">Animal medical conditions list</a></b> for valid values.
  pet_medical_condition?: string;
  // The tattoo number of the pet.
  // 40 chars
  tattoo_number?: string;
  // The chip number of the pet.
  // 40 chars
  chip_number?: string;
  // The Kennel Club number of the pet.
  // 40 chars
  kc_number?: string;
  // The external id of the pet. This should be a unique value.
  // 50 chars
  pet_ext_id?: string;
  // The communications preferences of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in a html form. Please refer <b><a href="/index.php/Communications_preferences_list" title="Communications preferences list">Communications preferences list</a></b> for valid values.
  com_prefs?: string;
  // The interests of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in an html form. Please refer <b><a href="/index.php/Interest_list" title="Interest list">Interest list</a></b> for valid values.
  interests?: string;
  // The subscriptions of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in an html form. Please refer <b><a href="/index.php/Subscriptions_list" title="Subscriptions list">Subscriptions list</a></b> for valid values.
  subscriptions?: string;
  // The access rights of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in an html form. Please refer <b><a href="/index.php/Access_rights_list" title="Access rights list">Access rights list</a></b> for valid values.
  user_access_rights?: string;
  // This states whether to send the registration confirmation mail or not. If registration confirmation mail is needed the value should be 1 and otherwise it should be 0. The default value is 1.
  send_welcome_mail?: string | 1 | 0;
  // This states whether to send the registration confirmation mail and/or sms. The value should be set as an array of values since it support multiple options. Valid values are email and sms
  send_notification?: "email" | "sms";
  // Stores reference information on the origin of the user. This is used to give more context to the source of the registration. The source is taken automatically from the api key reference.
  // 50 chars
  user_origin_details?: string;
  // This defines information that is returned in the profile object. Please refer <b><a href="/index.php/Data_Options" title="Data Options">Data Options</a></b> for valid values. Multiple values could be sent by separating them with commas. If this parameter is not specified or empty only <i>owner_details</i>, <i>pet_details</i>, <i>preferences</i>, <i>loyalty_cards</i>, <i>access_rights</i>, <i>pet_breed_details</i> and <i>pet_medical_condition_details</i> will be included.
  data_options?: IUserDataOptions;
  // Specifies whether an account should be updated during registration if it already exists. Valid values are 0 and 1. Default is 0. This option requires the associated api key to have "Force update active user during registration" permission. Otherwise, it'll result a failure. Only the ext_id of the user will be updated during a forced update and rest of the values will be ignored.
  force_update?: 1 | 0;
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

interface IBaseUserAddressInput {
  user_guid: string;
  address_type?: string;
  address_name?: string;
  address_company?: string;
  address_phone?: string;
  address_streetnum?: string;
  address_street1?: string;
  address_street2?: string;
  address_postal_code: string;
  address_city: string;
  address_region?: string;
  address_county?: string;
  address_country?: string;
  address_comment?: string;
  address_is_default?: string;
  address_lat?: string;
  address_lng?: string;
}

export type IRegisterUserAddressInput = IBaseUserAddressInput;

export interface IUpdateUserAddressInput extends IBaseUserAddressInput {
  address_id: string;
}

export interface ICountry {
  id: string;
  name: string;
  mobile_validation_rule: string | null;
  phone_prefix: string;
  has_post_code: string;
  region: string | null;
}

export interface IUserPreferences {
  communicationPreferences: string[];
  interests: string[];
  subscriptions: string[];
}

export interface IUserLegalFormsItems {
  legal_form_code: string;
  confirmed_date: string;
  confirmed_place: string;
  confirmed_document_link: string;
}

export interface IUserConfirmLegalFormsInput {
  legal_form_code: string;
  user_guid: string;
  confirmed_place: string;
  send_notification?: string;
  signature?: string;
}

export interface IUserUpdateSubscriptionsInput {
  user_guid: string;
  com_prefs?: string;
  interests?: string;
  subscriptions?: string | string[];
}

export interface IUserPlaceOfPurchase {
  place_id: string;
  place_rating: string;
}

export interface IUserUpdatePlacesOfPurchaseInput {
  user_guid: string;
  place_id: string;
  place_rating: string;
}

export interface IDealListItem {
  id: number;
  ref: string;
  name: string;
  type: string;
  available_from?: string | null;
  available_to?: string | null;
  is_locked: boolean;
  subscription_count: {
    REDEEMED: number;
    SUBSCRIBED: number;
    IN_PROGRESS: number;
  };
  pet_type?: string | null;
  pet_breed?: string[] | null;
  deal_groups?:
    | {
        group_name: string;
        group_handle: string;
      }[]
    | null;
}
export interface IDeal extends IDealListItem {
  redeem_days: string[];
  partner_visibility: string;
  restrict_registration: boolean;
  image_url?: string | null;
  postal_address_required: boolean;
  delivery_address_required: "1" | "0" | null;
  optin_options: {
    id: string;
    visible: "1" | "0";
    default_value: string;
    can_change: "1" | "0";
  }[];
  display_on_terminal: 1 | 0;
  redeem_duration_value: number;
  redeem_duration_unit: string;
  is_relative_redeem_dates: boolean;
  google_tracking_id?: string | null;
  status: string;
  referrer_required: 1 | 0;
  child_required: "1" | "0";
  child_gnder: string;
  child_age_limit_value: string;
  child_age_limit_unit: string;
  child_age_limit_operator: string;
  child_age_limit_to_value: string;
  child_age_limit_to_unit: string;
  pet_required: "1" | "0";
  /**
   * @deprecated Use `pet_universe_included` instead
   */
  pet_universe?: string | null;
  pet_universe_included?: string | null;
  pet_universe_excluded?: string | null;
  pet_breeds_included?: number[] | null;
  pet_breeds_excluded?: number[] | null;
  pet_age_limit_value?: string | null;
  pet_age_limit_unit?: "DAY" | "WEEK" | "MONTH" | "YEAR" | null;
  pet_age_limit_operator?: "LOWER" | "EQUAL" | "HIGHER" | "BTW" | "";
  pet_age_limit_to_value?: string | null;
  pet_age_limit_to_unit?: "DAY" | "WEEK" | "MONTH" | "YEAR" | null;
  send_voucher_email: boolean;
  send_voucher_sms: boolean;
  need_to_scan: 0 | 1;
  redeem_validity_from?: string | null;
  redeem_validity_to?: string | null;
  validity_message: string;
  confirmation_text: string;
  description: string;
  benefit_type:
    | "FIXED_PRODUCT" //  Fixed refund on purchase of product
    | "FIXED_TIER" //  Fixed refund on tier purchase
    | "PERCENTAGE_PRODUCT" //  Variable refund on purchase of product
    | "PERCENTAGE_TIER"; //  Variable refund on tier purchase
  slogan: string;
  public_name: string;
  site_footer: string;
  voucher_small_print: string;
  redemption_confirmation_text: string;
  redirect_url?: string | null;
  langs: string[];
  logo_url?: string | null;
  css_file_url?: string | null;
  internal_barcode?: string | null;
  presentation_images: {
    small: { NL?: string | null; FR?: string | null };
    large: { NL?: string | null; FR?: string | null };
  };
  saving_end_time_value?: string | null;
  saving_end_time_unit?: string | null;
  saving_end_date?: string | null;
  pet_stages_included?: string[] | null;
  pet_stages_excluded?: string[] | null;
  pet_type_included: string | null;
  pet_type_excluded: string | null;
  allowed_partner_groups: string[];
  excluded_partner_groups: string[];
  subscription_partner_required: number;
  subscription_referral_partner_required: number;
  referral_partner_as_subscription_partner: number;
  redemption_partner_required: number;
  redemption_referral_partner_required: number;
  can_redeem_without_subscription: number;
  can_redeem_anonymously: number;
  products: IDealProduct[];
  limitations: {
    max_payments_per_iban: string; // Only for Direct Cashback deals
    max_subscription_per_delivery_address: string;
    max_subscription_limit: number; // only with 'subscription_limit' data option
    remaining_subscription_count: number; // only with 'subscription_limit' data option
  };
  type_details: {
    discount_type: string;
    amounts: {
      EUR?: number;
    };
  };
  benefits: {
    id: string;
    product?: {
      ean: string;
      id: string | string[];
      label: string;
      friendly_name: string;
    };
    value: string;
    currency: string;
    communications?: {
      tier_purchase_label?: { [k: string]: string };
      tier_purchase_proof_label?: { [k: string]: string };
      validity_text?: { [k: string]: string };
    };
  }[];
}

export interface IUserEligibleDirectCashbackDeal {
  id: string;
  ref: string;
  name: string;
  available_from: string;
  available_to: string;
}

export interface IUserDirectCashbackDealEligiblePet {
  pet_guid: string;
  pet_name: string;
}

export interface IDirectCashbackDealDetail {
  id: string;
  ref: string;
  name: string;
  redeem_duration_value: number;
  redeem_duration_unit: string;
  is_relative_redeem_dates: boolean;
  status: string;
  pet_required: "1" | "0";
  pet_type_included: string;
  pet_universe_included: string;
  pet_type_excluded: number[];
  pet_universe_excluded: number[];
  pet_breeds_included: number[];
  pet_breeds_excluded: number[];
  available_from: string;
  available_to: string;
  redeem_validity_from: string;
  redeem_validity_to: string;
  confirmation_text: string;
  redemption_confirmation_text: string;
  site_footer: string;
  presentation_images: {
    small: { NL: string | null; FR: string | null };
    large: { NL: string | null; FR: string | null };
  };
  slogan: string;
  public_name: string;
  langs: string[];
  benefits: {
    id: string;
    products?: {
      id: number;
    }[];
    product?: {
      ean: string;
      id: string | string[] | number | number[];
      label: string;
      friendly_name: string;
    };
    value: string;
    currency: string;
  }[];
}

export interface IDirectCashbackVoucherDetail {
  id: string;
  user_guid: string;
  barcode: string;
  status: string;
  pet_guid: string;
  ts_redeemed: string;
  active_redemption_request_status: string;
  ts_subscribed: string;
  benefit: IDirectCashbackVoucherBenefit;
  redeem_validity_from: string;
  redeem_validity_to: string;
  deal: IDirectCashbackDealDetail;
}

export interface IDirectCashbackRedemptionRequestInput {
  barcode: string;
  benefit_id?: string;
  receipt_date: string;
  receipt_image_mime_type: string;
  target_currency: "EUR" | "GBP";
  payment_details: {
    iban?: string;
    sort_code?: string;
    account_number?: string;
  };
  partner_ext_id?: string;
  benefit_product_ean?: string;
  benefit_product_purchase_value?: string;
  tier_purchase_receipt_image_mime_type?: string;
}

export interface IDirectCashbackRedemptionInput {
  barcode: string;
  transaction_id: string;
  payment_details: {
    iban: string;
  };
}

export interface IDirectCashbackVoucherBenefit {
  product_id?: string | string[];
  amount?: string;
  currency?: string;
}

export interface ILoyaltyUserProfile {
  user_status: "A" | "T";
  has_email: "Y" | "N";
  has_mobile_phone: "Y" | "N";
}

export interface ILoyaltyTransactionProductCodes {
  [key: string]: number;
}

export interface ILoyaltyTransactionTransactionMessage {
  [key: string]: string;
}

export interface ILoyaltyBalance {
  user_total_points: string;
  user_total_points_alt: string;
  user_guid: string;
  user_hold_points: string;
  user_hold_points_alt: string;
  status: string;
  user_profile: ILoyaltyUserProfile;
}

export interface ILoyaltyTransactionHistory {
  transaction_id: string;
  log_id: string;
  action: string;
  program_id: string;
  total_points: string;
  shop_id: string;
  partner_ext_id: string;
  is_synced: string;
  transaction_date: string;
  user_id: string;
  user_type: string;
  product_codes: ILoyaltyTransactionProductCodes;
  transaction_ext_id: string;
  transaction_ext_origin: string;
  transaction_message: ILoyaltyTransactionTransactionMessage;
}

export interface ILoyaltyPointsExpirationDate {
  status: string;
  user_guid: string;
  expiration_date?: string | null;
  expiration_points: string;
  expiration_points_alt: string;
  data?: {
    expiration_date: string;
    expiration_points: string;
    expiration_points_alt: string;
  }[];
}

export interface ILoyaltyPointStampAddition {
  transactionpoints: number;
  newtotalpoints: number;
  transactionstamps: number;
  new_total_all_stamps: number;
  status: string;
  message: string;
  log_id: number;
  transaction_id: number;
  user_guid: string;
  user_profile: ILoyaltyUserProfile;
}

export interface ILoyaltyPointDeduction {
  transactionpoints: number;
  newtotalpoints: number;
  status: string;
  message: string;
  log_id: number;
  transaction_id: number;
  user_guid: string;
  user_profile: ILoyaltyUserProfile;
}

export interface IAddUserTagsInput {
  user_guid: string;
  user_tags: string;
  replace_existing_tags?: string;
  custom_logger_info?: { [key: string]: string };
}

export interface IAddPetTagsInput {
  pet_guid: string;
  pet_tags: string;
  replace_existing_tags?: string;
}

export interface IDeleteUserTagsInput {
  user_guid: string;
  user_tags: string;
  custom_logger_info?: { [key: string]: string };
}

export interface IDeletePetTagsInput {
  pet_guid: string;
  pet_tags: string;
}

export interface ISocialNetwork {
  social_network: string;
  username: string;
  follower_count?: number;
  added_on: string;
  updated_on: string;
}

export interface ISocialNetworkInput {
  user_guid: string;
  social_network: string;
  username: string;
  follower_count?: number;
}

export interface ISocialNetworkDeleteInput {
  user_guid: string;
  social_network: string;
  username: string;
}
