import { Arg, Ctx, Query } from "type-graphql";
import { Context } from "../types/Context";
import { DirectCashbackDealDetail } from "./DirectCashbackResolver";

export class DirectCashbackDealEligibleListResolver {
  @Query(() => [DirectCashbackDealDetail], { nullable: false })
  public async listEligibleDirectCashbackDeals(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
  ): Promise<DirectCashbackDealDetail[]> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const res = await ctx.omnipartners.deals.listEligibleDirectCashbackDeals({
      user_guid,
    });
    return Promise.all(
      res.data.map(
        async ({ ref }) =>
          new DirectCashbackDealDetail(
            (await ctx.omnipartners.deals.getDirectCashbackDealDetail({
              ref,
            })).data,
          ),
      ),
    );
  }
}
