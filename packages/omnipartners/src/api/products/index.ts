import Api, { IApiFetchOptions } from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";
import { ICollectionDataOptions, IProductDataOptions } from "../../types";

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
  available_packages?: Array<{
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
  }>;
}

export interface IGetCollectionDetailsInput {
  // (Required) This will hold the Reference of the collection. (http://doc.omnipartners.be/index.php/List_Collection_References)
  collection_reference: string;
  // (Required) Language ID, you can find this by using the following service. http://doc.omnipartners.be/index.php/Language_list
  language: string;
  // (Optional) States whether returned URLs should be secured or not. Valid values are 0 and 1. Default value is 0.
  use_https_urls?: string;
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

export interface ICollectionDetail {
  reference: string;
  generic_name: string;
  name: string;
  energy_level: number;
  has_image: boolean;
  contains: [];
  does_not_contain: [];
  caloric_table: null;
  benefits: ICollectionDetailBenefit[];
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
    1021: { message: "Internal error." },
    1023: { message: "Invalid Request." },
    1030: { message: "Missing required fields." },
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
    return this._call("get-collection-details", data, {
      errorMap: {
        1018: { message: "collection reference can not be empty." },
        1019: { message: "language reference can not be empty." },
        1014: { message: "Invalid language." },
        2005: { message: "Invalid Component sort order field found." },
      },
      retry: true,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Find_product_collection")
  @filterInput([
    "use_https_urls",
    "resolve_by",
    "value",
    "language",
    "data_options",
  ])
  public findProductCollection(data: {
    use_https_urls: string;
    resolve_by: string;
    value: string;
    language: string;
    data_options: string;
  }) {
    return this._call(
      "find-product-collection",
      { "resolve-by": data.resolve_by, ...data },
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

  @doc(
    "http://doc.omnipartners.be/index.php/List_Collection_by_Pet_GUID",
  )
  @filterInput([
    "pet_guid",
    "user_guid",
    "language",
    "data_options",
  ])
  public getCollectionsByPetGUID(
    data: {
      pet_guid?: string;
      user_guid?: string;
      language?: string;
      data_options?: string[];
    },
  ): Promise<{ data: IGetCollectionsByTargetingInfoCollection[] }> {
    return this._call("get-collections-by-pet-guid", data, {
      errorMap: {},
      retry: true,
    });
  }
}
