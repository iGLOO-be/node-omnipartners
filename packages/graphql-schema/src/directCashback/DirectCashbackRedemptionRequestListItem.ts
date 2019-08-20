import { IDirectCashbackRedemptionRequestListItem } from "omnipartners";
import { Field, ObjectType } from "type-graphql";
import { PageInfo } from "../connections";

interface IExtendedDirectCashbackRedemptionRequestListItem
  extends IDirectCashbackRedemptionRequestListItem {
  publicName: string;
  slogan: string;
}

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
  public createdOn: Date;

  @Field()
  public updatedOn: Date;

  @Field()
  public deal_ref: string;

  @Field()
  public publicName: string;

  @Field()
  public slogan: string;

  constructor(data: IExtendedDirectCashbackRedemptionRequestListItem) {
    Object.assign(this, data);
    this.imageUrl = data.image_url;
    this.benefitId = data.benefit_id;
    this.createdOn = new Date(data.created_on);
    this.updatedOn = new Date(data.updated_on);
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
