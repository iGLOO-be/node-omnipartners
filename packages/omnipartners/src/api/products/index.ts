import Api, { IApiFetchOptions } from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";
import {
  ICollectionDataOptions,
  IProductDataOptions,
  IArticlesDataOptions,
} from "../../types";

export interface IProduct {
  product_id: string;
  product_ean: string;
  product_label: string;
  product_friendly_name?: string;
  product_recommended_retail_price: string;
  product_weight: string;
  product_net_weight: string;
  product_gross_weight: string | null;
  product_packaging_units: string | null;
  product_packaging_container_type_info: string | null;
  product_packaging_value: string | null;
  product_packaging_gross_weight: string | null;
  product_collection_reference: string;
  product_groups: string[];
  "pro_adviced_price ": string; // LOL
  pro_animal_type: string;
  pro_cust_box: string;
  pro_deals_label: string;
  pro_inventory: string;
  pro_net_weight: string;
  pro_price: string;
  pro_price_cat: string;
  pro_price_catconv: string;
  pro_price_dog: string;
  pro_price_dogconv: string;
  pro_price_pos: string;
}

export type IGetCollectionsByTargetingInfoInputFilterByAll =
  | {
      filter_type: "SPECIES";
      species_type?: string;
      univers?: string;
      breed?: string;
    }
  | {
      filter_type: "NEUTERED";
      neutered: "YES" | "NO";
    }
  | {
      filter_type: "GENDER";
      gender: "M" | "F";
    }
  | {
      filter_type: "PURCHASE_PLACE";
      purchase_place: string;
    }
  | {
      filter_type: "AGE";
      unit?: "WEEK" | "MONTH" | "YEAR";
      age?: string;
      age_from?: string;
      age_to?: string;
    }
  | {
      filter_type: "RANGE";
      range_reference: string;
    }
  | {
      filter_type: "PET_BCS";
      pet_bcs: number;
    }
  | {
      filter_type: "PET_WEIGHT";
      pet_weight: string;
    }
  | {
      filter_type: "PET_STAGES";
      pet_stages: string[];
    }
  | {
      filter_type: "TARGET_AUDIENCE";
      public_visibility: "YES" | "NO";
      partners_visibility: "YES" | "NO";
      partner_types: string[];
    }
  | {
      filter_type: "PET_ALLERGENS";
      pet_allergens: string[];
    }
  | {
      filter_type: "PET_HEALTH_CONTEXT";
      pet_health_context: string[];
    };

export interface IGetCollectionsByTargetingInfoInputFilterByAllSimple {
  filter_type:
    | "SPECIES"
    | "NEUTERED"
    | "GENDER"
    | "PURCHASE_PLACE"
    | "AGE"
    | "RANGE"
    | "PET_BCS"
    | "PET_WEIGHT"
    | "PET_STAGES"
    | "TARGET_AUDIENCE"
    | "PET_ALLERGENS"
    | "PET_HEALTH_CONTEXT";

  // SPECIES
  species_type?: string;
  univers?: string;
  breed?: string;

  // NEUTERED
  neutered?: "YES" | "NO";

  // GENDER
  gender?: "M" | "F";

  // PURCHASE_PLACE
  purchase_place?: string;

  // AGE
  unit?: "WEEK" | "MONTH" | "YEAR";
  age?: string;
  age_from?: string;
  age_to?: string;

  // RANGE
  range_reference?: string;

  // PET_BCS
  pet_bcs?: number;

  // PET_WEIGHT
  pet_weight?: string;

  // PET_STAGES
  pet_stages?: string[];

  // TARGET_AUDIENCE
  public_visibility?: "YES" | "NO";
  partners_visibility?: "YES" | "NO";
  partner_types?: string[];

  // PET_ALLERGENS
  pet_allergens?: string[];

  // PET_HEALTH_CONTEXT
  pet_health_context?: string[];
}

