import { IDirectCashbackVoucherListInput } from "omnipartners";
import { Arg, Args, ArgsType, Ctx, Field, Query, Resolver } from "type-graphql";
import { ConnectionArgs } from "../connections";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
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

@Resolver(of => DirectCashbackVoucherListItem)
export class DirectCashbackVoucherListItemResolver {
  @Query(() => DirectCashbackVoucherConnection, { nullable: true })
  public async directCashbackVoucherList(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Args() input: DirectCashbackVoucherListInput,
    @Args() args: ConnectionArgs,
  ): Promise<DirectCashbackVoucherConnection | GenericValidationError> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
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

      return {
        result: data.records.map(d => new DirectCashbackVoucherListItem(d)),
        pageInfo: {
          count,
          hasNextPage,
          limit,
          page,
        },
      };
    } catch (err) {
      return new GenericValidationError(err);
    }
  }
}
