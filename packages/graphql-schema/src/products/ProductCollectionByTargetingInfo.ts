import { InputType, Field, ObjectType } from "type-graphql";
import { IGetCollectionsByTargetingInfoInputFilterByAllSimple, IGetCollectionsByTargetingInfoInput, IProductDataOptions, IGetCollectionsByTargetingInfoCollection } from "omnipartners";

@InputType()
class ProductCollectionsByTargetingInfoFilterByAllInput
  implements IGetCollectionsByTargetingInfoInputFilterByAllSimple {
  @Field()
  public filter_type!:
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
  @Field({ nullable: true })
  public species_type?: string;
  @Field({ nullable: true })
  public univers?: string;
  @Field({ nullable: true })
  public breed?: string;
  @Field({ nullable: true })
  public neutered?: "YES" | "NO";
  @Field({ nullable: true })
  public gender?: "M" | "F";
  @Field({ nullable: true })
  public purchase_place?: string;
  @Field({ nullable: true })
  public unit?: "WEEK" | "MONTH" | "YEAR";
  @Field({ nullable: true })
  public age?: string;
  @Field({ nullable: true })
  public age_from?: string;
  @Field({ nullable: true })
  public age_to?: string;
  @Field({ nullable: true })
  public range_reference?: string;
  @Field({ nullable: true })
  public pet_bcs?: number;
  @Field({ nullable: true })
  public pet_weight?: string;
  @Field(() => [String], { nullable: true })
  public pet_stages?: string[];
  @Field({ nullable: true })
  public public_visibility?: "YES" | "NO";
  @Field({ nullable: true })
  public partners_visibility?: "YES" | "NO";
  @Field(() => [String], { nullable: true })
  public partner_types?: string[];
  @Field(() => [String], { nullable: true })
  public pet_allergens?: string[];
  @Field(() => [String], { nullable: true })
  public pet_health_context?: string[];
}

@InputType()
export class ProductCollectionsByTargetingInfoInput
  implements Partial<IGetCollectionsByTargetingInfoInput> {
  @Field({ nullable: true })
  public partner_id?: string;
  @Field({ nullable: true })
  public partner_id_type?: string;
  @Field({ nullable: true })
  public deal_reference?: string;
  @Field({ nullable: true })
  public partner_group_handle?: string;
  @Field({ nullable: true })
  public pet_guid?: string;
  @Field({ nullable: true })
  public user_guid?: string;
  @Field({ nullable: true })
  public diagnostic_codes?: string;
  @Field(() => [ProductCollectionsByTargetingInfoFilterByAllInput], {
    nullable: true,
  })
  public filter_by_all?: ProductCollectionsByTargetingInfoFilterByAllInput[];
  @Field({ nullable: true })
  public filter_type?: string;
  @Field({ nullable: true })
  public species_type?: string;
  @Field({ nullable: true })
  public univers?: string;
  @Field({ nullable: true })
  public breed?: string;
  @Field({ nullable: true })
  public neutered?: string;
  @Field({ nullable: true })
  public gender?: string;
  @Field({ nullable: true })
  public purchase_place?: string;
  @Field({ nullable: true })
  public unit?: string;
  @Field({ nullable: true })
  public age?: string;
  @Field({ nullable: true })
  public age_from?: string;
  @Field({ nullable: true })
  public age_to?: string;
  @Field({ nullable: true })
  public dob?: string;
  @Field({ nullable: true })
  public pathologies?: string;
  @Field({ nullable: true })
  public lifestyle?: string;
  @Field({ nullable: true })
  public operator?: string;
  @Field({ nullable: true })
  public range_reference?: string;
  @Field({ nullable: true })
  public pet_weight?: string;
  @Field({ nullable: true })
  public pet_bcs?: string;
  @Field({ nullable: true })
  public pet_stages?: string;
  @Field({ nullable: true })
  public partners_visibility?: string;
  @Field({ nullable: true })
  public public_visibility?: string;
  @Field({ nullable: true })
  public partner_types?: string;
  @Field({ nullable: true })
  public pet_allergens?: string;
  @Field({ nullable: true })
  public pet_health_context?: string;
  @Field({ nullable: true })
  public language?: string;
  @Field({ nullable: true })
  public use_https_urls?: string;
  @Field({ nullable: true })
  public show_ration?: string;
  @Field({ nullable: true })
  public apply_range_exlusions?: string;
  @Field(() => [String], { nullable: true })
  public data_options?: IProductDataOptions;
  @Field({ nullable: true })
  public ration_predicted_weight?: string;
}

@ObjectType()
class ProductCollectionsByTargetingInfoCollectionImages {
  @Field()
  public image!: string;
  @Field()
  public image_small!: string;
  @Field()
  public image_medium!: string;
  @Field()
  public image_large!: string;
}

@ObjectType()
export class ProductCollectionsByTargetingInfoCollection
  implements Partial<IGetCollectionsByTargetingInfoCollection> {
  @Field()
  public reference!: string;
  @Field()
  public generic_name!: string;
  @Field()
  public name!: string;
  @Field()
  public energy_level!: number;
  @Field()
  public has_image!: boolean;
  @Field()
  public description!: string;
  @Field()
  public tag_line!: string;
  @Field()
  public introduction!: string;
  @Field()
  public id!: string;
  @Field()
  public score!: number;
  @Field()
  public secondary_sorting_weight!: string;
  @Field()
  public range_priority_order!: string;
  @Field()
  public max_score!: number;
  @Field()
  public pf_tracking_reference!: string;
  @Field(() => String, { nullable: true })
  public criteria_source_reference!: string | null;
  @Field(() => ProductCollectionsByTargetingInfoCollectionImages, {
    nullable: true,
  })
  public images?: ProductCollectionsByTargetingInfoCollectionImages;
}