export interface IGetCollectionsByTargetingInfoInput {
  // (Optional) Partner Id. Two types of IDs are acceptable here which are terminal Id (http://doc.omnipartners.be/index.php/List_Partners_with_Terminals) and Partner Ext Id (http://doc.omnipartners.be/index.php/List_Partners). Moreover the parameter has a single input. partner_id has first priority than partner_group_handle.
  partner_id?: string;
  // (Optional) Partner Id Type. The Value can be 'terminal' or 'extid'. This parameter represents the type of partner_id defined.
  partner_id_type?: string;
  // (Optional) Reference of a deal. Please refer here for valid deal references. This parameter will use to filter collections from the collections , which were associated with the deal.
  deal_reference?: string;
  // (Optional) Partner Group Handle. (http://doc.omnipartners.be/index.php/List_Partners_Group). In the search algorithm , this information will be used to filter collections from collection range information and from partner groups which are associated with collections.If Partner Ext Id is not available and Partner Group Handle is available then the Partner Group Handle will use to filter the collections.
  partner_group_handle?: string;
  // (Optional) Pet's GUID
  pet_guid?: string;
  // (Optional) User's GUID
  user_guid?: string;
  // (Optional) Diagnostic Codes. This should be a comma separated string or an array of codes. When provided the diagnostic codes will be mapped against PATHOLOGIES in order to set the global filter. These values override any pathology provided explicitely in the method. Moreover, the operator which is applying for the criteria match will be "Any" by default. (i.e. if there is a diagnotic code and a pathology, the pathology will be ignored and replaced by the one derived from the diagnotic code... even if there is no pathology.).
  diagnostic_codes?: string;
  // (Optional) Criteria block to filter collections by all the given criteria (All the criteria should match)
  filter_by_all?:
    | IGetCollectionsByTargetingInfoInputFilterByAllSimple[]
    | IGetCollectionsByTargetingInfoInputFilterByAll[];
  // (Optional) Type of filter criteria. There can be multiple criterias combined. Valid types are SPECIES, NEUTERED, GENDER, PURCHASE_PLACE, AGE, PATHOLOGIES, LIFESTYLE, RANGE,TARGET_AUDIENCE,PET_ALLERGENS,PET_HEALTH_CONTEXT or PET_BCS.
  filter_type?: string;
  // (Optional) Id of the pet type (see http://doc.omnipartners.be/index.php/Animal_types_list) (for filter_type = SPECIES)
  species_type?: string;
  // (Optional) Related univers of the selected species type (see http://doc.omnipartners.be/index.php/Animal_universes_list) (for filter_type = SPECIES)
  univers?: string;
  // (Optional) Id of the breed (see http://doc.omnipartners.be/index.php/Animal_breeds_list) (for filter_type = SPECIES)
  breed?: string;
  // (Optional) Is neutered. This can hold either YES/NO or true/false (for filter_type = NEUTERED)
  neutered?: string;
  // (Optional) This defines the gender of the pet. Valid values are M or F. (for filter_type = GENDER)
  gender?: string;
  // (Optional) This can hold Purchase Place code information. In the search algorithm , this information will be used to filter collections from collection range information. (for filter_type = PURCHASE_PLACE)
  purchase_place?: string;
  // (Optional) Age unit. This can be WEEK, MONTH or YEAR (for filter_type = AGE)
  unit?: string;
  // (Optional) Specify age of the pet. When this is selected there no need to define a range. (for filter_type = AGE)
  age?: string;
  // (Optional) Starting age of the age range. This can be used when the exact range is not known. (for filter_type = AGE)
  age_from?: string;
  // (Optional) Ending age of the age range. This can be used when the exact range is not known. (for filter_type = AGE)
  age_to?: string;
  // (Optional) Date of birth of the pet as YYYY-MM-DD. When dob is specified other values specified for the AGE filter type are discarded. (for filter_type = AGE)
  dob?: string;
  // (Optional) Array of Medical condition ids. Can give multiple. (see http://doc.omnipartners.be/index.php/Animal_medical_conditions_list). If the filter is not set in the request that means "we don't know if there is a pathology or not". The filter can also be set but left empty, in which case it means "we know there is no pathology". Of course, specifying one or more pathology ids means the pet suffers from this(ese) pathology(ies). (for filter_type = PATHOLOGIES)
  pathologies?: string;
  // (Optional) Array of Ids of valid lifestyles. Can give multiple. (see http://doc.omnipartners.be/index.php/Animal_lifestyles_list) (for filter_type = LIFESTYLE)
  lifestyle?: string;
  // (Optional) valid values for this parameter is "All" or "Any" . If the value is "All", result will be based all the lifestyles passing above. Otherwise the result will be based on at least one lifestyle which is passing. Default value is "Any". (for filter_type = LIFESTYLE)
  operator?: string;
  // (Optional) Reference of a range. (see http://doc.omnipartners.be/index.php/Get_Range_List) (for filter_type = RANGE)
  range_reference?: string;
  // (Optional) Pet's Weight measured in grams. This will be used in pet ration finder process. (for filter_type = PET_WEIGHT)
  pet_weight?: string;
  // (Optional) Pet's Body Condition Score search value. This should be a valid value (Positive integer value which is 1 or greater and less than or equal to 9 ). (for filter_type = PET_BCS)
  pet_bcs?: string;
  // (Optional) This parameter requires an array of valid animal stage codes defined here http://doc.omnipartners.be/index.php/Get_Animal_Stages. If the parameter is not given, then the animal stage will be calculated according to the given age , species type , universe and breed of the pet. (for filter_type = PET_STAGES)
  pet_stages?: string;
  // (Optional) Valid values are 'YES' and 'NO'.Required if the filter type is available. This is used in the searching algorithm to match the range information which is associated with the collection. (for filter_type = TARGET_AUDIENCE)
  partners_visibility?: string;
  // (Optional) Valid values are 'YES' and 'NO'. Required if the filter type is available.This is used in the searching algorithm to match the range information which is associated with the collection. (for filter_type = TARGET_AUDIENCE)
  public_visibility?: string;
  // (Optional) Please refer here for valid list of partner type codes. An array of values are accepted . If 'partners_visibility' is 'Yes' , then the value for partner type is required. This is used in the search algorithm to match the range information which is associated with the collection. (for filter_type = TARGET_AUDIENCE)
  partner_types?: string;
  // (Optional) Valid array of values are components which are listed under allergen components . Please refer here for valid list of allergen codes. Multiple values are accepted. (for filter_type = PET_ALLERGENS)
  pet_allergens?: string;
  // (Optional) Array of values of valid health context codes.Please refer here for valid list of health context codes. (for filter_type = PET_HEALTH_CONTEXT)
  pet_health_context?: string;
  // (Optional) Language ID will use to filter the collection name. Please refer here for the language list.
  language?: string;
  // (Optional) States whether returned URLs should be secured or not. Valid values are 0 and 1. Default value is 0.
  use_https_urls?: string;
  // (Optional) This parameter will return the product ration for each collection if the value is set to 1 and required values for the product ration calculation are available. Valid values are 0 and 1. Default value is 0. This calculation will be based on the pet ration calculation - http://doc.omnipartners.be/index.php/Get_Collection_Pet_Ration
  show_ration?: string;
  // (Optional) If collection's range property, "hide products from other ranges" is true and "apply_range_exlusions" parameter is set to 1 or it is not set, products with other collection ranges are excluded from the result. Valid values are 0 and 1. Default value is 1.
  apply_range_exlusions?: string;
  // (Optional) This defines information that is returned in the profile object. For more information please refer Data Options. Please note that the excessive usage of data options will result performance issues and In worst case API timeouts.
  data_options?: IProductDataOptions;
  // (Optional) Pet's Predicted adult Weight measured in grams.This is a parameter which is used to calculate the ration . And this will be applicable only if the show_ration parameter is true. More information about this parameter is mentioned here : http://doc.omnipartners.be/index.php/Get_Collection_Ration , http://doc.omnipartners.be/index.php/Get_Collection_Pet_Ration
  ration_predicted_weight?: string;
}

