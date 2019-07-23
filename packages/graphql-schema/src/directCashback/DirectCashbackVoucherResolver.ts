import {
  IDirectCashbackDealDataOptions,
  IDirectCashbackDealDetail,
  IDirectCashbackVoucherDetail,
} from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { DirectCashbackDealDetail } from "./DirectCashbackResolver";

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

  @Field()
  public pet_guid: string;

  @Field()
  public activeRedemptionRequestStatus: string;

  @Field()
  public redeemValidityFrom: string;

  @Field()
  public redeemValidityTo: string;

  @Field(() => DirectCashbackDealDetail)
  public deal: IDirectCashbackDealDetail;

  constructor(data: IDirectCashbackVoucherDetail) {
    Object.assign(this, data);
    this.activeRedemptionRequestStatus = data.active_redemption_request_status;
    this.redeemValidityFrom = data.redeem_validity_from;
    this.redeemValidityTo = data.redeem_validity_to;
  }
}

export class DirectCashbackVoucherResolver {
  @Query(() => DirectCashbackVoucherDetail, { nullable: true })
  public async directCashbackVoucherDetail(
    @Ctx() ctx: Context,
    @Arg("barcode") barcode: string,
    @Arg("deal_data_options", () => [String], { nullable: true })
    deal_data_options: IDirectCashbackDealDataOptions,
  ): Promise<DirectCashbackVoucherDetail | GenericValidationError> {
    const res = (await ctx.omnipartners.deals.getDirectCashbackVoucherDetail({
      barcode,
      deal_data_options,
    })).data;
    return new DirectCashbackVoucherDetail(res);
  }
}
