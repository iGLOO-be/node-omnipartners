import { IMetadataSubscription } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class Subscription implements IMetadataSubscription {
  @Field()
  public code!: string;
  @Field()
  public name!: string;
  @Field()
  public type!: string;
  @Field({ nullable: true })
  public consentText?: string;

  constructor(data: IMetadataSubscription) {
    Object.assign(this, data);
    this.consentText = data.consent_text;
  }
}

@Resolver(() => Subscription)
export class DataSubscriptionResolver {
  @Query(() => [Subscription])
  public async metadataSubscriptions(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<Subscription[]> {
    const subscriptions = (
      await ctx.omnipartners.metadata.getSubscriptions({
        lang,
      })
    ).data;

    return subscriptions.map(sub => new Subscription(sub));
  }
}
