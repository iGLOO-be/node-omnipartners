import { Ctx, Query, Resolver, ObjectType, Field } from "type-graphql";
import { Context } from "../types/Context";

@ObjectType()
class DataAccountPasswordPolicy {
  @Field(() => String, { nullable: true })
  public password_format!: string | null;
  @Field(() => String, { nullable: true })
  public alt_password_format!: string | null;
}

@Resolver()
export class DataAccountPasswordPolicyResolver {
  @Query(() => DataAccountPasswordPolicy, { nullable: true })
  public async metadataAccountPasswordPolicy(
    @Ctx() ctx: Context,
  ): Promise<DataAccountPasswordPolicy> {
    return (await ctx.omnipartners.identity.getFormatPassword()).data;
  }
}
