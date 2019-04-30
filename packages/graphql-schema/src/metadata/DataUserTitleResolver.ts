import { IMetadataUserTitle } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class UserTitle implements IMetadataUserTitle {
  @Field()
  public code: string;
  @Field()
  public name: string;
  @Field()
  public gender: string;
}

@Resolver(() => UserTitle)
export class DataUserTitleResolver {
  @Query(() => [UserTitle])
  public async metadataUserTitles(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<UserTitle[]> {
    return (await ctx.omnipartners.metadata.getUserTitles({
      lang,
    })).data;
  }
}
