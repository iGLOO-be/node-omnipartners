import Api from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";

interface IBaseInput {
  lang?: string;
}

interface IBasePaginatedResult<T> {
  data: T[];
  page: number;
  records_per_page: number;
  total_record_count: string;
  total_pages: number;
}

export interface IMetadataLegalForm {
  code: string;
  name: string;
  description?: string | null;
  forget_on_revoke: boolean;
  url?: string | null;
  subscriptions?: string[] | null;
}

export interface IMetadataCounty {
  id: string;
  name: string;
  country: string;
  order: string;
}

export interface IMetadataAddressType {
  code: string;
  name: string;
}

export interface IMetadataMemberCountry {
  code: string;
  name: string;
  order?: string;
  has_post_code: string;
  mobile_validation_rule: string | null;
  phone_prefix: string;
  region: string | null;
  registration_age_limit: string | null;
}

export interface IMetadataCommunicationPreference {
  code: string;
  name: string;
}

export interface IMetadataInterest {
  code: string;
  name: string;
}

export interface IMetadataUserTitle {
  code: string;
  name: string;
  gender: string;
}

export interface IMetadataMemberLanguage {
  code: string;
  name?: string;
}

export interface IMetadataSubscription {
  code: string;
  name: string;
  type: string;
  consent_text?: string;
}

export interface IMetadataPlaceOfPurchase {
  code: string;
  name: string;
}

export interface IMetadataCustomerGroup {
  code: string;
  name: string;
  description: string;
}

export interface IMetadataAnimalType {
  code: string;
  name?: string;
}

export interface IMetadataAnimalBreed {
  id: string;
  name: string;
  species: string;
  order: string;
  com_id: string;
  universe: string;
  alt_name: string | null;
  synonyms: string | null;
  adult_weight_min: string;
  adult_weight_max: string;
  has_dedicated_product: string;
  other_ids: string | null;
  other: string;
  is_high_energy: string;
  is_low_energy: string;
  has_image: boolean;
}

export interface IMetadataAnimalLifestyle {
  code: string;
  name: string;
  species: string;
}

export interface IMetadataAgendaCategory {
  code: string;
  name: string;
}

export interface IMetadataAnimalUniverse {
  id: string;
  name: string;
  species: string;
  default_breed_id: string | null;
  default_breed_com_id: string | null;
  has_image: boolean;
  stages: IMetadataAnimalUniverseStage[];
}

interface IMetadataAnimalUniverseStage {
  stage_name: string;
  stage_code: string;
  stage_order: string;
  stage_feeding_stage: string;
  universe_id: string;
  stage_from: string;
  stage_from_unit: string;
  stage_to: string;
  stage_to_unit: string;
  species_code: string;
  breed_id: string | null;
}

export interface IMetadataAnimalPathology {
  code: string;
  name: string;
  species: string | null;
  has_dedicated_product: string;
}

export interface IMetadataAnimalStage {
  species: string;
  universe_id: string;
  breed_id: string | null;
  stage_code: string;
  stage_name: string;
  stage_to: string;
  stage_to_unit: string;
  stage_from: string;
  stage_from_unit: string;
  stage_order: string;
  feeding_stage: string;
}

export interface IMetadataAnimalSpecialNeeds {
  reference: string;
  generic_name: string;
  name: string;
  pathologies: string[];
}

export interface IMetadataDiagnosticCode {
  diagnostic_code: string;
  generic_name: string;
  name: string;
}

export interface IMetadataPartnerType {
  code: string;
  name: string;
  member_cardinality: string;
}

export interface IMetadataProductRange {
  reference: string;
  generic_name: string;
  priority: string;
  name: string;
  tag_line: string | null;
  description: string | null;
  public_visibility: string;
  partner_visibility: boolean;
  incl_partner_groups: any[];
  excl_partner_groups: any[];
  incl_places_purchase: any[];
  excl_places_purchase: any[];
  incl_partner_types: any[];
  excl_partner_types: any[];
}

export interface IMetadataProductBrand {
  id: string;
  name: string;
}

export interface IMetadataCollectionRelationType {
  reference: string;
  name: string;
}

