export interface IAnimalType {
  id: string;
  name: string;
}

export interface ILanguage {
  id: string;
  name: string;
}

export interface ITitle {
  id: string;
  name: string;
  gender: "M" | "F";
}

export interface IAnimalBreed {
  id: string;
  name: string;
  com_id: string;
  universe: string;
  synonyms: string;
  adult_weight_min: null | string;
  adult_weight_max: null | string;
  has_dedicated_product: boolean;
  other_ids: null | string;
  other: boolean;
  is_high_energy: boolean;
}

export interface IAnimalUniverse {
  id: string;
  name: string;
  default_breed_id: null | string;
  default_breed_com_id: null | string;
  stages: [];
}

export interface ISubscription {
  id: string;
  name: string;
  type: string;
}
