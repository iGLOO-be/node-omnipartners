import { ICollectionDetail } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ProductCollection
  implements
    Omit<
      ICollectionDetail,
      | "benefits"
      | "contains"
      | "does_not_contain"
      | "caloric_table"
      | "collection_caloric_table"
    > {
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
  // @Field()
  // public contains: [];
  // @Field()
  // public does_not_contain: [];
  // @Field()
  // public caloric_table: null;
  @Field()
  // public benefits: ICollectionDetailBenefit[];
  @Field()
  public collection_reference: string;
  @Field()
  public collection_generic_name: string;
  @Field()
  public collection_name: string;
  @Field()
  public collection_description: string;
  @Field()
  public collection_tag_line: string;
  @Field()
  public collection_introduction: string;
  @Field()
  public collection_range_reference: string;
  @Field()
  public collection_range_family_reference: string;
  @Field()
  public collection_energy_level: number;
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
}
