import {
  IDirectCashbackDealDataOptions,
  IDirectCashbackVoucherListInput,
} from "omnipartners";
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { ConnectionArgs, PageInfo } from "../connections";
import { Context } from "../types/Context";
import { DirectCashbackVoucherDetail } from "./DirectCashbackVoucherDetail";

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

@ObjectType(`DirectCashbackVoucherConnection`)
export class DirectCashbackVoucherConnection {
  @Field()
  public pageInfo!: PageInfo;

  @Field(() => [DirectCashbackVoucherDetail])
  public result!: DirectCashbackVoucherDetail[];
}

@Resolver()
export class DirectCashbackVoucherResolver {
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
      p_page: args.page && `${args.page}`,
      p_length: args.limit && `${args.limit}`,
    })).data;

    const count = data.records.length;
    const limit = data.p_length;
    const page = data.p_page;
    const hasNextPage = count > 0;

    const result = await Promise.all(
      data.records.map(
        async ({ barcode }) =>
          new DirectCashbackVoucherDetail(
            (await ctx.omnipartners.deals.getDirectCashbackVoucherDetail({
              barcode,
              deal_data_options: ["benefits"],
            })).data,
          ),
      ),
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

  @Query(() => DirectCashbackVoucherDetail, { nullable: true })
  public async directCashbackVoucherDetail(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("barcode") barcode: string,
    @Arg("deal_data_options", () => [String], { nullable: true })
    deal_data_options?: IDirectCashbackDealDataOptions,
  ): Promise<DirectCashbackVoucherDetail> {
    ctx.userTokenHelper.parse(token);
    const res = (await ctx.omnipartners.deals.getDirectCashbackVoucherDetail({
      barcode,
      deal_data_options,
    })).data;
    return new DirectCashbackVoucherDetail(res);
  }
}
