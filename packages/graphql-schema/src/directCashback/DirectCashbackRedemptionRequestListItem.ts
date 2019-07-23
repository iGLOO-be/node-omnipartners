import { IDirectCashbackRedemptionRequestListItem } from "omnipartners";
import { Field, ObjectType } from "type-graphql";
import { PageInfo } from "../connections";

@ObjectType()
class DealRef {
  @Field()
  public ref: string;
}

@ObjectType()
export class DirectCashbackRedemptionRequestListItem {
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

  @Field()
  public bic: string;

  @Field()
  public createdOn: string;

  @Field()
  public updatedOn: string;

  @Field()
  public deal: DealRef;

  constructor(data: IDirectCashbackRedemptionRequestListItem) {
    Object.assign(this, data);
    this.imageUrl = data.image_url;
    this.benefitId = data.benefit_id;
    this.createdOn = data.created_on;
    this.updatedOn = data.updated_on;
  }
}

@ObjectType(`DirectCashbackRedemptionRequestConnection`)
export class DirectCashbackRedemptionRequestConnection {
  @Field()
  public pageInfo!: PageInfo;

  @Field(() => [DirectCashbackRedemptionRequestListItem])
  public result!: DirectCashbackRedemptionRequestListItem[];
}
