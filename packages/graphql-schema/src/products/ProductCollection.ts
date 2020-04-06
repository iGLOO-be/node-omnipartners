import { Field, ObjectType, InputType } from "type-graphql";
import {
  ICollectionDetail,
  ICollectionDataOptions,
  IGetCollectionDetailsInput,
} from "omnipartners";

@InputType()
export class ProductCollectionsDetailInput {
  @Field()
  public collectionReference!: string;

  @Field()
  public language!: string;

  @Field({ nullable: true })
  public useHttpUrls?: boolean;

  @Field(() => [String], { nullable: true })
  public dataOptions?: ICollectionDataOptions;

  @Field({ nullable: true })
  public componentSortOrder?: string;

  @Field({ nullable: true })
  public ignoreOld_Format?: string;

  public toOmnipartners(): IGetCollectionDetailsInput {
    return {
      collection_reference: this.collectionReference,
      component_sort_order: this.componentSortOrder,
      data_options: this.dataOptions,
      ignore_old_format: this.ignoreOld_Format,
      language: this.language,
      use_https_urls: this.useHttpUrls ? 1 : 0,
    };
  }
}

@ObjectType()
export class ProductCollectionDetail {
  @Field()
  public reference!: string;

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
  public imageSmall?: string;

  @Field({ nullable: true })
  public imageMedium?: string;

  @Field({ nullable: true })
  public imageLarge?: string;

  // input: data_options === "links" && language is set
  @Field(() => [ProductCollectionLinks], { nullable: true })
  public links?: ProductCollectionLinks[];

  // legacy fields
  @Field({ deprecationReason: "old field nomenclature" })
  public energy_level!: number;

  @Field({ deprecationReason: "old field nomenclature" })
  public has_image!: boolean;

  @Field({ deprecationReason: "old field nomenclature" })
  public collection_reference!: string;

  @Field({ deprecationReason: "old field nomenclature" })
  public collection_generic_name!: string;

  @Field({ deprecationReason: "old field nomenclature" })
  public collection_name!: string;

  @Field({ deprecationReason: "old field nomenclature" })
  public collection_description!: string;

  @Field({ deprecationReason: "old field nomenclature" })
  public collection_tag_line!: string;

  @Field({ deprecationReason: "old field nomenclature" })
  public collection_introduction!: string;

  @Field({ deprecationReason: "old field nomenclature" })
  public collection_range_reference!: string;

  @Field({ deprecationReason: "old field nomenclature" })
  public collection_range_family_reference!: string;

  @Field({ deprecationReason: "old field nomenclature" })
  public collection_energy_level!: number;

  @Field({ nullable: true })
  public collection_image?: string;

  @Field({ nullable: true })
  public collection_image_small?: string;

  @Field({ nullable: true })
  public collection_image_medium?: string;

  @Field({ nullable: true })
  public collection_image_large?: string;

  // @Field()
  // public collection_caloric_table: null;

  constructor(data: ICollectionDetail) {
    Object.assign(this, data);
    this.tagLine = data.collection_tag_line;
    this.description = data.collection_description;
    this.imageSmall = data.collection_image_small;
    this.imageMedium = data.collection_image_medium;
    this.imageLarge = data.collection_image_large;
  }
}

@ObjectType()
export class ProductCollectionLinks {
  @Field({ nullable: true })
  public type?: string;

  @Field({ nullable: true })
  public reference?: string;

  @Field({ nullable: true })
  public link?: string;
}
