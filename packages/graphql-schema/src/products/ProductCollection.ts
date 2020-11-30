import { Field, ObjectType, InputType, Arg, Ctx } from "type-graphql";
import {
  ICollectionDetail,
  ICollectionDataOptions,
  IGetCollectionDetailsInput,
} from "omnipartners";
import { Context } from "../types/Context";

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
export class ProductCollectionRange {
  @Field({ nullable: true })
  public reference?: string;

  @Field({ nullable: true })
  public priority?: string;

  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public tagLine?: string;

  @Field({ nullable: true })
  public description?: string;

  constructor(data: ICollectionDetail["range"]) {
    Object.assign(this, data);
    this.tagLine = data?.tag_line;
  }
}

@ObjectType()
export class ProductCollectionAvailablePackage {
  @Field()
  public ean!: string;

  @Field()
  public code!: string;

  @Field()
  public label!: string;

  @Field({ nullable: true })
  public weight?: string;

  @Field({ nullable: true })
  public netWeight?: string;

  @Field({ nullable: true })
  public grossWeight?: string;

  @Field({ nullable: true })
  public packagingUnits?: string;

  @Field({ nullable: true })
  public packagingValue?: string;

  @Field({ nullable: true })
  public packagingGrossWeight?: string;

  @Field({ nullable: true })
  public containerTypeInfo?: string;
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

  // input: data_options === "range" && language is set
  @Field(() => ProductCollectionRange, { nullable: true })
  public range?: ProductCollectionRange;

  @Field(() => [ProductCollectionAvailablePackage], { nullable: true })
  public async availablePackages(
    @Ctx() ctx: Context,
    @Arg("show_public_products_only", { nullable: true })
    show_public_products_only?: 0 | 1,
    @Arg("language", { nullable: true }) language?: string,
    @Arg("use_https_urls", { nullable: true }) use_https_urls?: 0 | 1,
  ) {
    const {
      data,
    } = await ctx.omnipartners.products.getCollectionAvailablePackage({
      collection_reference: this.reference,
      show_public_products_only,
      language,
      use_https_urls,
    });

    return data[0].products.map((product) => ({
      ...product,
      grossWeight: product.gross_weight,
      netWeight: product.net_weight,
      weight: product.weight,
      containerTypeInfo: product.container_type_info,
      packagingUnits: product.packaging_units,
      packagingValue: product.packaging_value,
      packagingGrossWeight: product.packaging_gross_weight,
    }));
  }

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
    this.range = new ProductCollectionRange(data.range);
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
