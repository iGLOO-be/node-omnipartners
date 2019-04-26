import { IUserAddress } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserAddress {
  @Field()
  public id: number;
  @Field({ nullable: true })
  public name?: string;
  @Field({ nullable: true })
  public company: string | null;
  @Field({ nullable: true })
  public phone: string | null;
  @Field({ nullable: true })
  public region: string | null;
  @Field({ nullable: true })
  public streetnum: string;
  @Field({ nullable: true })
  public street1: string;
  @Field({ nullable: true })
  public street2: string | null;
  @Field({ nullable: true })
  public postalCode: string;
  @Field({ nullable: true })
  public city: string;
  @Field({ nullable: true })
  public county: string | null;
  @Field({ nullable: true })
  public country: string;
  @Field({ nullable: true })
  public type: string;
  @Field({ nullable: true })
  public isDefault: boolean;
  @Field({ nullable: true })
  public comment: string | null;
  @Field({ nullable: true })
  public latitude: number;
  @Field({ nullable: true })
  public longitude: number;

  constructor(data: IUserAddress) {
    this.id = data.address_id;
    this.name = data.address_name;
    this.company = data.address_company;
    this.phone = data.address_phone;
    this.region = data.address_region;
    this.streetnum = data.address_streetnum;
    this.street1 = data.address_street1;
    this.street2 = data.address_street2;
    this.postalCode = data.address_postal_code;
    this.city = data.address_city;
    this.county = data.address_county;
    this.country = data.address_country;
    this.type = data.address_type;
    this.isDefault = data.address_is_default;
    this.comment = data.address_comment;
    this.latitude = data.address_latitude;
    this.longitude = data.address_longitude;
    Object.assign(this, data);
  }
}
