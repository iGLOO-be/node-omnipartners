import {
  IDirectCashbackRedemptionRequestListInput,
  OPStatusError,
} from "omnipartners";
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
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
  public barcode?: string;

  @Field({ nullable: true })
  public sortField?: string;

  @Field({ nullable: true })
  public sortOrder?: string;

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
  @Query(() => DirectCashbackRedemptionRequestConnection)
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
        p_page: !args.page ? "0" : `${args.page - 1}`,
        p_length: args.limit ? `${args.limit}` : "10",
      },
    )).data;

    const count = data.p_total;
    const limit = data.p_length;
    const page = data.p_page + 1;
    const hasNextPage = limit * page < count;

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
        (input.eanBarcode &&
          (await this.findBenefitIdByEAN(
            ctx,
            input.eanBarcode,
            input.barcode,
          )));

      if (!input.benefitId) {
        throw new OPStatusError({
          message: "Product ean or code required.",
          statusCode: 1020,
        });
      }

      const {
        data,
      } = await ctx.omnipartners.deals.createDirectCashbackRedemptionRequest({
        ...input.toOmnipartners(),
        benefit_id: input.benefitId,
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
  ): Promise<string | undefined> => {
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

    return benefit && benefit.id;
  };
}
