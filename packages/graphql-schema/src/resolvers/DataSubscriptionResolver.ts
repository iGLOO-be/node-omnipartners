import { IMetadataSubscription } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class Subscription implements IMetadataSubscription {
  @Field()
  public code: string;
  @Field()
  public name: string;
  @Field()
  public type: string;
}

@Resolver(() => Subscription)
export class DataSubscriptionResolver {
  @Query(() => [Subscription])
  public async subscriptions(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<Subscription[]> {
    return (await ctx.omnipartners.metadata.getSubscriptions({
      lang,
    })).data;
  }
}
