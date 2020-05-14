import { ArgsType, Field, ObjectType, Ctx, Arg } from "type-graphql";
import { PageInfo } from "../connections";
import {
  IDealPartner,
  IPartnerDetailsDataOptions,
  IRegisteredPartnerDataOptions,
} from "omnipartners";
import { Partner } from "../partner/Partner";
import { Context } from "../types/Context";

@ObjectType()
export class DealPartner {
  @Field()
  public id!: string;
  @Field()
  public extid!: string;
  @Field()
  public name!: string;
  @Field({ nullable: true })
  public street1?: string;
  @Field({ nullable: true })
  public street2?: string;
  @Field({ nullable: true })
  public streetnum?: string;
  @Field({ nullable: true })
  public postal_code?: string;
  @Field({ nullable: true })
  public city?: string;
  @Field({ nullable: true })
  public region?: string;
  @Field({ nullable: true })
  public country?: string;
  @Field({ nullable: true })
  public lat?: string;
  @Field({ nullable: true })
  public lng?: string;

  @Field(() => Partner)
  public async detail(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
    @Arg("data_options", () => [String], { nullable: true })
    data_options?: IPartnerDetailsDataOptions,
  ): Promise<Partner> {
    const data = (
      await ctx.omnipartners.partners.partnerDetails({
        partner_ext_id: this.extid,
        lang,
        data_options,
      })
    ).data;

    return new Partner(data[0]);
  }

  constructor(data: IDealPartner) {
    Object.assign(this, data);
  }
}

@ObjectType()
export class DealPartnerResult {
  @Field()
  public pageInfo!: PageInfo;
  @Field(() => [DealPartner])
  public result!: DealPartner[];
}

@ArgsType()
export class GetRegisteredPartnerInputArgs {
  @Field({ nullable: true })
  public search_term?: string;

  @Field({ nullable: true })
  public partner_lat?: string;

  @Field({ nullable: true })
  public partner_lng?: string;

  @Field({ nullable: true })
  public radius?: string;

  @Field({ nullable: true })
  public p_page?: number;

  @Field({ nullable: true })
  public p_length?: number;

  @Field({ nullable: true })
  public partner_type?: string;

  @Field({ nullable: true })
  public partner_status?: string;

  @Field(() => String, { nullable: true })
  public data_options?: IRegisteredPartnerDataOptions;
}
