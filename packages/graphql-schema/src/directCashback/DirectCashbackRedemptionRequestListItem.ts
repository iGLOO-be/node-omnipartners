import { IDirectCashbackRedemptionRequestListItem } from "omnipartners";
import { Field, ObjectType } from "type-graphql";
import { PageInfo } from "../connections";

@ObjectType()
export class DirectCashbackRedemptionRequestListItem {
  @Field()
  public id: string;

  @Field()
  public user_guid: string;

  @Field()
  public imageUrl: string;

  @Field()
  public benefitId: string;

  @Field()
  public barcode: string;

  @Field()
  public status: string;

  @Field()
  public iban: string;

  @Field({ nullable: true })
  public bic: string;

  @Field()
  public createdOn: string;

  @Field()
  public updatedOn: string;

  @Field()
  public deal_ref: string;

  constructor(data: IDirectCashbackRedemptionRequestListItem) {
    Object.assign(this, data);
    this.imageUrl = data.image_url;
    this.benefitId = data.benefit_id;
    this.createdOn = data.created_on;
    this.updatedOn = data.updated_on;
    this.deal_ref = data.deal.ref;
  }
}

@ObjectType(`DirectCashbackRedemptionRequestConnection`)
export class DirectCashbackRedemptionRequestConnection {
  @Field()
  public pageInfo!: PageInfo;

  @Field(() => [DirectCashbackRedemptionRequestListItem])
  public result!: DirectCashbackRedemptionRequestListItem[];
}