export type IGetArticlesByTargetingInfoInputFilterByAll =
  | {
      filter_type: "SPECIES";
      species_type?: string;
      univers?: string;
      breed?: string;
    }
  | {
      filter_type: "NEUTERED";
      neutered: "YES" | "NO";
    }
  | {
      filter_type: "GENDER";
      gender: "M" | "F";
    }
  | {
      filter_type: "AGE";
      unit?: "WEEK" | "MONTH" | "YEAR";
      age?: string;
      age_from?: string;
      age_to?: string;
    }
  | {
      filter_type: "PATHOLOGIES";
      pathologies?: string[];
      operator?: "All" | "Any";
    }
  | {
      filter_type: "LIFESTYLE";
      lifestyle?: string[];
      operator?: "All" | "Any";
    }
  | {
      filter_type: "PET_BCS";
      pet_bcs: number;
    }
  | {
      filter_type: "PET_STAGES";
      pet_stages: string[];
    }
  | {
      filter_type: "PET_ALLERGENS";
      pet_allergens: string[];
    }
  | {
      filter_type: "PET_HEALTH_CONTEXT";
      pet_health_context: string[];
    };

export interface IGetArticlesByTargetingInfoInputFilterByAllSimple {
  filter_type:
    | "SPECIES"
    | "NEUTERED"
    | "GENDER"
    | "AGE"
    | "PATHOLOGIES"
    | "LIFESTYLE"
    | "PET_BCS"
    | "PET_STAGES"
    | "PET_ALLERGENS"
    | "PET_HEALTH_CONTEXT";

  // SPECIES
  species_type?: string;
  universe?: string;
  breed?: string;

  // NEUTERED
  neutered?: boolean;

  // GENDER
  gender?: "M" | "F";

  // AGE
  unit?: "WEEK" | "MONTH" | "YEAR";
  age?: string;
  age_from?: string;
  age_to?: string;

  // PATHOLOGIES
  pathologies?: string[];

  // LIFESTYLE
  lifestyle?: string[];

  // PATHOLOGIES / LIFESTYLE
  operator?: "All" | "Any";

  // PET_BCS
  pet_bcs?: number;

  // PET_STAGES
  pet_stages?: string[];

  // PET_ALLERGENS
  pet_allergens?: string[];

  // PET_HEALTH_CONTEXT
  pet_health_context?: string[];
}

export interface IGetArticlesByTargetingInformationInput {
  filter_by_all:
    | IGetArticlesByTargetingInfoInputFilterByAllSimple[]
    | IGetArticlesByTargetingInfoInputFilterByAll[];
  pet_guid?: string;
  filter_type?: string;
  species_type?: string;
  universe?: string;
  breed?: string;
  neutered?: string;
  gender?: string;
  unit?: string;
  age?: string;
  age_from?: string;
  age_to?: string;
  dob?: string;
  pathologies?: string[];
  lifestyle?: string[];
  operator?: string;
  pet_bcs?: number;
  pet_stages?: string[];
  pet_allergens?: string[];
  pet_health_context?: string[];
  language?: string;
  data_options?: IArticlesDataOptions;
  user_guid?: string;
}

export interface IGetArticlesByTargetingInformation {
  reference: string;
  generic_name: string;
  name: string;
  description: string; // if no language set => {locale: string}
  introduction: string;
  id: string;
  score: number;
  secondary_sorting_weight: string;
  max_score: number;

  // data_options content
  content?: {
    category: string;
    category_picture_url: string;
    type?: string;
    header: string;
    body: string;
    link: string;
    link_text: string;
    picture_url: string;
    picture_target_link: string;
  };

  // data_options targeting
  targeting?: {
    pathologies: string;
    pet_stage: { code: string }[];
    pet_gender: string;
    pet_neutered: string;
    pet_lifestyle_code: { code: string }[];
    sort_weight: string;
    pet_species: string[];
    pet_universe: string;
    pet_breed: string;
    pet_allergens: string;
    pet_health_context: string;
    pet_bcs_operator: string;
    pet_bcs_start: string;
    pet_bcs_end: string;
    pet_age_from: string;
    pet_age_to: string;
    pet_age_unit: string;
  };

  // data_options targeting_constraints
  targeting_constraints?: {
    pet_stage_constraint: string;
    pet_gender_constraint: string;
    pet_neutered_constraint: string;
    pet_lifestyle_constraint: string;
    pet_species_constraint: string;
    pet_universe_constraint: string;
    pet_breed_constraint: string;
    pet_bcs_constraint: string;
    pet_health_context_constraint: string;
    pet_allergen_constraint: string;
    pet_age_constraint: string;
    special_needs_constraint: boolean;
  };
}

export interface IGetArticleInput {
  article_reference: string;
  language: string;
  data_options?: IArticlesDataOptions;
}

