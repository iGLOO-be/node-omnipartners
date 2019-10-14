import {
  IDirectCashbackDealDetail,
  ISubscribeToDirectCashbackDealInput,
} from "omnipartners";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
} from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";

@InputType()
export class DirectCashbackDealSubscribeInput {
  @Field()
  public ref!: string;

  @Field({ nullable: true })
  public pet_guid?: string;

  @Field({ nullable: true })
  public child_guid?: string;

  public toOmnipartners(): Omit<
    ISubscribeToDirectCashbackDealInput,
    "user_guid"
  > {
    return {
      deal_ref: this.ref,
      pet_guid: this.pet_guid,
      child_guid: this.child_guid,
    };
  }
}

@ObjectType()
class LanguageObject {
  @Field({ nullable: true })
  public FR?: string | null;

  @Field({ nullable: true })
  public NL?: string | null;
}

@ObjectType()
class DirectCashbackDealDetailImages {
  @Field({ nullable: true })
  public small?: LanguageObject;

  @Field({ nullable: true })
  public large?: LanguageObject;
}

@ObjectType()
export class DirectCashbackDealDetail {
  @Field()
  public id!: string;

  @Field()
  public ref!: string;

  @Field({ nullable: true })
  public redeemDurationValue?: number;

  @Field({ nullable: true })
  public redeemDurationUnit?: string;

  @Field({ nullable: true })
  public isRelativeRedeemDate?: boolean;

  @Field()
  public status!: string;

  @Field({ nullable: true })
  public publicName?: string;

  @Field({ nullable: true })
  public availableFrom?: Date;

  @Field({ nullable: true })
  public availableTo?: Date;

  @Field({ nullable: true })
  public slogan?: string;

  @Field({ nullable: true })
  public redeemValidityFrom?: Date;

  @Field({ nullable: true })
  public redeemValidityTo?: Date;

  @Field({ nullable: true })
  public siteFooter?: string;

  @Field({ nullable: true })
  public presentationImages?: DirectCashbackDealDetailImages;

  @Field()
  public petRequired!: boolean;

  constructor(data: IDirectCashbackDealDetail) {
    Object.assign(this, data);
    this.siteFooter = data.site_footer;
    this.presentationImages = data.presentation_images;
    this.redeemDurationValue = data.redeem_duration_value;
    this.redeemDurationUnit = data.redeem_duration_unit;
    this.isRelativeRedeemDate = data.is_relative_redeem_dates;
    this.publicName = data.public_name;
    this.availableFrom = data.available_from
      ? new Date(data.available_from)
      : undefined;
    this.availableTo = data.available_to
      ? new Date(data.available_to)
      : undefined;
    this.redeemValidityFrom = data.redeem_validity_from
      ? new Date(data.redeem_validity_from)
      : undefined;
    this.redeemValidityTo = data.redeem_validity_to
      ? new Date(data.redeem_validity_to)
      : undefined;
    this.petRequired = data.pet_required === "1";
  }
}

export class DirectCashbackResolver {
  @Query(() => DirectCashbackDealDetail, { nullable: true })
  public async directCashbackDealDetail(
    @Ctx() ctx: Context,
    @Arg("ref") ref: string,
  ): Promise<DirectCashbackDealDetail> {
    const res = (await ctx.omnipartners.deals.getDirectCashbackDealDetail({
      ref,
    })).data;

    return new DirectCashbackDealDetail(res);
  }

  @Query(() => [DirectCashbackDealDetail], { nullable: false })
  public async directCashbackDealListEligible(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
  ): Promise<DirectCashbackDealDetail[]> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const res = await ctx.omnipartners.deals.listEligibleDirectCashbackDeals({
      user_guid,
    });
    return Promise.all(
      res.data.map(
        async ({ ref }) =>
          new DirectCashbackDealDetail(
            (await ctx.omnipartners.deals.getDirectCashbackDealDetail({
              ref,
            })).data,
          ),
      ),
    );
  }

  @Mutation(() => GenericValidationError, { nullable: true })
  public async directCashbackDealSubscribe(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("input") input: DirectCashbackDealSubscribeInput,
  ): Promise<GenericValidationError | undefined> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      await ctx.omnipartners.deals.subscribeToDirectCashbackDeal({
        ...input.toOmnipartners(),
        user_guid,
      });
    } catch (err) {
      return new GenericValidationError(err);
    }
  }
}
