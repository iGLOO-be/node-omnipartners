import { IMetadataPlaceOfPurchase } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class PlaceOfPurchase
  implements Pick<IMetadataPlaceOfPurchase, "name" | "code"> {
  @Field()
  public name!: string;
  @Field()
  public code!: string;
}

@Resolver(() => PlaceOfPurchase)
export class DataPlaceOfPurchaseResolver {
  @Query(() => [PlaceOfPurchase])
  public async metadataPlaceOfPurchase(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<PlaceOfPurchase[]> {
    return (await ctx.omnipartners.metadata.getPlaceOfPurchase({
      lang,
    })).data;
  }
}
