import { IDirectCashbackVoucherListItem } from "omnipartners";
import { Field, ObjectType } from "type-graphql";
import { PageInfo } from "../connections";

@ObjectType()
export class DirectCashbackVoucherListItem {
  @Field()
  public user_guid: string;

  @Field()
  public barcode: string;

  @Field()
  public pet_guid: string;

  @Field()
  public child_guid: string;

  @Field()
  public status: string;

  @Field()
  public benefitId: string;

  @Field()
  public ref: string;

  @Field()
  public redemptionRequestInProgress: boolean;

  constructor(data: IDirectCashbackVoucherListItem) {
    Object.assign(this, data);
    this.ref = data.deal_ref;
    this.benefitId = data.benefit_id;
    this.redemptionRequestInProgress =
      data.redemption_request_in_progress === 0 ? false : true;
  }
}

@ObjectType(`DirectCashbackVoucherConnection`)
export class DirectCashbackVoucherConnection {
  @Field()
  public pageInfo!: PageInfo;

  @Field(() => [DirectCashbackVoucherListItem])
  public result!: DirectCashbackVoucherListItem[];
}