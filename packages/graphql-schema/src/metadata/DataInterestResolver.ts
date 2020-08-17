import { IMetadataInterest } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class Interest
  implements Pick<IMetadataInterest, "name" | "code"> {
  @Field()
  public name!: string;
  @Field()
  public code!: string;
}

@Resolver(() => Interest)
export class DataInterestResolver {
  @Query(() => [Interest])
  public async metadataInterest(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<Interest[]> {
    return (await ctx.omnipartners.metadata.getInterests({
      lang,
    })).data;
  }
}
