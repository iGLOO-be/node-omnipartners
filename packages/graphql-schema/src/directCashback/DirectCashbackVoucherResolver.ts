import {
  IDirectCashbackDealDataOptions,
  IDirectCashbackVoucherDetail,
} from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query } from "type-graphql";
import { Context } from "../types/Context";
import { DirectCashbackDealDetail } from "./DirectCashbackResolver";

@ObjectType()
class DirectCashbackVoucherDetailBenefit {
  @Field({ nullable: true })
  public productId: string;

  @Field({ nullable: true })
  public amount: string;

  @Field({ nullable: true })
  public currency: string;
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

  @Field({ nullable: true })
  public benefit: DirectCashbackVoucherDetailBenefit;

  @Field(() => DirectCashbackDealDetail)
  public deal: DirectCashbackDealDetail;

  constructor(data: IDirectCashbackVoucherDetail) {
    Object.assign(this, data);
    this.activeRedemptionRequestStatus = data.active_redemption_request_status;
    this.redeemValidityFrom = data.redeem_validity_from;
    this.redeemValidityTo = data.redeem_validity_to;
    this.deal = new DirectCashbackDealDetail(data.deal);
  }
}

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
