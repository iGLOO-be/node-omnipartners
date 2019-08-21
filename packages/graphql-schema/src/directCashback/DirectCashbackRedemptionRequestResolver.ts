import { IDirectCashbackRedemptionRequestListInput } from "omnipartners";
import { Arg, Args, ArgsType, Ctx, Field, Mutation, Query, Resolver } from "type-graphql";
import { ConnectionArgs } from "../connections";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import {
  DirectCashbackRedemptionRequest,
  DirectCashbackRedemptionRequestConnection,
} from "./DirectCashbackRedemptionRequest";
import { DirectCashbackRedemptionRequestInput } from "./DirectCashbackRedemptionRequestInput";
import { DirectCashbackRedemptionRequestCreateResult } from "./DirectCashbackRedemptionRequestResult";

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

  public toOmnipartners(): Omit<
    IDirectCashbackRedemptionRequestListInput,
    "user_guid"
  > {
    return {
      status: this.status,
      barcode: this.barcode,
      sort_field: this.sortField,
      sort_order: this.sortOrder,
    };
  }
}

@Resolver()
export class DirectCashbackRedemptionRequestResolver {
  @Query(() => DirectCashbackRedemptionRequestConnection, { nullable: true })
  public async directCashbackRedemptionRequestList(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Args() input: DirectCashbackRedemptionRequestListInput,
    @Args() args: ConnectionArgs,
  ): Promise<DirectCashbackRedemptionRequestConnection> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const data = (await ctx.omnipartners.deals.getDirectCashbackRedemptionRequestList(
      {
        user_guid,
        ...input,
        p_page: `${args.page}`,
        p_length: args.limit && `${args.limit}`,
      },
    )).data;

    const count = data.records.length;
    const limit = data.p_length;
    const page = data.p_page;
    const hasNextPage = page !== Math.ceil(count / limit);

    return {
      result: data.records.map(d => new DirectCashbackRedemptionRequest(d)),
      pageInfo: {
        count,
        hasNextPage,
        limit,
        page,
      },
    };
  }

  @Mutation(() => DirectCashbackRedemptionRequestCreateResult, {
    nullable: true,
  })
  public async directCashbackRedemptionRequestCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("input") input: DirectCashbackRedemptionRequestInput,
  ): Promise<DirectCashbackRedemptionRequestCreateResult> {
    try {
      await ctx.userTokenHelper.parse(token);

      input.benefitId =
        input.benefitId ||
        (await this.findBenefitIdByEAN(ctx, input.eanBarcode, input.barcode));

      const {
        data,
      } = await ctx.omnipartners.deals.createDirectCashbackRedemptionRequest({
        ...input.toOmnipartners(),
      });

      return new DirectCashbackRedemptionRequestCreateResult({
        result: {
          url: data.presigned_url,
        },
      });
    } catch (err) {
      return new DirectCashbackRedemptionRequestCreateResult({
        error: new GenericValidationError(err),
      });
    }
  }

  private findBenefitIdByEAN = async (
    ctx: Context,
    eanBarcode: string,
    subscriptionBarcode: string,
  ) => {
    const {
      data: { product_id },
    } = await ctx.omnipartners.products.getProduct({
      product_ean: eanBarcode,
    });

    const {
      data: {
        deal: { benefits },
      },
    } = await ctx.omnipartners.deals.getDirectCashbackVoucherDetail({
      barcode: subscriptionBarcode,
      deal_data_options: ["benefits"],
    });

    const benefit = benefits.find(b => b.product.id === product_id);

    return benefit.id;
  };
}
