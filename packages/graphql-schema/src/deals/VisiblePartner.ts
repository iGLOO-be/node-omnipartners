import { ArgsType, Field, ObjectType } from "type-graphql";
import { PageInfo } from "../connections";

@ObjectType()
class DealVisiblePartnerForUserResultData {
  @Field()
  public id!: string;
  @Field()
  public extid!: string;
  @Field()
  public name!: string;
  @Field({ nullable: true })
  public street1?: string;
  @Field({ nullable: true })
  public street2?: string;
  @Field({ nullable: true })
  public streetnum?: string;
  @Field({ nullable: true })
  public postal_code?: string;
  @Field({ nullable: true })
  public city?: string;
  @Field({ nullable: true })
  public region?: string;
  @Field({ nullable: true })
  public country?: string;
  @Field({ nullable: true })
  public lat?: number;
  @Field({ nullable: true })
  public lng?: number;
}

@ObjectType("DealVisiblePartnerForUserResult")
export class DealVisiblePartnerForUserResult {
  @Field()
  public pageInfo!: PageInfo;
  @Field(() => [DealVisiblePartnerForUserResultData])
  public result!: DealVisiblePartnerForUserResultData[];
}

@ArgsType()
export class GetVisiblePartnerInputArgs {
  @Field()
  public deal_ref!: string;
  @Field({ nullable: true })
  public search?: string;
  @Field({ nullable: true })
  public favorite_only?: boolean;
  @Field({ nullable: true })
  public partner_lat?: number;
  @Field({ nullable: true })
  public partner_lng?: number;
  @Field({ nullable: true })
  public radius?: number;
}
