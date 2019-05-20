import { Args, Ctx, Query, Resolver } from "type-graphql";
import { ConnectionArgs } from "../connections";
import { Context } from "../types/Context";
import { PartnerConnection, PartnerListItem } from "./PartnerListItem";

@Resolver(of => PartnerListItem)
export class PartnerListItemResolver {
  @Query(() => PartnerConnection, { nullable: true })
  public async partnerList(
    @Ctx() ctx: Context,
    @Args() args: ConnectionArgs,
  ): Promise<PartnerConnection> {
    const res = await ctx.omnipartners.partners.listPartners({
      page: `${args.page}`,
      rows: `${args.limit}`,
    });

    const count = parseInt(res.total_rows, 10);
    const limit = parseInt(res.rows, 10);
    const page = parseInt(res.page, 10);
    const hasNextPage = page !== Math.ceil(count / limit);

    return {
      pageInfo: {
        count,
        limit,
        hasNextPage,
        page,
      },
      result: res.data.map((d: any) => new PartnerListItem(d)),
    };
  }
}
