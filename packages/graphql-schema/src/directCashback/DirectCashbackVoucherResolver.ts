import {
  IDirectCashbackDealDataOptions,
  IDirectCashbackDealDetail,
  IDirectCashbackVoucherBenefit,
  IDirectCashbackVoucherDetail,
} from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { DirectCashbackDealDetail } from "./DirectCashbackResolver";

@ObjectType()
class DirectCashbackVoucherBenefit {
  @Field({ nullable: true })
  public id: string;

  @Field({ nullable: true })
  public productId: string;

  @Field({ nullable: true })
  public amount: string;

  @Field({ nullable: true })
  public currency: string;

  constructor(data: IDirectCashbackVoucherBenefit) {
    Object.assign(this, data);
    this.productId = data.product_id;
  }
}

@ObjectType()
class DirectCashbackVoucherDealDetail extends DirectCashbackDealDetail {
  @Field(() => [DirectCashbackVoucherBenefit])
  public benefits: DirectCashbackVoucherBenefit[];

  constructor(data: IDirectCashbackDealDetail) {
    super(data);
    Object.assign(this, data);
    this.benefits = data.benefits.map(
      b =>
        new DirectCashbackVoucherBenefit({
          ...b,
          amount: b.value,
          product_id: b.product.id,
        }),
    );
  }
}

@ObjectType()
class DirectCashbackVoucherDetail {
  @Field()
  public id: string;

  @Field()
  public user_guid: string;

  @Field()
  public barcode: string;

  @Field()
  public status: string;

  @Field({ nullable: true })
  public pet_guid: string;

  @Field()
  public activeRedemptionRequestStatus: string;

  @Field()
  public redeemValidityFrom: string;

  @Field()
  public redeemValidityTo: string;

  @Field(() => DirectCashbackVoucherBenefit, { nullable: true })
  public benefit: DirectCashbackVoucherBenefit;

  @Field(() => DirectCashbackVoucherDealDetail)
  public deal: DirectCashbackVoucherDealDetail;

  constructor(data: IDirectCashbackVoucherDetail) {
    Object.assign(this, data);
    this.activeRedemptionRequestStatus = data.active_redemption_request_status;
    this.redeemValidityFrom = data.redeem_validity_from;
    this.redeemValidityTo = data.redeem_validity_to;
    this.deal = new DirectCashbackVoucherDealDetail(data.deal);
    this.benefit = new DirectCashbackVoucherBenefit(
      data.benefit,
    );
  }
}

@Resolver()
export class DirectCashbackVoucherResolver {
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
