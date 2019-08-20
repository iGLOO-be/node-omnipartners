import { IDirectCashbackVoucherListInput } from "omnipartners";
import { Arg, Args, ArgsType, Ctx, Field, Query, Resolver } from "type-graphql";
import { ConnectionArgs } from "../connections";
import { Context } from "../types/Context";
import {
  DirectCashbackVoucherConnection,
  DirectCashbackVoucherListItem,
} from "./DirectCashbackVoucherListItem";

@ArgsType()
class DirectCashbackVoucherListInput {
  @Field({ nullable: true })
  public pet_guid?: string;

  @Field({ nullable: true })
  public child_guid: string;

  @Field({ nullable: true })
  public from: string;

  @Field({ nullable: true })
  public to: string;

  @Field({ nullable: true })
  public ref: string;

  public toOmnipartners(): Omit<IDirectCashbackVoucherListInput, "user_guid"> {
    return {
      deal_ref: this.ref,
      pet_guid: this.pet_guid,
      child_guid: this.child_guid,
      from: this.from,
      to: this.to,
    };
  }
}

@Resolver()
export class DirectCashbackVoucherListItemResolver {
  @Query(() => DirectCashbackVoucherConnection, { nullable: true })
  public async directCashbackVoucherList(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Args() input: DirectCashbackVoucherListInput,
    @Args() args: ConnectionArgs,
  ): Promise<DirectCashbackVoucherConnection> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const data = (await ctx.omnipartners.deals.getDirectCashbackVoucherList({
      user_guid,
      ...input,
      p_page: `${args.page}`,
      p_length: args.limit && `${args.limit}`,
    })).data;

    const count = data.records.length;
    const limit = data.p_length;
    const page = data.p_page;
    const hasNextPage = page !== Math.ceil(count / limit);

    const result = await Promise.all(
      data.records.map(async d => {
        const res = (await ctx.omnipartners.deals.getDirectCashbackVoucherDetail(
          {
            barcode: d.barcode,
            deal_data_options: ["benefits"],
          },
        )).data;
        return new DirectCashbackVoucherListItem({
          redeemValidityFrom: new Date(res.redeem_validity_from),
          redeemValidityTo: new Date(res.redeem_validity_to),
          publicName: res.deal.public_name,
          ...d,
        });
      }),
    );
    return {
      result,
      pageInfo: {
        count,
        hasNextPage,
        limit,
        page,
      },
    };
  }
}
