import { IMetadataMemberCountry } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class Country implements Partial<IMetadataMemberCountry> {
  @Field({ nullable: true })
  public name: string;
  @Field()
  public code: string;
  @Field({ nullable: true })
  public order: string;
}

@Resolver(() => Country)
export class DataCountryResolver {
  @Query(() => [Country])
  public async metadataCountries(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<Country[]> {
    return (await ctx.omnipartners.metadata.getMemberCountries({
      lang,
    })).data;
  }
}
