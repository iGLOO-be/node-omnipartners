import { IDirectCashbackRedemptionRequestListItem } from "omnipartners";
import { Arg, Ctx, Field, ObjectType } from "type-graphql";
import { PageInfo } from "../connections";
import { Context } from "../types/Context";
import { DirectCashbackVoucherDetail } from "./DirectCashbackVoucherDetail";

@ObjectType()
export class DirectCashbackRedemptionRequest {
  @Field()
  public id!: string;

  @Field()
  public user_guid!: string;

  @Field()
  public imageUrl: string;

  @Field()
  public benefitId: string;

  @Field()
  public barcode!: string;

  @Field()
  public status!: string;

  @Field()
  public iban!: string;

  @Field({ nullable: true })
  public bic!: string;

  @Field()
  public createdOn: Date;

  @Field()
  public updatedOn: Date;

  @Field()
  public deal_ref: string;

  constructor(data: IDirectCashbackRedemptionRequestListItem) {
    Object.assign(this, data);
    this.imageUrl = data.image_url;
    this.benefitId = data.benefit_id;
    this.createdOn = new Date(data.created_on);
    this.updatedOn = new Date(data.updated_on);
    this.deal_ref = data.deal.ref;
  }

  @Field(() => DirectCashbackVoucherDetail)
  public async voucher(@Ctx() ctx: Context) {
    const res = (await ctx.omnipartners.deals.getDirectCashbackVoucherDetail({
      barcode: this.barcode,
      deal_data_options: ["benefits"],
    })).data;
    return new DirectCashbackVoucherDetail(res);
  }

  @Field(() => String, { nullable: true })
  public async statusMessage(
    @Ctx() ctx: Context,
    @Arg("lang") lang: string,
  ): Promise<string | undefined> {
    const history = (await ctx.omnipartners.deals.getDirectCashbackVoucherApprovalHistory(
      {
        barcode: this.barcode,
        lang,
      },
    )).data;

    const subRequest = history.sub_redemption_requests
      ? history.sub_redemption_requests.find(
          redemption => redemption && redemption.id === this.id,
        )
      : undefined;

    return subRequest
      ? subRequest.history.reverse()[0].description
      : undefined;
  }
}

@ObjectType(`DirectCashbackRedemptionRequestConnection`)
export class DirectCashbackRedemptionRequestConnection {
  @Field()
  public pageInfo!: PageInfo;

  @Field(() => [DirectCashbackRedemptionRequest])
  public result!: DirectCashbackRedemptionRequest[];
}
