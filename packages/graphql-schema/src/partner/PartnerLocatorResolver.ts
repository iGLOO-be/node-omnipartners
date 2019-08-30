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
}

const mapClixrayFields = (
  partnerLocatorInput: PartnerLocatorInput,
): Pick<
  IPartnerLocatorInput,
  "partner_lat" | "partner_lng" | "partner_type" | "radius" | "limit"
> => ({
  partner_lat: partnerLocatorInput.lat,
  partner_lng: partnerLocatorInput.lng,
  ...pickBy({
    partner_type: partnerLocatorInput.type,
    radius: partnerLocatorInput.radius,
    limit: partnerLocatorInput.limit,
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
