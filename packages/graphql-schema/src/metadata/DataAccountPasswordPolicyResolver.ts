import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../types/Context";

@Resolver()
export class DataAccountPasswordPolicyResolver {
  @Query(() => String)
  public async metadataAccountPasswordPolicy(
    @Ctx() ctx: Context,
  ): Promise<string> {
    return (await ctx.omnipartners.identity.getFormatPassword()).data.password_format
  }
}
