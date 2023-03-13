import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../types/Context";

@ObjectType()
export class PartnerType {
  @Field()
  public code!: string;

  @Field()
  public name!: string;
}

@ObjectType()
export class PartnerTypeRole {
  @Field()
  public code!: string;

  @Field()
  public name!: string;

  @Field()
  public type!: string;

  @Field(() => String)
  public relationship!: "partof" | "clientof";
}

@Resolver(() => PartnerType)
export class DataPartnerTypeResolver {
  @Query(() => [PartnerType])
  public async metadataPartnerTypes(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<PartnerType[]> {
    return (
      await ctx.omnipartners.metadata.getPartnerTypesList({
        lang,
      })
    ).data;
  }

  @Query(() => [PartnerTypeRole])
  public async metadataPartnerTypeRoles(
    @Ctx() ctx: Context,
    @Arg("partnerType", { nullable: true }) partnerType?: string,
  ): Promise<PartnerTypeRole[]> {
    return (
      await ctx.omnipartners.metadata.getPartnerTypeRoles({
        partner_type: partnerType,
      })
    ).data;
  }
}
