import { pickBy } from "lodash";
import { IPartnerLocatorInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Query, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { Partner } from "./Partner";

@InputType()
class PartnerLocatorInput {
  @Field()
  public lat: string;

  @Field()
  public lng: string;

  @Field({ nullable: true })
  public type?: string;

  @Field({ nullable: true })
  public radius?: number;

  @Field({ nullable: true })
  public limit?: number;

  @Field({ nullable: true })
  public collectionRef?: string;

  @Field(() => [String], { nullable: true })
  public partner_group_handle?: string[];

  @Field(() => [String], { nullable: true })
  public excl_partner_group_handle?: string[];

  @Field({ nullable: true })
  public stock_level?: number;

  @Field({ nullable: true })
  public search_term?: string;

  @Field({ nullable: true })
  public partner_status?: string;
}

const mapClixrayFields = (
  partnerLocatorInput: PartnerLocatorInput,
): Pick<
  IPartnerLocatorInput,
  | "partner_lat"
  | "partner_lng"
  | "partner_type"
  | "radius"
  | "limit"
  | "collection_ref"
  | "partner_group_handle"
  | "excl_partner_group_handle"
  | "stock_level"
  | "search_term"
  | "partner_status"
> => ({
  partner_lat: partnerLocatorInput.lat,
  partner_lng: partnerLocatorInput.lng,
  ...pickBy({
    collection_ref: partnerLocatorInput.collectionRef,
    partner_type: partnerLocatorInput.type,
    radius: partnerLocatorInput.radius,
    limit: partnerLocatorInput.limit,
    partner_group_handle:
      partnerLocatorInput.partner_group_handle &&
      partnerLocatorInput.partner_group_handle.join(","),
    excl_partner_group_handle:
      partnerLocatorInput.excl_partner_group_handle &&
      partnerLocatorInput.excl_partner_group_handle.join(","),
    stock_level: partnerLocatorInput.stock_level,
    search_term: partnerLocatorInput.search_term,
    partner_status: partnerLocatorInput.partner_status,
  }),
});

@Resolver(() => Partner)
export class PartnerLocatorResolver {
  @Query(() => [Partner], { nullable: true })
  public async findPartners(
    @Ctx() ctx: Context,
    @Arg("partnerLocatorInput") partnerLocatorInput: PartnerLocatorInput,
  ): Promise<Partner[]> {
    const res = (await ctx.omnipartners.partners.findPartners({
      ...mapClixrayFields(partnerLocatorInput),
    })).data;

    return res.map((d: any) => new Partner(d));
  }
}