export interface IMetadataLoyaltyProgramType {
  id: string;
  name: string;
  show_in_website: "Y" | "N";
}

export interface IMetadataLoyaltyProgram {
  id: string;
  name: string;
  type: string;
  thirdParty: "Y" | "N";
}

export interface IMetadataPartnerRelationType {
  code: string;
  name: string;
}

interface IBaseMetadataType {
  code: string;
  name: string;
}

export default class Metadata extends Api {
  public defaultHost = "http://metadata.omnipartners.be/";

  public _call(action: string, data?: {}) {
    return this.post("/", {
      action,
      ...data,
    });
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Legal_Forms")
  @filterInput(["legal_form_codes", "lang", "indexed"])
  public getLegalForms(data?: {
    legal_form_codes?: string;
    lang?: string;
    indexed?: string;
  }): Promise<{ data: IMetadataLegalForm[] }> {
    return this._call("get-legal-forms", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Counties")
  @filterInput(["country", "lang", "indexed"])
  public getCounties(data?: {
    country: string;
    lang: string;
    indexed: string;
  }): Promise<{ data: IMetadataCounty[] }> {
    return this._call("get-counties", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Address_Types")
  @filterInput(["lang", "indexed"])
  public getAddressTypes(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataAddressType[] }> {
    return this._call("get-address-types", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Member_Countries")
  @filterInput(["lang", "indexed"])
  public getMemberCountries(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataMemberCountry[] }> {
    return this._call("get-countries", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Communication_Preferences")
  @filterInput(["lang", "indexed"])
  public getCommunicationPreferences(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataCommunicationPreference[] }> {
    return this._call("get-communication-preferences", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Interests")
  @filterInput(["lang", "indexed"])
  public getInterests(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataInterest[] }> {
    return this._call("get-interests", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_User_Titles")
  @filterInput(["lang", "indexed"])
  public getUserTitles(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataUserTitle[] }> {
    return this._call("get-user-titles", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Member_Languages")
  @filterInput(["lang", "indexed"])
  public getMemberLanguages(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataMemberLanguage[] }> {
    return this._call("get-languages", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Access_Rights")
  @filterInput(["lang", "indexed"])
  public getAccessRights(data?: IBaseInput): Promise<{ data: any }> {
    return this._call("get-access-rights", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Subscriptions")
  @filterInput(["lang", "indexed"])
  public getSubscriptions(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataSubscription[] }> {
    return this._call("get-subscriptions", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Place_of_Purchase")
  @filterInput(["lang", "indexed"])
  public getPlaceOfPurchase(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataPlaceOfPurchase[] }> {
    return this._call("get-places-of-purchases", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Customer_Groups")
  @filterInput(["lang", "indexed"])
  public getCustomerGroups(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataCustomerGroup[] }> {
    return this._call("get-customer-groups", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Types")
  @filterInput(["lang", "indexed"])
  public getAnimalTypes(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataAnimalType[] }> {
    return this._call("get-animal-types", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Breeds")
  @filterInput(["lang", "type", "indexed", "search", "order"])
  public getAnimalBreeds(data?: {
    lang?: string;
    type?: string;
    indexed?: string;
    search?: string;
    order?: string;
  }): Promise<{ data: IMetadataAnimalBreed[] }> {
    return this._call("get-animal-breeds", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Deletion_Causes")
  @filterInput(["lang", "indexed"])
  public getAnimalDeletionCauses(data?: IBaseInput): Promise<{ data: any }> {
    return this._call("get-deletion-causes", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Lifestyles")
  @filterInput(["type", "lang", "indexed"])
  public getAnimalLifestyles(data?: {
    type?: string;
    lang?: string;
    indexed?: string;
  }): Promise<{ data: IMetadataAnimalLifestyle[] }> {
    return this._call("get-animal-lifestyles", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Agenda_Categories")
  @filterInput(["lang", "indexed"])
  public getAgendaCategories(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataAgendaCategory[] }> {
    return this._call("get-agenda-categories", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Universe")
  @filterInput(["lang", "indexed"])
  public getAnimalUniverse(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataAnimalUniverse[] }> {
    return this._call("get-animal-universes", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Pathologies")
  @filterInput(["lang", "indexed"])
  public getAnimalPathologies(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataAnimalPathology[] }> {
    return this._call("get-animal-pathologies", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Stages")
  @filterInput(["lang", "indexed"])
  public getAnimalStages(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataAnimalStage[] }> {
    return this._call("get-animal-universes-stages", data);
  }

  @doc("https://doc.clixray.com/index.php?title=Get_Animal_Special_Needs")
  @filterInput(["lang", "indexed"])
  public getAnimalSpecialNeeds(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataAnimalSpecialNeeds[] }> {
    return this._call("get-animal-special-needs", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Diagnostic_Codes")
  @filterInput(["lang", "type", "search", "page", "record_per-page"])
  public getDiagnosticCodes(data?: {
    lang: string;
    type: string;
    search: string;
    page: number;
    "record_per-page": number;
  }): Promise<IBasePaginatedResult<IMetadataDiagnosticCode>> {
    return this._call("get-diagnostic-codes", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_BCS")
  @filterInput(["lang", "species", "universe"])
  public getAnimalBCS(data?: {
    lang: string;
    species: string;
    universe: string;
  }): Promise<{ data: any }> {
    return this._call("get-animal-bcs", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Partner_Types_List")
  @filterInput(["lang", "indexed"])
  public getPartnerTypesList(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataPartnerType[] }> {
    return this._call("get-partner-types", data);
  }

  @doc("https://doc.clixray.com/index.php?title=Get_Partner_Type_Roles_List")
  @filterInput(["indexed", "partner_type"])
  public getPartnerTypeRoles(data?: {
    indexed?: string;
    partner_type?: string;
  }): Promise<{
    data: {
      code: string;
      name: string;
      default: 'N' | 'Y';
      type: string;
      relationship: "partof" | "clientof";
    }[];
  }> {
    return this._call("get-partner-type-roles", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Product_Ranges")
  @filterInput(["lang", "indexed"])
  public getProductRanges(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataProductRange[] }> {
    return this._call("get-product-ranges", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Product_Brands")
  @filterInput(["lang", "indexed"])
  public getProductBrands(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataProductBrand[] }> {
    return this._call("get-product-brands", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Product_Families")
  @filterInput(["lang", "indexed"])
  public getProductFamilies(data?: IBaseInput): Promise<{ data: any }> {
    return this._call("get-product-families", data);
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Get_Collection_Relation_Types_List",
  )
  @filterInput(["lang", "indexed"])
  public getCollectionRelationTypesList(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataCollectionRelationType[] }> {
    return this._call("get-collection-relation-types", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Loyalty_Program_Types")
  @filterInput(["lang", "indexed"])
  public getLoyaltyProgramTypes(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataLoyaltyProgramType[] }> {
    return this._call("get-loyalty-program-types", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_loyalty_Programs")
  @filterInput(["lang", "indexed"])
  public getLoyaltyProgram(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataLoyaltyProgram[] }> {
    return this._call("get-loyalty-programs", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Featured_Activities_List")
  @filterInput(["lang", "indexed"])
  public getFeaturedAactivities(data?: IBaseInput): Promise<{ data: any }> {
    return this._call("get-featured-activities", data);
  }

  @doc("https://doc.clixray.com/index.php?title=Get_Featured_Services_List")
  @filterInput(["lang", "indexed"])
  public getFeaturedServices(data?: IBaseInput): Promise<{
    data: {
      code: string;
      generic_name: string;
      name: string;
      description: {
        EN: string;
        FR: string;
        NL: string;
      };
    }[];
  }> {
    return this._call("get-featured-services", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Partner_Relation_Types_List")
  @filterInput(["lang", "indexed"])
  public getPartnerRelationTypes(
    data?: IBaseInput,
  ): Promise<{ data: IMetadataPartnerRelationType[] }> {
    return this._call("get-partner-relation-types", data);
  }

  @doc("https://doc.clixray.com/index.php?title=Get_Social_Networks")
  @filterInput(["indexed"])
  public getSocialNetworks(data?: {
    indexed?: string;
  }): Promise<{ data: IBaseMetadataType[] }> {
    return this._call("get-social-networks", data);
  }
}
