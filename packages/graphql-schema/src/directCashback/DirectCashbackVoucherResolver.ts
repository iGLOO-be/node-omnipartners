import {
  IDirectCashbackDealDataOptions,
  IDirectCashbackDealDetail,
  IDirectCashbackVoucherDetail,
} from "omnipartners";
import { Arg, Ctx, Field, InputType, ObjectType, Query } from "type-graphql";
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
  public redemptionStatus: string;

  @Field()
  public redeemFrom: string;

  @Field()
  public redeemTo: string;

  @Field(() => DirectCashbackDealDetail)
  public deal: IDirectCashbackDealDetail;

  constructor(data: IDirectCashbackVoucherDetail) {
    Object.assign(this, data);
    this.redemptionStatus = data.active_redemption_request_status;
    this.redeemFrom = data.redeem_validity_from;
    this.redeemTo = data.redeem_validity_to;
  }
}

export class DirectCashbackVoucherResolver {
  @Query(() => [DirectCashbackVoucherDetail], { nullable: true })
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
