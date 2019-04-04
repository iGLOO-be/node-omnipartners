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

export interface IUpdateUserInput extends IBaseUserInput {
  // The GUID of the user.
  user_guid: string;
}

interface IBaseUserInput {
  // The title code of the user. Please refer <b><a href="/index.php/User_title_list" title="User title list">User title list</a></b> for valid values.
  user_title: string;
  // The first name of the user.
  // 50 chars
  user_first_name: string;
  // The last name of the user.
  // 50 chars
  user_last_name: string;
  // The date of birth of the user.
  user_dob: string;
  // The gender of the user. Valid values are "M" for male and "F" for female.
  user_gender: string;
  // Part of the user’s address.
  // 20 chars
  user_streetnum: string;
  // Part of the user’s address.
  // 100 chars
  user_street1: string;
  // Part of the user’s address.
  // 100 chars
  user_street2: string;
  // Post code that comes along with the address.
  // 15 chars
  user_postal_code: string;
  // City that comes along with the address.
  // 100 chars
  user_city: string;
  // County that comes along with the address. Please refer <b><a href="/index.php/County_list" title="County list">County list</a></b> for valid values. Since county is dependent on country when updating the county it's advisable to supply the country as well to preserve the correctness of the information
  user_county: string;
  // Country that comes along with the address. Please refer <b><a href="/index.php/Country_list" title="Country list">Country list</a></b> for valid values.
  user_country: string;
  // The telephone number of the user.
  user_telephone: string;
  // The mobile phone number of the user. It needs to be between 4 and 20 chars long. There is no regex validation. Regex specified in the <b><a href="/index.php/Country_list" title="Country list">Country list</a></b> is for front end information and validation.
  user_mobile_phone: string;
  // The website of the user.
  // 255 chars
  user_website: string;
  // The email address of the user.
  // 90 chars
  user_email: string;
  // The username of the user. The username should be a unique value. If it's not supplied the value of email will be used.
  // 90 chars
  user_username: string;
  // The password of the user. It needs to be at least 5 characters long.
  // 20 chars
  user_password: string;
  // The language code of the user’s language. Please refer <b><a href="/index.php/Language_list" title="Language list">Language list</a></b> for valid values.
  user_language: string;
  // The external id of the user. This should be a unique value.
  // 50 chars
  user_ext_id: string;
  // National id of the user.
  // 20 chars
  user_national_id: string;
  // The facebook id of the user. This should be a unique value.
  // 50 chars
  user_facebook_id: string;
}

