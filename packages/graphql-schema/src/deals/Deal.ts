import { IDeal } from "omnipartners";
import { Field, ObjectType } from "type-graphql";
import { AnimalBreed } from "../metadata/DataAnimalBreedResolver";
import { ProductCollection } from "../types/ProductCollection";

@ObjectType()
class DealOptionOptions {
  @Field()
  public id!: string;
  @Field()
  public visible!: string; // '0' || '1'
  @Field()
  public default_value!: string;
  @Field()
  public can_change!: string; // '0' || '1'
}

@ObjectType()
class DealStringByLang {
  @Field({ nullable: true })
  public FR?: string;
  @Field({ nullable: true })
  public NL?: string;
  @Field({ nullable: true })
  public EN?: string;
  @Field(() => String, { nullable: true })
  public forLocale(locale: string) {
    return this[locale as keyof DealStringByLang] || this.EN;
  }
}

@ObjectType()
class DealPresentationImages {
  @Field()
  public small!: DealStringByLang;
  @Field()
  public large!: DealStringByLang;
}

@ObjectType()
class DealSubscriptionCount {
  @Field()
  public REDEEMED!: number;
  @Field()
  public SUBSCRIBED!: number;
  @Field()
  public IN_PROGRESS!: number;
}

@ObjectType()
class DealAmounts {
  @Field({ nullable: true })
  public EUR?: number;
}

@ObjectType()
class DealTypeDetails {
  @Field()
  public discount_type!: string;
  @Field(() => DealAmounts)
  public amounts!: DealAmounts;
}

@ObjectType()
export class Deal {
  @Field()
  public ref!: string;
  @Field({ nullable: true })
  public name?: string;
  @Field({ nullable: true })
  public type?: string;
  @Field(() => [String], { nullable: true })
  public redeem_days?: string[];
  @Field({ nullable: true })
  public is_locked?: boolean;
  @Field({ nullable: true })
  public partner_visibility?: string;
  @Field({ nullable: true })
  public restrict_registration?: boolean;
  @Field({ nullable: true })
  public image_url?: string;
  @Field({ nullable: true })
  public postal_address_required?: boolean;
  @Field(() => [DealOptionOptions], { nullable: true })
  public optin_options?: DealOptionOptions[];
  @Field({ nullable: true })
  public display_on_terminal?: number; // '0' || '1'
  @Field({ nullable: true })
  public redeem_duration_value?: number;
  @Field({ nullable: true })
  public redeem_duration_unit?: string;
  @Field({ nullable: true })
  public is_relative_redeem_dates?: boolean;
  @Field({ nullable: true })
  public google_tracking_id?: string;
  @Field({ nullable: true })
  public status?: string;
  @Field({ nullable: true })
  public referrer_required?: number;
  @Field({ nullable: true })
  public pet_required?: string;
  @Field({ nullable: true })
  public pet_type?: string;
  @Field({ nullable: true })
  public pet_universe?: string;
  @Field(() => [AnimalBreed], { nullable: true })
  public pet_breed?: AnimalBreed[];
  @Field({ nullable: true })
  public pet_age_limit_value?: string;
  @Field({ nullable: true })
  public pet_age_limit_unit?: string;
  @Field({ nullable: true })
  public pet_age_limit_operator?: string;
  @Field({ nullable: true })
  public pet_age_limit_to_value?: string;
  @Field({ nullable: true })
  public pet_age_limit_to_unit?: string;
  @Field({ nullable: true })
  public send_voucher_email?: boolean;
  @Field({ nullable: true })
  public send_voucher_sms?: boolean;
  @Field({ nullable: true })
  public need_to_scan?: number;
  @Field({ nullable: true })
  public available_from?: string;
  @Field({ nullable: true })
  public available_to?: string;
  @Field({ nullable: true })
  public redeem_validity_from?: string;
  @Field({ nullable: true })
  public redeem_validity_to?: string;
  @Field({ nullable: true })
  public validity_message?: string;
  @Field({ nullable: true })
  public confirmation_text?: string;
  @Field({ nullable: true })
  public description?: string;
  @Field({ nullable: true })
  public slogan?: string;
  @Field({ nullable: true })
  public public_name?: string;
  @Field({ nullable: true })
  public site_footer?: string;
  @Field({ nullable: true })
  public voucher_small_print?: string;
  @Field({ nullable: true })
  public redemption_confirmation_text?: string;
  @Field({ nullable: true })
  public redirect_url?: string;
  @Field(() => [String], { nullable: true })
  public langs?: string[];
  @Field({ nullable: true })
  public logo_url?: string;
  @Field({ nullable: true })
  public css_file_url?: string;
  @Field({ nullable: true })
  public internal_barcode?: string;
  @Field(() => DealPresentationImages, { nullable: true })
  public presentation_images?: DealPresentationImages;
  @Field(() => DealSubscriptionCount, { nullable: true })
  public subscription_count?: DealSubscriptionCount;
  @Field({ nullable: true })
  public saving_end_time_value?: string;
  @Field({ nullable: true })
  public saving_end_time_unit?: string;
  @Field({ nullable: true })
  public saving_end_date?: string;
  @Field(() => [String], { nullable: true })
  public allowed_partner_groups?: string[];
  @Field(() => [String], { nullable: true })
  public excluded_partner_groups?: string[];
  @Field(() => [String], { nullable: true })
  public deal_groups?: string[];
  @Field(() => [ProductCollection], { nullable: true })
  public products?: ProductCollection[];
  @Field(() => DealTypeDetails, { nullable: true })
  public type_details?: DealTypeDetails;

  constructor(data: IDeal) {
    Object.assign(this, data);
  }
}
