import {
  IDirectCashbackDealDetail,
  IDirectCashbackRedemptionRequestInput,
  ISubscribeToDirectCashbackDealInput,
} from "omnipartners";
import { Omit } from "type-fest";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
} from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { DirectCashbackRedemptionRequestResult } from "./DirectCashbackRedemptionRequestResult";

@InputType()
class DirectCashbackRedemptionRequestInputPayementDetail {
  @Field({ nullable: true })
  public iban: string;
  @Field({ nullable: true })
  public sortCode: string;
  @Field({ nullable: true })
  public accountNumber: string;
}

@InputType()
export class DirectCashbackDealSubscribeInput {
  @Field()
  public ref: string;

  @Field({ nullable: true })
  public pet_guid?: string;

  @Field({ nullable: true })
  public child_guid: string;

  public toOmnipartners(): Omit<
    ISubscribeToDirectCashbackDealInput,
    "user_guid"
  > {
    return {
      deal_ref: this.ref,
      pet_guid: this.pet_guid,
      child_guid: this.child_guid,
    };
  }
}

@InputType()
export class DirectCashbackRedemptionRequestInput {
  @Field()
  public barcode: string;

  @Field({ nullable: true })
  public benefitId?: string;

  @Field()
  public receiptDate: string;

  @Field()
  public receiptImageMimeType: string;

  @Field()
  public targetCurrency: "EUR" | "GBP";

  @Field()
  public paymentDetails: DirectCashbackRedemptionRequestInputPayementDetail;

  @Field({ nullable: true })
  public eanBarcode?: string;

  public toOmnipartners(): IDirectCashbackRedemptionRequestInput {
    return {
      barcode: this.barcode,
      benefit_id: this.benefitId,
      receipt_date: this.receiptDate,
      target_currency: this.targetCurrency,
      payment_details: this.paymentDetails.iban
        ? this.paymentDetails
        : {
            sort_code: this.paymentDetails.sortCode,
            account_number: this.paymentDetails.accountNumber,
          },
      receipt_image_mime_type: this.receiptImageMimeType,
    };
  }
}

@ObjectType()
export class DirectCashbackDealDetail {
  @Field()
  public id: string;

  @Field()
  public ref: string;

  @Field({ nullable: true })
  public redeemDurationValue?: number;

  @Field({ nullable: true })
  public redeemDurationUnit?: string;

  @Field({ nullable: true })
  public isRelativeRedeemDate?: boolean;

  @Field()
  public status: string;

  @Field({ nullable: true })
  public publicName?: string;

  @Field({ nullable: true })
  public availableFrom?: Date;

  @Field({ nullable: true })
  public availableTo?: Date;

  @Field({ nullable: true })
  public slogan?: string;

  @Field({ nullable: true })
  public redeemValidityFrom?: Date;

  @Field({ nullable: true })
  public redeemValidityTo?: Date;

  constructor(data: IDirectCashbackDealDetail) {
    Object.assign(this, data);
    this.redeemDurationValue = data.redeem_duration_value;
    this.redeemDurationUnit = data.redeem_duration_unit;
    this.isRelativeRedeemDate = data.is_relative_redeem_dates;
    this.publicName = data.public_name;
    this.availableFrom = new Date(data.available_from);
    this.availableTo = new Date(data.available_to);
    this.redeemValidityFrom = new Date(data.redeem_validity_from);
    this.redeemValidityTo = new Date(data.redeem_validity_to);
  }
}

export class DirectCashbackResolver {
  @Query(() => DirectCashbackDealDetail, { nullable: true })
  public async directCashbackDealDetail(
    @Ctx() ctx: Context,
    @Arg("ref") ref: string,
  ): Promise<DirectCashbackDealDetail> {
    const res = (await ctx.omnipartners.deals.getDirectCashbackDealDetail({
      ref,
    })).data;

    return new DirectCashbackDealDetail(res);
  }

  @Query(() => [DirectCashbackDealDetail], { nullable: false })
  public async listEligibleDirectCashbackDeals(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
  ): Promise<DirectCashbackDealDetail[]> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const res = await ctx.omnipartners.deals.listEligibleDirectCashbackDeals({
      user_guid,
    });
    return Promise.all(
      res.data.map(
        async ({ ref }) =>
          new DirectCashbackDealDetail(
            (await ctx.omnipartners.deals.getDirectCashbackDealDetail({
              ref,
            })).data,
          ),
      ),
    );
  }

  @Mutation(() => GenericValidationError, { nullable: true })
  public async directCashbackDealSubscribe(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("input") input: DirectCashbackDealSubscribeInput,
  ): Promise<GenericValidationError | undefined> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      await ctx.omnipartners.deals.subscribeToDirectCashbackDeal({
        ...input.toOmnipartners(),
        user_guid,
      });
    } catch (err) {
      return new GenericValidationError(err);
    }
  }

  @Mutation(() => DirectCashbackRedemptionRequestResult, { nullable: true })
  public async directCashbackCreateRedemptionRequest(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("input") input: DirectCashbackRedemptionRequestInput,
  ): Promise<DirectCashbackRedemptionRequestResult> {
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

      return new DirectCashbackRedemptionRequestResult({
        result: {
          url: data.presigned_url,
        },
      });
    } catch (err) {
      return new DirectCashbackRedemptionRequestResult({
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
