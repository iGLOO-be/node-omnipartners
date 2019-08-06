import { IPartnerListItem } from "omnipartners";
import { Field, ObjectType } from "type-graphql";
import { PageInfo } from "../connections";

@ObjectType()
export class PartnerListItem {
  @Field()
  public extId: string;

  @Field()
  public type: string;

  @Field()
  public pubName: string;

  @Field({ nullable: true })
  public street1: string;

  @Field({ nullable: true })
  public streetnum: string;

  @Field({ nullable: true })
  public postalCode: string;

  @Field({ nullable: true })
  public city: string;

  @Field({ nullable: true })
  public country: string;

  constructor(data: IPartnerListItem) {
    Object.assign(this, data);
    this.extId = data.partner_ext_id;
    this.type = data.partner_type;
    this.pubName = data.partner_pub_name;
    this.street1 = data.partner_pub_street1;
    this.streetnum = data.partner_pub_streetnum;
    this.postalCode = data.partner_pub_postal_code;
    this.city = data.partner_pub_city;
    this.country = data.partner_pub_country;
  }
}

@ObjectType(`PartnerConnection`)
export class PartnerConnection {
  @Field()
  public pageInfo!: PageInfo;

  @Field(() => [PartnerListItem])
  public result!: PartnerListItem[];
}
