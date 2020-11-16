import { IPartnerDetails } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PartnerLogo {
  @Field({ nullable: true })
  public default?: string;

  @Field({ nullable: true })
  public small?: string;

  @Field({ nullable: true })
  public medium?: string;

  @Field({ nullable: true })
  public large?: string;
}

@ObjectType()
export class Partner {
  @Field()
  public extId: string;

  @Field({ nullable: true })
  public street1?: string;

  @Field({ nullable: true })
  public street2?: string;

  @Field({ nullable: true })
  public streetnum?: string;

  @Field({ nullable: true })
  public postalCode?: string;

  @Field({ nullable: true })
  public city?: string;

  @Field({ nullable: true })
  public country?: string;

  @Field({ nullable: true })
  public email?: string;

  @Field({ nullable: true })
  public phone?: string;

  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public lat?: string;

  @Field({ nullable: true })
  public lng?: string;

  @Field({ nullable: true })
  public type: string;

  @Field({ nullable: true })
  public website?: string;

  @Field(() => [String], { nullable: true })
  public partnerGroups?: string[];

  @Field(() => PartnerLogo)
  public logo?: PartnerLogo;

  @Field({ nullable: true })
  public shortDescription?: string;

  constructor(data: IPartnerDetails) {
    Object.assign(this, data);
    this.extId = data.partner_ext_id;
    this.street1 = data.partner_inv_street1;
    this.street2 = data.partner_inv_street2;
    this.streetnum = data.partner_inv_streetnum;
    this.postalCode = data.partner_inv_postal_code;
    this.city = data.partner_inv_city;
    this.country = data.partner_inv_country;
    this.email = data.partner_email;
    this.phone = data.partner_phone;
    this.name = data.partner_pub_name;
    this.lat = data.partner_lat;
    this.lng = data.partner_lng;
    this.type = data.partner_type;
    this.partnerGroups = data.partner_groups;
    this.logo = {
      default: data.partner_logo,
      small: data.partner_logo_small,
      medium: data.partner_logo_medium,
      large: data.partner_logo_large,
    };
    this.website = data.partner_website;
    this.shortDescription = data.partner_short_description;
  }
}
