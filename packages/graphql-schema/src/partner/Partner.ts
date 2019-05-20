import { IPartnerDetails } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Partner {
  @Field()
  public extId: string;
  @Field()
  public street1: string;
  @Field()
  public streetnum: string;
  @Field()
  public postalCode: string;
  @Field()
  public city: string;
  @Field()
  public country: string;
  @Field()
  public email: string;
  @Field()
  public phone: string;

  constructor(data: IPartnerDetails) {
    Object.assign(this, data);
    this.extId = data.partner_ext_id;
    this.street1 = data.partner_inv_street1;
    this.streetnum = data.partner_inv_streetnum;
    this.postalCode = data.partner_inv_postal_code;
    this.city = data.partner_inv_city;
    this.country = data.partner_inv_country;
    this.email = data.partner_email;
    this.phone = data.partner_phone;
  }
}