export interface IGetArticleByPetGuidInput {
  pet_guid: string;
  language?: string;
  data_options?: IArticlesDataOptions;
}

export interface IGetArticleByUserGuidInput {
  user_guid: string;
  language?: string;
  data_options?: IArticlesDataOptions;
}

export interface ICollectionAvailablePackage {
  ean: string;
  label: string;
  weight: string;
  net_weight: string;
  gross_weight: null;
  packaging_units: string;
  packaging_value: string;
  packaging_gross_weight: string | null;
  container_type_info: {
    code: string;
    generic_name: string;
    tranlated_name: {
      fr: string;
    };
    measure_type: string;
    measure_unit: string;
  };
}

export interface IGetCollectionsByTargetingInfoCollection {
  reference: string;
  generic_name: string;
  name: string;
  energy_level: number;
  has_image: boolean;
  description: string;
  tag_line: string;
  introduction: string;
  id: string;
  score: number;
  secondary_sorting_weight: string;
  range_priority_order: string;
  max_score: number;
  pf_tracking_reference: string;
  criteria_source_reference: string | null;

  // Depends on data_options = images
  images?: {
    image: string;
    image_small: string;
    image_medium: string;
    image_large: string;
  };

  // Depends on data_options = product_groups
  product_groups?: string[];

  // Depends on data_options = available_packages
  available_packages?: ICollectionAvailablePackage[];
}

export interface IGetCollectionByPetGUIDInput {
  pet_guid: string;
  user_guid?: string;
  partner_id?: string;
  partner_id_type?: string;
  partner_group_handle?: string;
  language?: string;
  add_clientof_partner_groups?: string;
  use_https_urls?: string;
  apply_range_exlusions?: string;
  data_options?: string[];
  is_gestation?: string;
  sort_order?: string;
  component_sort_order?: string;
  ignore_old_format?: string;
}

export interface IGetCollectionWithProductsInput {
  use_https_urls?: 0 | 1;
  collection_reference?: string;
  product_group_handle?: string;
  add_product_details?: 0 | 1;
  add_product_groups?: 0 | 1;
  lang?: string;
}

export interface IGetCollectionWithProducts {
  collection_reference: string;
  collection_generic_name: string;
  collection_name: string;
  collection_range_reference: string;
  collection_range_family_reference: string;
  has_image: 0 | 1;
  collection_image?: string;
  collection_image_small?: string;
  collection_image_medium?: string;
  collection_image_large?: string;
  products: {
    product_label: string;
    product_friendly_name?: string;
    product_recommended_retail_price?: string;
    product_weight: string;
    product_ean: string;
    product_code: string;
    product_groups: string[];
    pro_brand_label?: string;
    pro_range: string;
    pro_range_name: string;
    pro_member_price?: string;
    pro_rank?: string;
    pro_stock?: string;
    pro_stock_location?: string;
    pro_url_fr?: string;
    pro_url_nl?: string;
  }[];
}

export interface IGetCollectionByPetGUID {
  reference: string;
  generic_name: string;
  name: string;
  energy_level: number;
  has_image: 1 | 0;
  excluded_pathologies: string;
  description: string;
  tag_line: string;
  introduction: string;
  range_reference: string;
  family_reference: string;
  stage: [{ code: "ADULT"; name: "ADULT" }, { code: "MATURE"; name: "MATURE" }];
  image: string;
  image_small: string;
  image_medium: string;
  image_large: string;
  criteria_match: string;
  criteria_requested: string;
  criteria_defined: string;
  criteria_source: string;
  secondary_sorting_weight: string;
  pf_tracking_reference: string;
  criteria_source_reference: string;
  range?: {
    reference: string;
    generic_name: string;
    priority: string;
    name: string;
    tag_line: string;
    description: string;
    targeting: {
      incl_partner_groups: string[];
      excl_partner_groups: string[];
      incl_places_purchase: string[];
      excl_places_purchase: string[];
    };
  };
}

export interface IGetCollectionDetailsInput {
  // (Required) This will hold the Reference of the collection. (http://doc.omnipartners.be/index.php/List_Collection_References)
  collection_reference: string;
  // (Required) Language ID, you can find this by using the following service. http://doc.omnipartners.be/index.php/Language_list
  language: string;
  // (Optional) States whether returned URLs should be secured or not. Valid values are 0 and 1. Default value is 0.
  use_https_urls?: 0 | 1;
  // (Optional) This defines information that is returned in the response. Multiple values should be comma separated. For more information please refer Data Options.
  data_options?: ICollectionDataOptions;
  // (Optional) Valid value is "component_name". If this is provided and not empty, then the collection components in the response will order according to the alphabetical order of components name. Otherwise it'll get ordered from the order defined in the collection level components.
  component_sort_order?: string;
  // (Optional) Ignore the old format of the response.Valid values are 0 and 1. Default value is 0.
  ignore_old_format?: string;
}

