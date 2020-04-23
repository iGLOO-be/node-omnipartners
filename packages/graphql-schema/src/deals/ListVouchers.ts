import { ObjectType, Field, InputType } from "type-graphql";
import { PageInfo } from "../connections";
import {
  DealType,
  IDealDataOptions,
  IDealSubscriptionDataOptions,
  IVoucherListInput,
  IVoucher,
} from "omnipartners";
import { Deal } from "./Deal";

@InputType()
export class DealListOffersInput implements IVoucherListInput {
  @Field({ nullable: true })
  public user_guid?: string;
  @Field({ nullable: true })
  public pet_guid?: string;
  @Field({ nullable: true })
  public child_guid?: string;
  @Field(() => String, { nullable: true })
  public show?: "basic" | "extended";
  @Field({ nullable: true })
  public from?: string;
  @Field({ nullable: true })
  public to?: string;
  @Field({ nullable: true })
  public redeemed_from?: string;
  @Field({ nullable: true })
  public redeemed_to?: string;
  @Field({ nullable: true })
  public barcode?: string;
  @Field({ nullable: true })
  public external_tracking_ref?: string;
  @Field({ nullable: true })
  public partner_extid?: string;
  @Field({ nullable: true })
  public deal_ref?: string;
  @Field(() => String, { nullable: true })
  public deal_types?: DealType;
  @Field({ nullable: true })
  public redemption_request_status?: string;
  @Field(() => String, { nullable: true })
  public deal_data_options?: IDealDataOptions;
  @Field(() => String, { nullable: true })
  public data_options?: IDealSubscriptionDataOptions;
  @Field({ nullable: true })
  public coupon_id?: string;
  @Field(() => String, { nullable: true })
  public status?: IVoucherListInput["status"];
  @Field({ nullable: true })
  public inv_resend_count?: string;
  @Field({ nullable: true })
  public sort_field?: string;
  @Field({ nullable: true })
  public sort_order?: string;
  @Field({ nullable: true })
  public q?: string;
}

@ObjectType()
class DealListVouchersResultData {
  @Field()
  public user_guid!: string;
  @Field(() => String, { nullable: true })
  public pet_guid?: string | null;
  @Field(() => String, { nullable: true })
  public child_guid?: string | null;
  @Field()
  public ts_created!: string;
  @Field(() => String, { nullable: true })
  public barcode?: string | null;
  @Field()
  public status!: string;
  @Field()
  public deal_ref!: string;
  @Field(() => String, { nullable: true })
  public ts_redeemed?: string | null;
  @Field(() => String, { nullable: true })
  public subs_ts_subscribe?: string | null;
  @Field(() => Deal, { nullable: true })
  public deal?: Deal;

  constructor (voucher: IVoucher) {
    Object.assign(this, voucher)
    this.deal = voucher.deal && new Deal(voucher.deal)
  }
}

@ObjectType("DealListVouchersResult")
export class DealListVouchersResult {
  @Field()
  public pageInfo!: PageInfo;
  @Field(() => [DealListVouchersResultData])
  public result!: DealListVouchersResultData[];

  constructor ({ pageInfo, vouchers }: { pageInfo: PageInfo, vouchers: IVoucher[] }) {
    this.pageInfo = pageInfo
    this.result = vouchers.map(v => new DealListVouchersResultData(v))
  }
}
