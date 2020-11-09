import { Field, ObjectType, InputType } from "type-graphql";
import {
  ICollectionDetail,
  ICollectionDataOptions,
  IGetCollectionDetailsInput,
} from "omnipartners";

@InputType()
export class ProductsCollectionsDetailInput {
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

  public toOmnipartners(): Omit<
    IGetCollectionDetailsInput,
    "collection_reference"
  > {
    return {
      component_sort_order: this.componentSortOrder,
      data_options: this.dataOptions,
      ignore_old_format: this.ignoreOld_Format,
      language: this.language,
      use_https_urls: this.useHttpUrls ? 1 : 0,
    };
  }
}

@InputType()
export class ProductCollectionsDetailInput extends ProductsCollectionsDetailInput {
  @Field()
  public collectionReference!: string;

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
class ProductCollectionDetailBenefits {
  @Field()
  public id!: string;
  @Field({ nullable: true })
  public title?: string;
  @Field({ nullable: true })
  public description?: string;
  @Field({ nullable: true })
  public image?: string;
}

@ObjectType()
class ProductCollectionDetailProduct {
  @Field()
  public ean!: string;
  @Field()
  public code!: string;
  @Field()
  public label!: string;
  @Field(() => String, { nullable: true })
  public weight?: string | null;
  @Field(() => String, { nullable: true })
  public netWeight?: string | null;
  @Field(() => String, { nullable: true })
  public grossWeight?: string | null;
}

@ObjectType()
class ProductCollectionDetailRelatedCollection {
  @Field()
  public reference!: string;
  @Field()
  public type!: string;
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

  // input: data_options === "benefits" && language is set
  @Field(() => [ProductCollectionDetailBenefits], { nullable: true })
  public benefits?: ProductCollectionDetailBenefits[];

  // input: data_options === "products" && language is set
  @Field(() => [ProductCollectionDetailProduct], { nullable: true })
  public products?: ProductCollectionDetailProduct[];

  // input: data_options === "related_collections" && language is set
  @Field(() => [ProductCollectionDetailRelatedCollection], { nullable: true })
  public relatedCollections?: ProductCollectionDetailRelatedCollection[];

  // input: data_options === "key_benefits" && language is set
  @Field(() => [String], { nullable: true })
  public keyBenefits?: string[];

  // input: data_options === "links" && language is set
  @Field(() => [ProductCollectionLinks], { nullable: true })
  public links?: ProductCollectionLinks[];

  // legacy fields
  @Field({ deprecationReason: "old field nomenclature" })
  public energy_level!: number;

  @Field(() => Number, { deprecationReason: "old field nomenclature" })
  public has_image!: 0 | 1;

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
    this.imageSmall =
      data.collection_image_small || data.images?.image_small || undefined;
    this.imageMedium =
      data.collection_image_medium || data.images?.image_medium || undefined;
    this.imageLarge =
      data.collection_image_large || data.images?.image_large || undefined;
    this.keyBenefits = data.key_benefits;
    this.products = data.products
      ? data.products.map((product) => ({
          ...product,
          grossWeight: product.gross_weight,
          netWeight: product.net_weight,
        }))
      : [];
    this.relatedCollections = data.related_collections || [];
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
