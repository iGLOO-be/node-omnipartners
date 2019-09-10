import {
  IGetCollectionByPetGUID,
  IGetCollectionByPetGUIDInput,
  IGetCollectionsByTargetingInfoCollection,
  IGetCollectionsByTargetingInfoInput,
  IGetCollectionsByTargetingInfoInputFilterByAllSimple,
  IProductDataOptions,
} from "omnipartners";
import { Arg, Ctx, Field, InputType, ObjectType, Query } from "type-graphql";
import { Context } from "../types/Context";

@InputType()
class ProductCollectionsByPetGUIDInput implements IGetCollectionByPetGUIDInput {
  @Field()
  public pet_guid: string;

  @Field({ nullable: true })
  public user_guid: string;

  @Field({ nullable: true })
  public partner_id: string;

  @Field({ nullable: true })
  public partner_id_type: string;

  @Field({ nullable: true })
  public partner_group_handle: string;

  @Field({ nullable: true })
  public language: string;

  @Field({ nullable: true })
  public add_clientof_partner_groups: string;

  @Field({ nullable: true })
  public use_https_urls: string;

  @Field({ nullable: true })
  public apply_range_exlusions: string;

  @Field(() => [String], { nullable: true })
  public data_options: string[];

  @Field({ nullable: true })
  public is_gestation: string;

  @Field({ nullable: true })
  public sort_order: string;

  @Field({ nullable: true })
  public component_sort_order: string;

  @Field({ nullable: true })
  public ignore_old_format: string;
}
@InputType()
class ProductCollectionsByTargetingInfoFilterByAllInput
  implements IGetCollectionsByTargetingInfoInputFilterByAllSimple {
  @Field()
  public filter_type:
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
class ProductCollectionsByTargetingInfoInput
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
  public image: string;
  @Field()
  public image_small: string;
  @Field()
  public image_medium: string;
  @Field()
  public image_large: string;
}

@ObjectType()
class ProductCollectionsByTargetingInfoCollection
  implements Partial<IGetCollectionsByTargetingInfoCollection> {
  @Field()
  public reference: string;
  @Field()
  public generic_name: string;
  @Field()
  public name: string;
  @Field()
  public energy_level: number;
  @Field()
  public has_image: boolean;
  @Field()
  public description: string;
  @Field()
  public tag_line: string;
  @Field()
  public introduction: string;
  @Field()
  public id: string;
  @Field()
  public score: number;
  @Field()
  public secondary_sorting_weight: string;
  @Field()
  public range_priority_order: string;
  @Field()
  public max_score: number;
  @Field()
  public pf_tracking_reference: string;
  @Field()
  public criteria_source_reference: string | null;
  @Field(() => ProductCollectionsByTargetingInfoCollectionImages, {
    nullable: true,
  })
  public images?: ProductCollectionsByTargetingInfoCollectionImages;
}

@ObjectType()
class ProductCollectionLinks {
  @Field({ nullable: true })
  public type: string;

  @Field({ nullable: true })
  public reference: string;

  @Field({ nullable: true })
  public link: string;
}

@ObjectType()
class ProductCollectionsByPetGUID {
  @Field({ nullable: true })
  public reference: string;

  @Field({ nullable: true })
  public name: string;

  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public tagLine: string;

  @Field({ nullable: true })
  public introduction: string;

  @Field({ nullable: true })
  public image: string;

  @Field({ nullable: true })
  public imageSmall: string;

  @Field({ nullable: true })
  public imageMedium: string;

  @Field({ nullable: true })
  public imageLarge: string;

  // input: data_options === "links" && language is set
  @Field(() => [ProductCollectionLinks], { nullable: true })
  public links: ProductCollectionLinks[];

  constructor(data: IGetCollectionByPetGUID) {
    Object.assign(this, data);
    this.tagLine = data.tag_line;
    this.imageSmall = data.image_small;
    this.imageMedium = data.image_medium;
    this.imageLarge = data.image_large;
  }
}

export class ProductResolver {
  @Query(() => [ProductCollectionsByTargetingInfoCollection], {
    nullable: true,
  })
  public async productCollectionsByTargetingInfo(
    @Ctx() ctx: Context,
    @Arg("input") input: ProductCollectionsByTargetingInfoInput,
  ): Promise<ProductCollectionsByTargetingInfoCollection[]> {
    return (await ctx.omnipartners.products.getCollectionsByTargetingInfo(
      input,
    )).data;
  }

  @Query(() => [ProductCollectionsByPetGUID], {
    nullable: true,
  })
  public async productCollectionsByPetGUID(
    @Ctx() ctx: Context,
    @Arg("input") input: ProductCollectionsByPetGUIDInput,
    @Arg("token") token: string,
  ): Promise<ProductCollectionsByPetGUID[]> {
    const { user_guid } = ctx.userTokenHelper.parse(token);

    const res = (await ctx.omnipartners.products.getCollectionsByPetGUID({
      ...input,
      user_guid,
    })).data;

    return res.map(d => new ProductCollectionsByPetGUID(d));
  }
}
