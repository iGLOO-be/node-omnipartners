import { IPartnerDetails } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Partner {
  @Field()
  public extId: string;
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
  @Field({ nullable: true })
  public email: string;
  @Field({ nullable: true })
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
