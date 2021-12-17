/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface DealSubscribeInput {
  bic?: string | null;
  child_guid?: string | null;
  collection_ref?: string | null;
  delivery_address_id?: string | null;
  ean_code?: string | null;
  external_tracking_ref?: string | null;
  iban?: string | null;
  partner_extid?: string | null;
  pet_guid?: string | null;
  ref: string;
  referral_code?: string | null;
  referral_code_type?: string | null;
  secure_code?: string | null;
}

export interface PartnerLocatorInput {
  collectionRef?: string | null;
  excl_partner_group_handle?: string[] | null;
  lat: string;
  limit?: number | null;
  lng: string;
  partner_group_handle?: string[] | null;
  partner_status?: string | null;
  radius?: number | null;
  search_term?: string | null;
  stock_level?: number | null;
  type?: string | null;
}

export interface UserAddressCreateInput {
  city: string;
  country?: string | null;
  isDefault?: boolean | null;
  name?: string | null;
  postalCode: string;
  street1?: string | null;
  street2?: string | null;
  streetnum?: string | null;
  type?: string | null;
}

export interface UserAddressUpdateInput {
  city: string;
  country?: string | null;
  id: string;
  isDefault?: boolean | null;
  name?: string | null;
  postalCode: string;
  street1?: string | null;
  street2?: string | null;
  streetnum?: string | null;
  type?: string | null;
}

export interface UserChildCreateInput {
  birthday: string;
  extId?: string | null;
  firstName: string;
  gender: string;
}

export interface UserChildUpdateInput {
  birthday?: string | null;
  extId?: string | null;
  firstName?: string | null;
  gender?: string | null;
  guid: string;
}

export interface UserCreateInput {
  city?: string | null;
  country?: string | null;
  dob?: string | null;
  email?: string | null;
  firstName?: string | null;
  gender?: string | null;
  language?: string | null;
  lastName?: string | null;
  mobilePhone?: string | null;
  originDetails?: string | null;
  password?: string | null;
  postalCode?: string | null;
  telephone?: string | null;
  title?: string | null;
}

export interface UserFavouritesCreateInput {
  content: string;
  date: any;
  source: string;
  type: string;
}

export interface UserPetBmiEntry {
  bmi: number;
  date: string;
  partner_ext_id?: string | null;
  source: string;
}

export interface UserPetCreateInput {
  bmi?: UserPetBmiEntry | null;
  breed: string;
  chipNumber?: string | null;
  dietRecommendation?: UserPetDietRecommendationEntry | null;
  dob: string;
  gender?: string | null;
  insured?: boolean | null;
  name: string;
  neutered?: boolean | null;
  pictureUrl?: string | null;
  placeOfPurchase?: string | null;
  tattooNumber?: string | null;
  type: string;
  weight?: UserPetWeightEntry | null;
}

export interface UserPetDeleteInput {
  guid: string;
  petDeletionCause?: string | null;
}

export interface UserPetDietRecommendationEntry {
  collection_reference: string;
  creation_date: string;
  expiration_date?: string | null;
  partner_ext_id?: string | null;
  ration?: string | null;
  ration_unit?: string | null;
}

export interface UserPetUpdateInput {
  bmi?: UserPetBmiEntry | null;
  breed?: string | null;
  declarativeProduct?: string | null;
  dietRecommendation?: UserPetDietRecommendationEntry | null;
  dob?: string | null;
  gender?: string | null;
  guid: string;
  lifestyle?: string | null;
  medicalConditions?: string[] | null;
  name: string;
  neutered?: boolean | null;
  pictureUrl?: string | null;
  placeOfPurchase?: string | null;
  specialNeeds?: string[] | null;
  type?: string | null;
  weight?: UserPetWeightEntry | null;
}

export interface UserPetWeightEntry {
  date: string;
  partner_ext_id?: string | null;
  source: string;
  weight: number;
}

export interface UserPublicSubscriptionsUpdateInput {
  subscriptions: string[];
}

export interface UserUpdateInput {
  city?: string | null;
  country?: string | null;
  dob?: string | null;
  email?: string | null;
  firstName?: string | null;
  gender?: string | null;
  language?: string | null;
  lastName?: string | null;
  mobilePhone?: string | null;
  password?: string | null;
  postalCode?: string | null;
  street1?: string | null;
  streetnum?: string | null;
  telephone?: string | null;
  title?: string | null;
}

export interface UserUpdateSubscriptionsInput {
  com_prefs?: string | null;
  interests?: string[] | null;
  subscriptions?: string[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
