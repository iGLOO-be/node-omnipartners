import { IDeal, IDealProduct } from "omnipartners";
import { Field, ObjectType, Arg, Ctx, Args } from "type-graphql";
import { ProductCollectionDetail } from "../products/ProductCollection";
import { Context } from "../types/Context";
import { GetVisiblePartnerInputArgs } from "./VisiblePartner";
import { ConnectionArgs } from "../connections";
import {
  GetRegisteredPartnerInputArgs,
  DealPartner,
  DealPartnerResult,
} from "./DealPartner";

@ObjectType()
class DealOptionOptions {
  @Field()
  public id!: string;
  @Field(() => String)
  public visible!: "0" | "1";
  @Field()
  public default_value!: string;
  @Field(() => String)
  public can_change!: "0" | "1";
}

@ObjectType()
class DealStringByLang {
  @Field(() => String, { nullable: true })
  public FR?: string | null;
  @Field(() => String, { nullable: true })
  public NL?: string | null;
  @Field(() => String, { nullable: true })
  public EN?: string | null;
  @Field(() => String, { nullable: true })
  public forLocale?(@Arg("locale") locale: string) {
    return this[locale as keyof DealStringByLang] || this.EN;
  }
}

@ObjectType()
class DealPresentationImages {
  @Field(() => DealStringByLang)
  public small!: DealStringByLang;
  @Field(() => DealStringByLang)
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
export class DealProduct implements Omit<IDealProduct, "collection"> {
  @Field()
  public ean: string;
  @Field()
  public id: string;
  @Field()
  public label: string;
  @Field({ nullable: true })
  public friendly_name?: string;
  @Field()
  public min_qty: number;
  @Field({ nullable: true })
  public collectionReference?: string;
  @Field()
  public qty!: number;
  @Field()
  public label_with_qty!: string;
  @Field()
  public coll_with_qty!: string;

  constructor(data: IDealProduct) {
    this.ean = data.ean;
    this.id = data.id;
    this.label = data.label;
    this.friendly_name = data.friendly_name;
    this.min_qty = data.min_qty;
    this.collectionReference = data.collection?.reference;
  }

