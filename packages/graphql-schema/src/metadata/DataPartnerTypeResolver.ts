import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../types/Context";

@ObjectType()
export class PartnerType {
  @Field()
  public code!: string;

  @Field()
  public name!: string;
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
}
