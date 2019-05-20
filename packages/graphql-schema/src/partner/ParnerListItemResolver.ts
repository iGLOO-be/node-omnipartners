import {
  Arg,
  Ctx,
  Query,
} from "type-graphql";
import { Context } from "../types/Context";
import { PartnerListItem } from "./PartnerListItem";

export class PartnerListItemResolver {
  @Query(() => [PartnerListItem], { nullable: true })
  public async partnerList(
    @Ctx() ctx: Context,
  ): Promise<PartnerListItem[]> {
    const res = (await ctx.omnipartners.partners.listPartners({})).data;
    console.log(res)
    return res.map((d: any) => new PartnerListItem(d));
  }
}