  @Field(() => ProductCollectionDetail, { nullable: true })
  public async collection(
    @Ctx() ctx: Context,
    @Arg("lang") lang: string,
  ): Promise<ProductCollectionDetail | undefined> {
    if (!this.collectionReference) {
      return;
    }
    return (
      await ctx.omnipartners.products.getCollectionDetails({
        collection_reference: this.collectionReference,
        language: lang,
      })
    ).data;
  }
}

@ObjectType()
class DealGroup {
  @Field()
  public group_name!: string;
  @Field()
  public group_handle!: string;
}

@ObjectType()
export class Deal implements Partial<Omit<IDeal, "products">> {
  @Field()
  public ref!: string;
  @Field()
  public name!: string;
  @Field()
  public type!: string;
  @Field(() => [String])
  public redeem_days!: string[];
  @Field()
  public is_locked!: boolean;
  @Field()
  public partner_visibility!: string;
  @Field()
  public restrict_registration!: boolean;
  @Field(() => String, { nullable: true })
  public image_url?: string | null;
  @Field()
  public postal_address_required!: boolean;
  @Field(() => [DealOptionOptions])
  public optin_options!: DealOptionOptions[];
  @Field(() => Number)
  public display_on_terminal!: 0 | 1;
  @Field()
  public redeem_duration_value!: number;
  @Field()
  public redeem_duration_unit!: string;
  @Field()
  public is_relative_redeem_dates!: boolean;
  @Field(() => String, { nullable: true })
  public google_tracking_id?: string | null;
  @Field()
  public status!: string;
  @Field(() => Number)
  public referrer_required!: 0 | 1;
  @Field(() => String)
  public pet_required!: "0" | "1";
  @Field(() => String, { nullable: true })
  public pet_type?: string | null;
  @Field(() => String, { nullable: true })
  public pet_universe?: string | null;
  @Field(() => [String], { nullable: true })
  public pet_breed?: string[] | null;
  @Field(() => [String], { nullable: true })
  public pet_age_limit_value?: string | null;
  @Field(() => String, { nullable: true })
  public pet_age_limit_unit?: IDeal["pet_age_limit_unit"];
  @Field(() => String, { nullable: true })
  public pet_age_limit_operator?: IDeal["pet_age_limit_operator"];
  @Field(() => String, { nullable: true })
  public pet_age_limit_to_value?: IDeal["pet_age_limit_to_value"];
  @Field(() => String, { nullable: true })
  public pet_age_limit_to_unit?: IDeal["pet_age_limit_to_unit"];
  @Field()
  public send_voucher_email!: boolean;
  @Field()
  public send_voucher_sms!: boolean;
  @Field(() => Number)
  public need_to_scan!: 0 | 1;
  @Field(() => String, { nullable: true })
  public available_from?: string | null;
  @Field(() => String, { nullable: true })
  public available_to?: string | null;
  @Field(() => String, { nullable: true })
  public redeem_validity_from?: string | null;
  @Field(() => String, { nullable: true })
  public redeem_validity_to?: string | null;
  @Field()
  public validity_message!: string;
  @Field()
  public confirmation_text!: string;
  @Field()
  public description!: string;
  @Field()
  public slogan!: string;
  @Field()
  public public_name!: string;
  @Field()
  public site_footer!: string;
  @Field()
  public voucher_small_print!: string;
  @Field()
  public redemption_confirmation_text!: string;
  @Field(() => String, { nullable: true })
  public redirect_url?: string | null;
  @Field(() => [String])
  public langs!: string[];
  @Field(() => String, { nullable: true })
  public logo_url?: string | null;
  @Field(() => String, { nullable: true })
  public css_file_url?: string | null;
  @Field(() => String, { nullable: true })
  public internal_barcode?: string | null;
  @Field(() => DealPresentationImages)
  public presentation_images!: DealPresentationImages;
  @Field(() => DealSubscriptionCount)
  public subscription_count!: DealSubscriptionCount;
  @Field(() => [String])
  public allowed_partner_groups!: string[];
  @Field(() => [String])
  public excluded_partner_groups!: string[];
  @Field(() => [String], { nullable: true })
  public deal_groups?: DealGroup[] | null;
  @Field(() => [DealProduct])
  public products!: DealProduct[];
  @Field(() => DealTypeDetails)
  public type_details!: DealTypeDetails;

  @Field(() => DealPartnerResult)
  public async visiblePartnerForUser(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Args() inputs: GetVisiblePartnerInputArgs,
    @Args() connectioArgs: ConnectionArgs,
  ): Promise<DealPartnerResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const limit = parseInt((connectioArgs.limit as any) || "100", 10);
    const page = parseInt((connectioArgs.page as any) || "0", 10);

    const { data, p_total } = await ctx.omnipartners.deals.getVisiblePartner({
      ...inputs.toOmnipartners(),
      user_guid,
      deal_ref: this.ref,
      p_page: page,
      p_length: limit,
    });

    const count = p_total;
    const hasNextPage = page !== Math.ceil(count / limit);

    return {
      pageInfo: {
        count,
        limit,
        hasNextPage,
        page,
      },
      result: data.map((d) => new DealPartner(d)),
    };
  }

  @Field(() => DealPartnerResult)
  public async registeredPartner(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Args() inputs: GetRegisteredPartnerInputArgs,
    @Args() connectioArgs: ConnectionArgs,
  ): Promise<DealPartnerResult> {
    ctx.userTokenHelper.parse(token);
    const limit = parseInt((connectioArgs.limit as any) || "100", 10);
    const page = parseInt((connectioArgs.page as any) || "0", 10);

    const {
      data,
      p_total,
    } = await ctx.omnipartners.deals.getRegisteredPartners({
      ...inputs,
      deal_ref: this.ref,
      p_page: page,
      p_length: limit,
    });

    const count = p_total;
    const hasNextPage = page !== Math.ceil(count / limit);

    return {
      pageInfo: {
        count,
        limit,
        hasNextPage,
        page,
      },
      result: data.map((d) => new DealPartner(d)),
    };
  }

  constructor(data: IDeal) {
    Object.assign(this, data);
    this.products = data.products.map((p) => new DealProduct(p));
  }
}