export interface IRegisterUserInput extends IBaseUserInput {
  // Latitude of the geo location associated to the user's address.
  user_lat: string;
  // Longitude of the geo location associated to the user's address.
  user_lng: string;
  // The confirmation status of the user. Valid values will be 0 or 1. Default value is 0. Please refer <b><a href="/index.php/Confirm_User_Accounts" title="Confirm User Accounts">Confirm User Accounts</a></b> for more details.
  user_confirmed: string;
  // When no password is supplied for the user in the registration request this parameter specifies the method to retrieve a valid password. Valid values are <b>link</b>, <b>password</b> and <b>remoteform</b>. The default value is <b>link</b>. If <b>link</b> is specified the registration confirmation email will contain a link to create a new password. If <b>password</b> is specified the registration confirmation mail will contain a auto generated password for the account. Otherwise the response will contain an additional property called “url”. This property contains a url which a remote site could use to create a new password. Please refer to the <b><a href="/index.php/Update_Password" title="Update Password">Update Password</a></b> page for more details about using this feature.
  password_mode: string;
  // This state whether the user has a pet. If there is no pet 1 should be passed and otherwise 0 should be passed. When noPets = 1 is passed then the account will be created as an active account even if there is a global / key constraint on pets. In other words this parameter allows to bypass the pet constraint for an active account.
  noPets: string;
  // Required if “noPet” is 0. The name of the pet.
  // 50 chars
  pet_name: string;
  // Required if “noPet” is 0. The type of pet. Please refer <b><a href="/index.php/Animal_types_list" title="Animal types list">Animal types list</a></b> for valid values.
  pet_type: string;
  // Required if “noPet” is 0 and pet_breed_com_id is not supplied. Please refer <b><a href="/index.php/Animal_breeds_list" title="Animal breeds list">Animal breeds list</a></b> for valid values.
  pet_breed: string;
  // Required if “noPet” is 0 and pet_breed is not supplied. Please refer <b><a href="/index.php/Animal_breeds_list" title="Animal breeds list">Animal breeds list</a></b> for valid values. If both pet_breed and pet_breed_com_id are supplied pet_breed_com_id has the priority.
  pet_breed_com_id: string;
  // The pedigree name of the pet.
  // 50 chars
  pet_pedigreename: string;
  // Required if “noPet” is 0. The date of birth of the pet in the format YYYY-MM-DD.
  pet_dob: string;
  // States whether pet date of birth is approximative. Valid values are 0 (no correction), 1 (day is not provided by user) and 2 (day and month are not provided by user). Default value is 0.
  pet_dob_approx: string;
  // The gender of the pet. Valid values are “M” and “F”.
  pet_gender: string;
  // This state whether pet is neutered or not. Valid values are “Y” and “N”.
  pet_neutered: string;
  // The date of vaccination in the format YYYY-MM-DD.
  vaccination_date: string;
  // This state whether pet is insured or not. Valid values are “Y” and “N”.
  pet_insured: string;
  // The medical conditions for the pet. Multiple values (see metadata page) can be sent mimicking the submission behavior of check boxes in a html form. Please refer <b><a href="/index.php/Animal_medical_conditions_list" title="Animal medical conditions list">Animal medical conditions list</a></b> for valid values.
  pet_medical_condition: string;
  // The tattoo number of the pet.
  // 40 chars
  tattoo_number: string;
  // The chip number of the pet.
  // 40 chars
  chip_number: string;
  // The Kennel Club number of the pet.
  // 40 chars
  kc_number: string;
  // The external id of the pet. This should be a unique value.
  // 50 chars
  pet_ext_id: string;
  // The communications preferences of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in a html form. Please refer <b><a href="/index.php/Communications_preferences_list" title="Communications preferences list">Communications preferences list</a></b> for valid values.
  com_prefs: string;
  // The interests of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in an html form. Please refer <b><a href="/index.php/Interest_list" title="Interest list">Interest list</a></b> for valid values.
  interests: string;
  // The subscriptions of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in an html form. Please refer <b><a href="/index.php/Subscriptions_list" title="Subscriptions list">Subscriptions list</a></b> for valid values.
  subscriptions: string;
  // The access rights of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in an html form. Please refer <b><a href="/index.php/Access_rights_list" title="Access rights list">Access rights list</a></b> for valid values.
  user_access_rights: string;
  // This states whether to send the registration confirmation mail or not. If registration confirmation mail is needed the value should be 1 and otherwise it should be 0. The default value is 1.
  send_welcome_mail: string;
  // Stores reference information on the origin of the user. This is used to give more context to the source of the registration. The source is taken automatically from the api key reference.
  // 50 chars
  user_origin_details: string;
  // This defines information that is returned in the profile object. Please refer <b><a href="/index.php/Data_Options" title="Data Options">Data Options</a></b> for valid values. Multiple values could be sent by separating them with commas. If this parameter is not specified or empty only <i>owner_details</i>, <i>pet_details</i>, <i>preferences</i>, <i>loyalty_cards</i>, <i>access_rights</i>, <i>pet_breed_details</i> and <i>pet_medical_condition_details</i> will be included.
  data_options: IUserDataOptions;
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

export interface ICountry {
  id: string;
  name: string;
  mobile_validation_rule: string | null;
  phone_prefix: string;
  has_post_code: string;
  region: string | null;
}
