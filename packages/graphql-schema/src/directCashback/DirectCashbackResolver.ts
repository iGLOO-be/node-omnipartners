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

  @Field()
  public benefitId?: string;

  @Field()
  public receiptDate: string;

  @Field()
  public receiptImageMimeType: string;

  @Field()
  public targetCurrency: "EUR" | "GBP";

  @Field()
  public paymentDetails: DirectCashbackRedemptionRequestInputPayementDetail;

  @Field()
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

  @Field()
  public redeemDurationValue: number;

  @Field()
  public redeemDurationUnit: string;

  @Field()
  public isRelativeRedeemDate: boolean;

  @Field()
  public status: string;

  @Field()
  public publicName: string;

  @Field()
  public availableFrom: string;

  @Field()
  public availableTo: string;

  @Field()
  public slogan: string;

  constructor(data: IDirectCashbackDealDetail) {
    Object.assign(this, data);
    this.redeemDurationValue = data.redeem_duration_value;
    this.redeemDurationUnit = data.redeem_duration_unit;
    this.isRelativeRedeemDate = data.is_relative_redeem_dates;
    this.publicName = data.public_name;
    this.availableFrom = data.available_from;
    this.availableTo = data.available_from;
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

  @Mutation(() => GenericValidationError, { nullable: true })
  public async directCashbackCreateRedemptionRequest(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("input") input: DirectCashbackRedemptionRequestInput,
  ): Promise<GenericValidationError | undefined> {
    try {
      ctx.userTokenHelper.parse(token);

      input.benefitId =
        input.benefitId || (await this.findProductIdByEAN(ctx, input.eanBarcode));

      await ctx.omnipartners.deals.createDirectCashbackRedemptionRequest({
        ...input.toOmnipartners(),
      });
    } catch (err) {
      return new GenericValidationError(err);
    }
  }

  private findProductIdByEAN = async (
    ctx: Context,
    eanBarcode: string,
  ) => {
    if (eanBarcode) {
      const {
        data: { product_id },
      } = await ctx.omnipartners.products.getProduct({
        product_ean: eanBarcode,
      });

      return product_id;
    } else {
      throw new GenericValidationError(new Error("Missing field eanBarcode"), {
        fieldsMapping: {
          eanBarcode: "You must either set eanBarcode or benefitId",
        },
      });
    }
  };
}