export interface ICollectionDetailBenefit {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ICollectionDetailProduct {
  ean: string;
  code: string;
  label: string;
  weight?: string | null;
  net_weight?: string | null;
  gross_weight?: string | null;
}
export interface ICollectionDetailRelatedCollection {
  reference: string;
  type: string;
}

export interface ICollectionDetail {
  reference: string;
  generic_name: string;
  name: string;
  energy_level: number;
  has_image: 0 | 1;
  contains: [];
  does_not_contain: [];
  caloric_table: null;
  benefits: ICollectionDetailBenefit[];
  key_benefits?: string[];
  collection_reference: string;
  collection_generic_name: string;
  collection_name: string;
  collection_description: string;
  collection_tag_line: string;
  collection_introduction: string;
  collection_range_reference: string;
  collection_range_family_reference: string;
  collection_energy_level: number;
  collection_image?: string;
  collection_image_small?: string;
  collection_image_medium?: string;
  collection_image_large?: string;
  collection_caloric_table: null;
  images?: {
    image?: string | null;
    image_small?: string | null;
    image_medium?: string | null;
    image_large?: string | null;
  };
  products?: ICollectionDetailProduct[];
  related_collections?: ICollectionDetailRelatedCollection[];
  // data_options: range
  range?: {
    reference: string;
    generic_name: string;
    priority: string;
    name: string;
    tag_line: string;
    description: string;
    targeting: {
      incl_partner_groups: string[];
      excl_partner_groups: string[];
      incl_places_purchase: string[];
      excl_places_purchase: string[];
    };
  };
  available_packages?: {
    ean: string;
    code: string;
    label: string;
    weight?: string;
    net_weight?: string;
    gross_weight?: string;
    packaging_units?: string;
    packaging_value?: string;
    packaging_gross_weight?: string;
    container_type_info?: string;
  }[];
}

export interface IProductGroupListItem {
  product_group_handle: string;
  product_group_name: string;
}

export interface IFindProductCollectionInput {
  use_https_urls?: 0 | 1;
  resolve_by: string;
  value: string;
  language?: string;
  data_options?: ICollectionDataOptions;
  component_sort_order?: string;
  ignore_old_format?: 0 | 1;
  search_mode?:
    | "exact"
    | "sounds_like"
    | "looks_like"
    | "partial_string"
    | "partial_words";
}

export type ApproximationCodes =
  | "APC001"
  | "APC002"
  | "APC003"
  | "APC004"
  | "APC005"
  | "APC006";

/**
 * * **@pet_weight**: required only if pet has no weight set
 */
export interface IGetCollectionPetRationInput {
  pet_weight?: string; // Required if pet has no weight series
  pet_guid: string;
  pet_predicted_adult_weight?: string;
  pet_bcs?: string;
  energy_level?: string;
  collection_reference?: string;
  language?: string;
}

export interface ICollectionPetRation {
  debug: {
    exponent: number;
    constant: number;
  };
  energy_value: number;
  ration_value: number;
  energy_value_unit: string;
  ration_value_unit: string;
  approximation_codes: ApproximationCodes[];
  ration_in_cups_per_day: string;
  number_of_cups_per_day: string;
}

export interface IAddProductInput {
  product_ean: number | string;
  product_label: string;
  product_code: string;
  product_status: 1 | 0;
  product_collection_reference?: string;
  product_collection_gen_name?: string;
  product_group_handles?: string;
  product_friendly_name?: string;
  product_rr_price?: string;
  product_pp_price?: string;
  product_weight?: number;
  product_gross_weight?: number;
  product_packaging_container_type?: string;
  product_packaging_value?: string;
  product_packaging_units?: number;
  product_packaging_gross_weight?: number;
  product_publicly_not_available?: 1 | 0;
  custom_fields?: Record<string, string>;
}

export default class Products extends Api {
  public defaultHost = "https://products.clixray.io/";

  public errorMap = {
    1000: { message: "Action not available." },
    1001: { message: "Invalid action." },
    1002: { message: "Client key not available." },
    1003: { message: "Invalid client key." },
    1004: { message: "Hash not available." },
    1005: { message: "Invalid hash." },
    1006: { message: "Access denied." },
    1014: { message: "Invalid language." },
    1024: { message: "Invalid criteria filter type usage." },
    1027: { message: "Input filter type parameters are required." },
    1028: { message: "Invalid criteria filter type." },
    1060: { message: "Invalid Value for Filter type Pet's BCS." },
    1008: { message: "Invalid partner_ext_id." },
    1009: { message: "Invalid partner_group_handle." },
    1015: { message: "Pet GUID not available." },
    1016: { message: "Invalid Pet GUID." },
    1017: { message: "Inactive pet." },
    1021: { message: "Internal error." },
    1023: { message: "Invalid Request." },
    1058: { message: "Invalid Terminal Id." },
    1030: { message: "Missing required fields." },
    1034: { message: "Pet owner not found." },
    1035: { message: "Pet owner not active." },
    1939: {
      message: "Invalid Data Provided (Ration value cannot be calculated).",
    },
    1940: {
      message:
        "Either energy level is not specified or collection doesn't have the energy level defined.",
    },
    1941: { message: "Invalid pet weight value." },
    1942: { message: "Invalid pet BCS value." },
    1943: {
      message:
        "Invalid pet BCS constant (Which is used inside the calculation).",
    },
    1954: { message: "Pet Species not found." },
    1955: { message: "Invalid pet Species." },
    1968: {
      message:
        "Pet Info not found. (When any of pet_species or pet_breed is not provided).",
    },
    1969: { message: "Invalid Breed." },
    1973: { message: "Invalid Pet Stage." },
    1974: { message: "Pet feeding Stage is Empty." },
    1975: { message: "Cannot Derive Pet feeding Stage." },
    1977: { message: "Pet neutered value is Invalid." },
    1979: { message: "Pet's predicted Adult Weight is required." },
    1980: { message: "Breed is required for the calculation." },
    1981: { message: "Pet's Age is required for the calculation." },
    1982: {
      message:
        "Predicted Adult Weight is not supporting for the calculation (Value mismatch).",
    },
    1983: {
      message: "Age is not supporting for the calculation ( Value mismatch).",
    },
    1984: {
      message:
        "Pet is not in Growth feeding stage (Provided information does not match for the Growth Feeding stage).",
    },
    1991: { message: "Invalid Value for pet's predicted adult weight." },
    1992: { message: "Invalid Value supplied for energy level." },
    1989: { message: "Empty pet weight." },
    2005: { message: "Invalid Component sort order field found." },
    2010: { message: "No pets found for the user." },
  };

