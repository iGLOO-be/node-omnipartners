import { Arg, Ctx, Query } from "type-graphql";
import { Context } from "../types/Context";
import { Partner } from "./Partner";

export class PartnerResolver {
  @Query(() => [Partner], { nullable: true })
  public async partnerDetails(
    @Ctx() ctx: Context,
    @Arg("partner_ext_id") partner_ext_id: string,
  ): Promise<Partner[]> {
    const res = (await ctx.omnipartners.partners.partnerDetails({
      partner_ext_id,
    })).data;
    return res.map((d: any) => new Partner(d));
  }
}
