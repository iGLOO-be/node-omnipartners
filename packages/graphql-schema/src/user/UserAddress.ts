import { IUserAddress } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserAddress {
  @Field()
  public id: number;

  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public phone: string | null;

  @Field({ nullable: true })
  public streetnum: string;

  @Field({ nullable: true })
  public street1: string;

  @Field({ nullable: true })
  public postalCode: string;

  @Field({ nullable: true })
  public city: string;

  @Field({ nullable: true })
  public country: string;

  constructor(data: IUserAddress) {
    Object.assign(this, data);
    this.id = data.address_id;
    this.name = data.address_name;
    this.phone = data.address_phone;
    this.streetnum = data.address_streetnum;
    this.street1 = data.address_street1;
    this.postalCode = data.address_postal_code;
    this.city = data.address_city;
    this.country = data.address_country;
  }
}
