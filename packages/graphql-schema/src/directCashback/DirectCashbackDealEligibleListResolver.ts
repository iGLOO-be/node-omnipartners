import { Arg, Ctx, Query } from "type-graphql";
import { Context } from "../types/Context";
import { UserEligibleDirectCashbackDeal } from "../user/UserEligibleDirectCashbackDeal";

export class DirectCashbackDealEligibleListResolver {
  @Query(() => [UserEligibleDirectCashbackDeal], { nullable: false })
  public async listEligibleDirectCashbackDeals(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
  ): Promise<UserEligibleDirectCashbackDeal[]> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const res = await ctx.omnipartners.deals.listEligibleDirectCashbackDeals({
      user_guid,
    });
    return Promise.all(
      res.data.map(async d => {
        const r = await ctx.omnipartners.deals.getDirectCashbackDealDetail({
          ref: d.ref,
        });

        return new UserEligibleDirectCashbackDeal({
          slogan: r.data.slogan,
          publicName: r.data.public_name,
          ...d,
        });
      }),
    );
  }
}
