import { IDirectCashbackVoucherListItem } from "omnipartners";
import { Field, ObjectType } from "type-graphql";
import { PageInfo } from "../connections";

interface IExtendedDirectCashbackVoucherListItem
  extends IDirectCashbackVoucherListItem {
  redeemValidityFrom: Date;
  redeemValidityTo: Date;
  publicName: string;
}

@ObjectType()
export class DirectCashbackVoucherListItem {
  @Field()
  public user_guid: string;

  @Field()
  public barcode: string;

  @Field({ nullable: true })
  public pet_guid: string;

  @Field({ nullable: true })
  public child_guid: string;

  @Field()
  public status: string;

  @Field({ nullable: true })
  public benefitId?: string;

  @Field()
  public ref: string;

  @Field()
  public redemptionRequestInProgress: boolean;

  @Field()
  public redeemValidityFrom: Date;

  @Field()
  public redeemValidityTo: Date;

  @Field()
  public publicName: string;

  constructor(data: IExtendedDirectCashbackVoucherListItem) {
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
