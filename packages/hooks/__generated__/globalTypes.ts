/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface DealSubscribeInput {
  ref: string;
  partner_extid?: string | null;
  ean_code?: string | null;
  collection_ref?: string | null;
  secure_code?: string | null;
  pet_guid?: string | null;
  child_guid?: string | null;
  external_tracking_ref?: string | null;
  iban?: string | null;
  bic?: string | null;
  referral_code?: string | null;
  referral_code_type?: string | null;
  delivery_address_id?: string | null;
}

export interface PartnerLocatorInput {
  lat: string;
  lng: string;
  type?: string | null;
  radius?: number | null;
  limit?: number | null;
  collectionRef?: string | null;
  partner_group_handle?: string[] | null;
  excl_partner_group_handle?: string[] | null;
  stock_level?: number | null;
  search_term?: string | null;
  partner_status?: string | null;
}

export interface UserAddressCreateInput {
  name?: string | null;
  streetnum?: string | null;
  street1?: string | null;
  street2?: string | null;
  postalCode: string;
  city: string;
  country?: string | null;
  isDefault?: boolean | null;
}

export interface UserAddressUpdateInput {
  name?: string | null;
  streetnum?: string | null;
  street1?: string | null;
  street2?: string | null;
  postalCode: string;
  city: string;
  country?: string | null;
  isDefault?: boolean | null;
  id: string;
}

export interface UserChildCreateInput {
  firstName: string;
  birthday: string;
  gender: string;
  extId?: string | null;
}

export interface UserChildUpdateInput {
  guid: string;
  firstName?: string | null;
  birthday?: string | null;
  gender?: string | null;
  extId?: string | null;
}

export interface UserCreateInput {
  title?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  dob?: string | null;
  gender?: string | null;
  telephone?: string | null;
  mobilePhone?: string | null;
  email?: string | null;
  password?: string | null;
  language?: string | null;
  country?: string | null;
  originDetails?: string | null;
  postalCode?: string | null;
  city?: string | null;
}

export interface UserFavouritesCreateInput {
  date: any;
  type: string;
  content: string;
  source: string;
}

export interface UserPetBmiEntry {
  date: string;
  bmi: number;
  partner_ext_id?: string | null;
  source: string;
}

export interface UserPetCreateInput {
  name: string;
  type: string;
  breed: string;
  dob: string;
  neutered?: boolean | null;
  gender?: string | null;
  pictureUrl?: string | null;
  placeOfPurchase?: string | null;
  insured?: boolean | null;
  tattooNumber?: string | null;
  chipNumber?: string | null;
  bmi?: UserPetBmiEntry | null;
  weight?: UserPetWeightEntry | null;
  dietRecommendation?: UserPetDietRecommendationEntry | null;
}

export interface UserPetDeleteInput {
  guid: string;
  petDeletionCause?: string | null;
}

export interface UserPetDietRecommendationEntry {
  creation_date: string;
  collection_reference: string;
  expiration_date?: string | null;
  partner_ext_id?: string | null;
  ration?: string | null;
  ration_unit?: string | null;
}

export interface UserPetUpdateInput {
  guid: string;
  name: string;
  type?: string | null;
  breed?: string | null;
  dob?: string | null;
  gender?: string | null;
  neutered?: boolean | null;
  pictureUrl?: string | null;
  placeOfPurchase?: string | null;
  bmi?: UserPetBmiEntry | null;
  weight?: UserPetWeightEntry | null;
  lifestyle?: string | null;
  specialNeeds?: string[] | null;
  declarativeProduct?: string | null;
  dietRecommendation?: UserPetDietRecommendationEntry | null;
  medicalConditions?: string[] | null;
}

export interface UserPetWeightEntry {
  date: string;
  weight: number;
  partner_ext_id?: string | null;
  source: string;
}

export interface UserPublicSubscriptionsUpdateInput {
  subscriptions: string[];
}

export interface UserUpdateInput {
  title?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  dob?: string | null;
  gender?: string | null;
  telephone?: string | null;
  mobilePhone?: string | null;
  email?: string | null;
  password?: string | null;
  language?: string | null;
  country?: string | null;
  postalCode?: string | null;
  city?: string | null;
  street1?: string | null;
  streetnum?: string | null;
}

export interface UserUpdateSubscriptionsInput {
  com_prefs?: string | null;
  interests?: string[] | null;
  subscriptions?: string[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
