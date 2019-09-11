import {
  IDirectCashbackDealDetail,
  IDirectCashbackVoucherBenefit,
  IDirectCashbackVoucherDetail,
} from "omnipartners";
import { Field, ObjectType } from "type-graphql";
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
export class DirectCashbackVoucherDetail {
  @Field()
  public id: string;

  @Field()
  public user_guid: string;

  @Field({ nullable: true })
  public barcode: string;

  @Field()
  public status: string;

  @Field({ nullable: true })
  public pet_guid: string;

  @Field({ nullable: true })
  public activeRedemptionRequestStatus: string;

  @Field()
  public redeemValidityFrom: Date;

  @Field({ nullable: true })
  public redeemValidityTo: Date;

  @Field(() => DirectCashbackVoucherBenefit, { nullable: true })
  public benefit: DirectCashbackVoucherBenefit;

  @Field(() => DirectCashbackVoucherDealDetail)
  public deal: DirectCashbackVoucherDealDetail;

  constructor(data: IDirectCashbackVoucherDetail) {
    Object.assign(this, data);
    this.activeRedemptionRequestStatus = data.active_redemption_request_status;
    this.redeemValidityFrom =
      data.redeem_validity_from && new Date(data.redeem_validity_from);
    this.redeemValidityTo =
      data.redeem_validity_to && new Date(data.redeem_validity_to);
    this.deal = new DirectCashbackVoucherDealDetail(data.deal);
    this.benefit =
      data.benefit && new DirectCashbackVoucherBenefit(data.benefit);
  }
}