  public _call(action: string, data: any, options: IApiFetchOptions = {}) {
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

  @doc("http://doc.omnipartners.be/index.php/Get_Product_By_EAN_or_Code")
  @filterInput(["product_ean", "product_code"])
  public getProduct(data: {
    product_ean?: string;
    product_code?: string;
  }): Promise<{ data: IProduct }> {
    return this._call("get-product", data, {
      errorMap: {
        1020: { message: "Product ean or code required." },
      },
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Collection_Details")
  @filterInput([
    "collection_reference",
    "language",
    "use_https_urls",
    "data_options",
    "component_sort_order",
    "ignore_old_format",
  ])
  public getCollectionDetails(
    data: IGetCollectionDetailsInput,
  ): Promise<{ data: ICollectionDetail }> {
    return this._call(
      "get-collection-details",
      {
        ...data,
        data_options: data.data_options
          ? Array.isArray(data.data_options)
            ? data.data_options.join(",")
            : data.data_options
          : undefined,
      },
      {
        errorMap: {
          1018: { message: "collection reference can not be empty." },
          1019: { message: "language reference can not be empty." },
          1014: { message: "Invalid language." },
          2005: { message: "Invalid Component sort order field found." },
        },
        retry: true,
      },
    );
  }

  @doc("http://doc.omnipartners.be/index.php/Find_product_collection")
  @filterInput([
    "use_https_urls",
    "resolve_by",
    "value",
    "language",
    "data_options",
    "component_sort_order",
    "ignore_old_format", // Ignore the old format of the response.Valid values are 0 and 1. Default value is 0.
    "search_mode", // Search mode of the searching value. Valid values are "exact", "sounds_like", "looks_like", "partial_string" and "partial_words". Default value is "exact". This parameter is valid for "collection_name", "collection_reference" and "collection_ranges" resolve-by values only.
  ])
  public findProductCollection(
    data: IFindProductCollectionInput,
  ): Promise<{ data: [ICollectionDetail] }> {
    return this._call(
      "find-product-collection",
      {
        "resolve-by": data.resolve_by,
        data_options: data.data_options
          ? Array.isArray(data.data_options)
            ? data.data_options.join(",")
            : data.data_options
          : undefined,
        ...data,
      },

      {
        errorMap: {
          1011: { message: "resolve-by field can not be empty." },
          1012: { message: "resolve-by field can not be empty." },
          1013: { message: "resolve-by field can not be empty." },
          1014: { message: "resolve-by field can not be empty." },
          1029: { message: "resolve-by field can not be empty." },
        },
        retry: true,
      },
    );
  }

  @doc(
    "http://doc.omnipartners.be/index.php/List_Collections_by_Targeting_Information",
  )
  @filterInput([
    "partner_id",
    "partner_id_type",
    "deal_reference",
    "partner_group_handle",
    "pet_guid",
    "user_guid",
    "diagnostic_codes",
    "filter_by_all",
    "filter_type",
    "species_type",
    "univers",
    "breed",
    "neutered",
    "gender",
    "purchase_place",
    "unit",
    "age",
    "age_from",
    "age_to",
    "dob",
    "pathologies",
    "lifestyle",
    "operator",
    "range_reference",
    "pet_weight",
    "pet_bcs",
    "pet_stages",
    "partners_visibility",
    "public_visibility",
    "partner_types",
    "pet_allergens",
    "pet_health_context",
    "language",
    "use_https_urls",
    "show_ration",
    "apply_range_exlusions",
    "data_options",
    "ration_predicted_weight",
  ])
  public getCollectionsByTargetingInfo(
    data: IGetCollectionsByTargetingInfoInput,
  ): Promise<{ data: IGetCollectionsByTargetingInfoCollection[] }> {
    return this._call("get-collections-by-targeting-info", data, {
      errorMap: {
        1008: { message: "Invalid partner_ext_id." },
        1009: { message: "Invalid partner_group_handle." },
        1014: { message: "Invalid language." },
        1022: { message: "Invalid range." },
        1024: { message: "Invalid criteria filter type usage." },
        1027: { message: "Input filter type parameters are required." },
        1028: { message: "Invalid criteria filter type." },
        1944: {
          message:
            'External services used to retrieve contents failed. Additional information of this failure will be displayed under the property, "ext_svc_err".',
        },
        1058: { message: "Invalid Terminal Id." },
        1059: { message: "Invalid Value for Filter type Pet's weight." },
        1060: { message: "Invalid Value for Filter type Pet's BCS." },
      },
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/List_Collection_by_Pet_GUID")
  @filterInput([
    "pet_guid", // (Required) Pet's GUID
    "user_guid", // (Optional) Users's GUID
    "partner_id", // (Optional) Partner Id. Two types of IDs are acceptable here which are terminal Id (http://doc.omnipartners.be/index.php/List_Partners_with_Terminals) and Partner Ext Id (http://doc.omnipartners.be/index.php/List_Partners). Moreover the parameter has a single input. partner_id has first priority than partner_group_handle.
    "partner_id_type", // (Optional) Partner Id Type. The Value can be 'terminal' or 'extid'. This parameter represents the type of partner_id defined.
    "partner_group_handle", // (Optional) Partner Group Handle. (http://doc.omnipartners.be/index.php/List_Partners_Group). If Partner Ext Id is not available and Partner Group Handle is available then the Partner Group Handle will use to filter the collections
    "language", // (Optional) Language ID will use to filter the collection name. you can find this by using the following service. Please refer here.
    "add_clientof_partner_groups", // (Optional) If enabled the groups of the partners belonging to the 'clienof' relationships of the pet owner are considered when listing the collections. Valid values are '0' OR '1' . Default value is '0'
    "use_https_urls", // (Optional) States whether returned URLs should be secured or not. Valid values are 0 and 1. Default value is 0.
    "apply_range_exlusions", // (Optional) If collection's range property, "hide products from other ranges" is true and "apply_range_exlusions" parameter is set to 1 or it is not set, products with other collection ranges are excluded from the result. Valid values are 0 and 1. Default value is 1.
    "data_options", // (Optional) This defines information that is returned in the profile object. For more information please refer Data Options.Please note that the excessive usage of data options will result performance issues and In worst case API timeouts.
    "is_gestation", // (Optional) This defines gestation of the pet and it can contain values Y/N. Y is for YES and N is for NO.
    "sort_order", // (Optional) This defines how the resulting collection are sorted. Valid values are "collection_name" and "sorting_weight". By default the result is ordered only by the "sorting weight" defined in the collection. But if you specify one of the sorting values the sort behavior changes as follows. When sort_order is,  collection_name - the resulting collections will be sorted by the translated name sorting_weight - the resulting collections will be sorted by the "sorting weight" defined in the collection and then by translated name
    "component_sort_order", // (Optional) Valid value is "component_name". If this is provided and not empty, then the collection components in the response will order according to the alphabetical order of components name. Otherwise it'll get ordered from the order defined in the collection level components.
    "ignore_old_format", // (Optional) Ignore the old format of the response.Valid values are 0 and 1. Default value is 0.
  ])
  public getCollectionsByPetGUID(
    data: IGetCollectionByPetGUIDInput,
  ): Promise<{ data: IGetCollectionByPetGUID[] }> {
    return this._call("get-collections-by-pet-guid", data, {
      errorMap: {},
      retry: true,
    });
  }

  @doc("https://doc.clixray.com/index.php?title=List_Collections_With_Products")
  @filterInput([
    "use_https_urls", // (Optional) States whether returned URLs should be secured or not. Valid values are 0 and 1. Default value is 0.
    "collection_reference", // (Optional) Specify the collection reference
    "product_group_handle", // (Optional) Specify the product group handle. This will filter the collections by the product group handle.
    "add_product_details", // (Optional) State whether to add product details to the response. Valid values are 0 and 1. Default value is 1
    "add_product_groups", // (Optional) State whether to add product groups to the response. Valid values are 0 and 1. Default value is 0. This is only effective if add_product_details is 1.
    "lang", // (Optional) The language which translations should be provided.
  ])
  public getCollectionsWithProducts(
    data?: IGetCollectionWithProductsInput,
  ): Promise<{ data: IGetCollectionWithProducts[] }> {
    return this._call("get-collections", data, {
      errorMap: {},
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Product_Group_List")
  @filterInput([
    "group_handle", // The “Product Group Handle” used to filter and retrieve product group information relative to the handle.
  ])
  public getProductGroupList(data?: {
    group_handle?: string;
  }): Promise<{ data: IProductGroupListItem[] }> {
    return this._call("list-product-groups", data, {
      errorMap: {},
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Product_Group_List")
  @filterInput([
    "use_https_urls", // States whether returned URLs should be secured or not. Valid values are 0 and 1. Default value is 0.
    "collection_reference", // Required	Reference of the Collection .
    "show_public_products_only", // Required	Parameter to show only public products . If the value is set to 1 it will only return products which are publicly available . Valid values are 0 and 1. Default value is 1.
    "language", // Optional	Language ID, you can find this by using the following service. http://doc.omnipartners.be/index.php/Language_list . The language used to retrieve the translated names of the container type. If not specified , it will return all the translated names.
  ])
  public getCollectionAvailablePackage(data?: {
    collection_reference: string;
    show_public_products_only?: 0 | 1;
    use_https_urls?: 0 | 1;
    language?: string;
  }): Promise<{
    data: { reference: string; products: ICollectionAvailablePackage[] }[];
  }> {
    return this._call("get-available-packaging-info", data, {
      errorMap: {},
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Collection_Pet_Ration")
  @filterInput([
    "pet_weight", // (Required if pet has no weight series) Pet's Weight measured in grams.
    "pet_guid", // (Required) GUID of the pet.
    "pet_predicted_adult_weight", // (Optional) Pet's Predicted adult Weight measured in grams. If this parameter has a value, then this value will be taken as pet's predicted adult weight else there will be an internal calculation to derive the value. Please refer here for more information.
    "pet_bcs", // (Optional) Pet's Body Condition Score. This should be a valid value (Positive integer value which is less than or equal to 9 ) and if it is not provided , then the value will be taken as 5 in the ration calculation.
    "energy_level", // (Optional) Energy level of the collection expressed in Kcal / kg. This will be a direct input to the service. Required if the Collection reference is not provided. If both collection reference and the energy level are found , value of this parameter will get considered in to the calculation.
    "collection_reference", // (Optional) Reference of a Collection.
    "language", // (Optional) Language ID will use to translate the units of the result. (see http://doc.omnipartners.be/index.php/Language_list)
  ])
  public getCollectionPetRation(data?: IGetCollectionPetRationInput): Promise<{
    data: ICollectionPetRation;
  }> {
    return this._call("get-collection-pet-ration", data, {
      errorMap: {},
      retry: true,
    });
  }
  /*
    Manage advices
  */
  @doc(
    "https://doc.clixray.com/index.php?title=List_Articles_By_Targeting_Information",
  )
  @filterInput([
    "filter_by_all", // (Required)
    "pet_guid", // (Optional)
    "filter_type", // (Optional)
    "species_type", // (Optional
    "universe", // (Optional)
    "breed", // (Optional)
    "neutered", // (Optional)
    "gender", // (Optional)
    "unit", // (Optional)
    "age", // (Optional)
    "age_from", // (Optional)
    "age_to", // (Optional)
    "dob", // (Optional
    "pathologies", // (Optional)
    "lifestyle", // (Optional)
    "operator", // (Optional)
    "pet_bcs", // (Optional)
    "pet_stages", // (Optional)
    "pet_allergens", // (Optional)
    "pet_health_context", // (Optional)
    "language", // (Optional)
    "data_options", // (Optional)
    "user_guid",
  ])
  public getArticlesByTargetingInformation(
    data: IGetArticlesByTargetingInformationInput,
  ): Promise<{
    data: IGetArticlesByTargetingInformation[];
  }> {
    return this._call(
      "get-articles-by-targeting-info",
      {
        ...data,
        data_options: data.data_options
          ? Array.isArray(data.data_options)
            ? data.data_options.join(",")
            : data.data_options
          : undefined,
      },
      {
        errorMap: {},
        retry: true,
      },
    );
  }

  @doc("https://doc.clixray.com/index.php?title=List_Articles_By_Pet_GUID")
  @filterInput([
    "pet_guid", // (Required) Pet's GUID
    "language", // (Optional) Language ID, you can find this by using the following service. http://doc.omnipartners.be/index.php/Language_list
    "data_options", // (Optional) This defines information that is returned in the response. Multiple values should be comma separated. For more information please refer Data Options.
  ])
  public getArticlesByPetGuid(data: IGetArticleByPetGuidInput): Promise<{
    data: IGetArticlesByTargetingInformation[];
  }> {
    return this._call(
      "get-articles-by-pet-guid",
      {
        ...data,
        data_options: data.data_options
          ? Array.isArray(data.data_options)
            ? data.data_options.join(",")
            : data.data_options
          : undefined,
      },
      {
        errorMap: {},
        retry: true,
      },
    );
  }

  // not yet implemented
  @doc("https://doc.clixray.com/index.php?title=List_Articles_By_User_GUID")
  @filterInput([
    "user_guid", // (Required) User's GUID
    "language", // (Optional) Language ID, you can find this by using the following service. http://doc.omnipartners.be/index.php/Language_list
    "data_options", // (Optional) This defines information that is returned in the response. Multiple values should be comma separated. For more information please refer Data Options.
  ])
  public getArticlesByUserGuid(data: IGetArticleByUserGuidInput): Promise<{
    data: IGetArticlesByTargetingInformation[];
  }> {
    return this._call(
      "get-articles-by-user-guid",
      {
        ...data,
        data_options: data.data_options
          ? Array.isArray(data.data_options)
            ? data.data_options.join(",")
            : data.data_options
          : undefined,
      },
      {
        errorMap: {},
        retry: true,
      },
    );
  }

  @doc("https://doc.clixray.com/index.php?title=Get_Article_Details")
  @filterInput([
    "article_reference", // (Required) This will hold the Reference of the article.
    "language", // (Required) Language ID, you can find this by using the following service. http://doc.omnipartners.be/index.php/Language_list
    "data_options", // (Optional) This defines information that is returned in the response. Multiple values should be comma separated. For more information please refer Data Options.
  ])
  public getArticle(data: IGetArticleInput): Promise<{
    data: IGetArticlesByTargetingInformation;
  }> {
    return this._call(
      "get-article-details",
      {
        ...data,
        data_options: data.data_options
          ? Array.isArray(data.data_options)
            ? data.data_options.join(",")
            : data.data_options
          : undefined,
      },
      {
        errorMap: {},
        retry: true,
      },
    );
  }

  @doc("https://doc.clixray.com/index.php?title=Add_Product")
  @filterInput([
    "product_ean", // Required max 20 digits
    "product_label", // Required
    "product_code", // Required
    "product_status", // Required 1 or 0
    "product_collection_reference", // Optional
    "product_collection_gen_name", // Optional
    "product_group_handles", // Optional
    "product_friendly_name", // Optional
    "product_rr_price", // Optional
    "product_pp_price", // Optional
    "product_weight", // Optional in grams
    "product_gross_weight", // Optional in grams
    "product_packaging_container_type", // Optional
    "product_packaging_value", // Optional
    "product_packaging_units", // Optional
    "product_packaging_gross_weight", // Optional
    "product_publicly_not_available", // Optional 1 or 0
    "custom_fields", // Optional
  ])
  public addProduct({
    custom_fields,
    ...fields
  }: IAddProductInput): Promise<{ statusCode: number }> {
    const data = {
      ...fields,
      product_ean: Number(fields.product_ean),
      ...(custom_fields
        ? Object.entries(custom_fields).map(([key, value]) => ({
            [`pro_${key}`]: value,
          }))
        : {}),
    };
    return this._call("add-product", data, {
      errorMap: {
        1039: {
          message:
            "Invalid data. This code is returned upon data validation failure. A property named 'errors' in the returned object will contain more details of the failure.",
        },
        1978: {
          message:
            "Invalid collection reference. Collection reference is invalid.",
        },
        2012: { message: "Error when adding a new collection." },
      },
      hashKeys: undefined, // all keys are hashed
    });
  }
}
