import Api from "../../lib/Api";
import { doc, filterInput } from "../../lib/apiDecorators";

interface IBaseInput {
  lang: string;
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
    legal_form_codes: string;
    lang: string;
    indexed: string;
  }) {
    return this._call("get-legal-forms", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Counties")
  @filterInput(["country", "lang", "indexed"])
  public getCounties(data?: {
    country: string;
    lang: string;
    indexed: string;
  }) {
    return this._call("get-counties", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Address_Types")
  @filterInput(["lang", "indexed"])
  public getAddressTypes(data?: IBaseInput) {
    return this._call("get-address-types", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Member_Countries")
  @filterInput(["lang", "indexed"])
  public getMemberCountries(data?: IBaseInput) {
    return this._call("get-countries", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Communication_Preferences")
  @filterInput(["lang", "indexed"])
  public getCommunicationPreferences(data?: IBaseInput) {
    return this._call("get-communication-preferences", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Interests")
  @filterInput(["lang", "indexed"])
  public getInterests(data?: IBaseInput) {
    return this._call("get-interests", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_User_Titles")
  @filterInput(["lang", "indexed"])
  public getUserTitles(data?: IBaseInput) {
    return this._call("get-user-titles", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Member_Languages")
  @filterInput(["lang", "indexed"])
  public getMemberLanguages(data?: IBaseInput) {
    return this._call("get-languages", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Access_Rights")
  @filterInput(["lang", "indexed"])
  public getAccessRights(data?: IBaseInput) {
    return this._call("get-access-rights", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Subscriptions")
  @filterInput(["lang", "indexed"])
  public getSubscriptions(data?: IBaseInput) {
    return this._call("get-subscriptions", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Place_of_Purchase")
  @filterInput(["lang", "indexed"])
  public getPlaceOfPurchase(data?: IBaseInput) {
    return this._call("get-places-of-purchases", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Customer_Groups")
  @filterInput(["lang", "indexed"])
  public getCustomerGroups(data?: IBaseInput) {
    return this._call("get-customer-groups", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Types")
  @filterInput(["lang", "indexed"])
  public getAnimalTypes(data?: IBaseInput) {
    return this._call("get-animal-types", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Breeds")
  @filterInput(["lang", "type", "indexed", "search", "order"])
  public getAnimalBreeds(data?: {
    lang: string;
    type: string;
    indexed: string;
    search: string;
    order: string;
  }) {
    return this._call("get-animal-breeds", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Deletion_Causes")
  @filterInput(["lang", "indexed"])
  public getAnimalDeletionCauses(data?: IBaseInput) {
    return this._call("get-deletion-causes", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Lifestyles")
  @filterInput(["type", "lang", "indexed"])
  public getAnimalLifestyles(data?: {
    type: string;
    lang: string;
    indexed: string;
  }) {
    return this._call("get-animal-lifestyles", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Agenda_Categories")
  @filterInput(["lang", "indexed"])
  public getAgendaCategories(data?: IBaseInput) {
    return this._call("get-agenda-categories", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Universe")
  @filterInput(["lang", "indexed"])
  public getAnimalUniverse(data?: IBaseInput) {
    return this._call("get-animal-universes", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Pathologies")
  @filterInput(["lang", "indexed"])
  public getAnimalPathologies(data?: IBaseInput) {
    return this._call("get-animal-pathologies", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_Stages")
  @filterInput(["lang", "indexed"])
  public getAnimalStages(data?: IBaseInput) {
    return this._call("get-animal-universes-stages", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Diagnostic_Codes")
  @filterInput(["lang", "type", "search", "page", "record_per-page"])
  public getDiagnosticCodes(data?: {
    lang: string;
    type: string;
    search: string;
    page: number;
    "record_per-page": number;
  }) {
    return this._call("get-diagnostic-codes", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Animal_BCS")
  @filterInput(["lang", "species", "universe"])
  public getAnimalBCS(data?: {
    lang: string;
    species: string;
    universe: string;
  }) {
    return this._call("get-animal-bcs", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Partner_Types_List")
  @filterInput(["lang", "indexed"])
  public getPartnerTypesList(data?: IBaseInput) {
    return this._call("get-partner-types", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Product_Ranges")
  @filterInput(["lang", "indexed"])
  public getProductRanges(data?: IBaseInput) {
    return this._call("get-product-ranges", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Product_Brands")
  @filterInput(["lang", "indexed"])
  public getProductBrands(data?: IBaseInput) {
    return this._call("get-product-brands", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Product_Families")
  @filterInput(["lang", "indexed"])
  public getProductFamilies(data?: IBaseInput) {
    return this._call("get-product-families", data);
  }

  @doc(
    "http://doc.omnipartners.be/index.php/Get_Collection_Relation_Types_List",
  )
  @filterInput(["lang", "indexed"])
  public getCollectionRelationTypesList(data?: IBaseInput) {
    return this._call("get-collection-relation-types", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Loyalty_Program_Types")
  @filterInput(["lang", "indexed"])
  public getLoyaltyProgramTypes(data?: IBaseInput) {
    return this._call("get-loyalty-program-types", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_loyalty_Programs")
  @filterInput(["lang", "indexed"])
  public getLoyaltyProgram(data?: IBaseInput) {
    return this._call("get-loyalty-programs", data);
  }

  @doc("http://doc.omnipartners.be/index.php/Get_Featured_Activities_List")
  @filterInput(["lang", "indexed"])
  public getFeaturedAactivities(data?: IBaseInput) {
    return this._call("get-featured-activities", data);
  }
}
