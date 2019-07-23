import { IDirectCashbackRedemptionRequestListInput } from "omnipartners";
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  Query,
  Resolver,
} from "type-graphql";
import { ConnectionArgs } from "../connections";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import {
  DirectCashbackRedemptionRequestConnection,
  DirectCashbackRedemptionRequestListItem,
} from "./DirectCashbackRedemptionRequestListItem";

@ArgsType()
class DirectCashbackRedemptionRequestListInput {
  @Field({ nullable: true })
  public status?: string;

  @Field({ nullable: true })
  public barcode: string;

  @Field({ nullable: true })
  public sortField: string;

  @Field({ nullable: true })
  public sortOrder: string;

  public toOmnipartners(): Omit<IDirectCashbackRedemptionRequestListInput, "user_guid"> {
    return {
      status: this.status,
      barcode: this.barcode,
      sort_field: this.sortField,
      sort_order: this.sortOrder,
    };
  }
}

@Resolver(of => DirectCashbackRedemptionRequestListItem)
export class DirectCashbackRedemptionRequestListItemResolver {
  @Query(() => DirectCashbackRedemptionRequestConnection, { nullable: true })
  public async directCashbackRedemptionRequestList(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Args() input: DirectCashbackRedemptionRequestListInput,
    @Args() args: ConnectionArgs,
  ): Promise<DirectCashbackRedemptionRequestConnection | GenericValidationError> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      const data = (await ctx.omnipartners.deals.getDirectCashbackRedemptionRequestList({
        user_guid,
        ...input,
        p_page: `${args.page}`,
        p_length: `${args.limit}`,
      })).data;

      const count = data.records.length;
      const limit = data.p_length;
      const page = data.p_page;
      const hasNextPage = page !== Math.ceil(count / limit);

      return {
        result: data.records.map(d => new DirectCashbackRedemptionRequestListItem(d)),
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