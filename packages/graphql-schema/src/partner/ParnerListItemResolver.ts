import {
  Args,
  Ctx,
  Query,
  Resolver,
  Field,
  Arg,
  InputType,
} from "type-graphql";
import { ConnectionArgs } from "../connections";
import { Context } from "../types/Context";
import { PartnerConnection, PartnerListItem } from "./PartnerListItem";
import { IPartnerListItemInput } from "omnipartners";

@InputType()
class IPartnerListItemInputArg {
  @Field(() => [String], { nullable: true })
  public type?: string[] | string;

  @Field(() => [String], { nullable: true })
  public groupHandle?: string[] | string;

  public toOmnipartners(): IPartnerListItemInput {
    return {
      partner_type: Array.isArray(this.type) ? this.type.join(",") : this.type,
      partner_group_handle: Array.isArray(this.groupHandle)
        ? this.groupHandle.join(",")
        : this.groupHandle,
    };
  }
}

@Resolver(() => PartnerListItem)
export class PartnerListItemResolver {
  @Query(() => PartnerConnection, { nullable: true })
  public async partnerList(
    @Ctx() ctx: Context,
    @Args() args: ConnectionArgs,
    @Arg("partnerListInput", { nullable: true })
    partnerListInput?: IPartnerListItemInputArg,
  ): Promise<PartnerConnection> {
    const res = await ctx.omnipartners.partners.listPartners({
      page: `${args.page}`,
      rows: `${args.limit}`,
      ...(partnerListInput && partnerListInput.toOmnipartners()),
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
