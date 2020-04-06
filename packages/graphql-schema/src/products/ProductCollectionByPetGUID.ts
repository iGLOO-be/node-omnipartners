import { InputType, Field, ObjectType } from "type-graphql";
import { IGetCollectionByPetGUIDInput, IGetCollectionByPetGUID } from "omnipartners";
import { ProductCollectionLinks } from "./ProductCollection";

@InputType()
export class ProductCollectionsByPetGUIDInput
  implements IGetCollectionByPetGUIDInput {
  @Field()
  public pet_guid!: string;

  @Field({ nullable: true })
  public user_guid?: string;

  @Field({ nullable: true })
  public partner_id?: string;

  @Field({ nullable: true })
  public partner_id_type?: string;

  @Field({ nullable: true })
  public partner_group_handle?: string;

  @Field({ nullable: true })
  public language?: string;

  @Field({ nullable: true })
  public add_clientof_partner_groups?: string;

  @Field({ nullable: true })
  public use_https_urls?: string;

  @Field({ nullable: true })
  public apply_range_exlusions?: string;

  @Field(() => [String], { nullable: true })
  public data_options?: string[];

  @Field({ nullable: true })
  public is_gestation?: string;

  @Field({ nullable: true })
  public sort_order?: string;

  @Field({ nullable: true })
  public component_sort_order?: string;

  @Field({ nullable: true })
  public ignore_old_format?: string;
}

@ObjectType()
export class ProductCollectionsByPetGUID {
  @Field({ nullable: true })
  public reference?: string;

  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public tagLine?: string;

  @Field({ nullable: true })
  public introduction?: string;

  @Field({ nullable: true })
  public image?: string;

  @Field({ nullable: true })
  public imageSmall: string;

  @Field({ nullable: true })
  public imageMedium: string;

  @Field({ nullable: true })
  public imageLarge: string;

  // input: data_options === "links" && language is set
  @Field(() => [ProductCollectionLinks], { nullable: true })
  public links?: ProductCollectionLinks[];

  constructor(data: IGetCollectionByPetGUID) {
    Object.assign(this, data);
    this.tagLine = data.tag_line;
    this.imageSmall = data.image_small;
    this.imageMedium = data.image_medium;
    this.imageLarge = data.image_large;
  }
}

