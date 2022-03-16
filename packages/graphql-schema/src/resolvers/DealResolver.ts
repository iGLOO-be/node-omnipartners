import { ISubscribeToDealInput, OPStatusError } from "omnipartners";
import {
  Arg,
  Args,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
} from "type-graphql";
import { ConnectionArgs } from "../connections";
import { Deal, DealProduct } from "../deals/Deal";
import {
  DealVisiblePartnerForUserResult,
  GetVisiblePartnerInputArgs,
} from "../deals/VisiblePartner";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";

@InputType()
export class DealSubscribeInput
  implements Omit<ISubscribeToDealInput, "user_guid">
{
  @Field()
  public ref!: string;

  @Field({ nullable: true })
  public partner_extid?: string;

  @Field({ nullable: true })
  public ean_code?: string;

  @Field({ nullable: true })
  public collection_ref?: string;

  @Field({ nullable: true })
  public secure_code?: string;

  @Field({ nullable: true })
  public pet_guid?: string;

  @Field({ nullable: true })
  public child_guid?: string;

  @Field({ nullable: true })
  public external_tracking_ref?: string;

  @Field({ nullable: true })
  public iban?: string;

  @Field({ nullable: true })
  public bic?: string;

  @Field({ nullable: true })
  public referral_code?: string;

  @Field({ nullable: true })
  public referral_code_type?: string;

  @Field({ nullable: true })
  public delivery_address_id?: string;

  @Field({ nullable: true })
  public utm_source?: string;

  @Field({ nullable: true })
  public utm_campaign?: string;

  @Field({ nullable: true })
  public utm_medium?: string;
}

export class DealResolver {
  @Query(() => [DealProduct], { nullable: true })
  public async dealProducts(
    @Ctx() ctx: Context,
    @Arg("deal_ref") deal_ref: string,
  ): Promise<DealProduct[]> {
    const res = (
      await ctx.omnipartners.deals.getProductList({
        deal_ref,
      })
    ).data;
    return res.map((v) => new DealProduct(v));
  }

  @Query(() => GenericValidationError, { nullable: true })
  public async dealCheckSecureCode(
    @Ctx() ctx: Context,
    @Arg("deal_ref") deal_ref: string,
    @Arg("code") code: string,
  ): Promise<GenericValidationError | undefined> {
    try {
      const result = await ctx.omnipartners.deals.checkSecureCode({
        code,
        deal_ref,
      });

      const valid =
        result.data.is_available === true &&
        result.data.deals.includes(deal_ref);
      if (!valid) {
        throw new OPStatusError({
          status: 3045,
          message: "Invalid secure code",
        });
      }
      return;
    } catch (err) {
      return new GenericValidationError(err);
    }
  }

  @Mutation(() => GenericValidationError, { nullable: true })
  public async dealSubscribe(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("input") input: DealSubscribeInput,
  ): Promise<GenericValidationError | undefined> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      await ctx.omnipartners.deals.subscribeToDeal({
        ...input,
        user_guid,
      });
      return;
    } catch (err) {
      return new GenericValidationError(err);
    }
  }

  @Query(() => DealVisiblePartnerForUserResult, {
    nullable: true,
    deprecationReason: "Prefer version in Deal.ts",
  })
  public async dealVisiblePartnerForUser(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Args() inputs: GetVisiblePartnerInputArgs,
    @Args() connectioArgs: ConnectionArgs,
  ): Promise<DealVisiblePartnerForUserResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const limit = parseInt((connectioArgs.limit as any) || "100", 10);
    const page = parseInt((connectioArgs.page as any) || "1", 10);

    const { data, p_total } = await ctx.omnipartners.deals.getVisiblePartner({
      ...inputs.toOmnipartners(),
      user_guid,
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
      result: data,
    };
  }

  @Query(() => Deal, { nullable: true })
  public async deal(
    @Ctx() ctx: Context,
    @Arg("deal_ref") deal_ref: string,
    @Arg("default_lang", { nullable: true }) default_lang?: string,
  ): Promise<Deal> {
    const { data } = await ctx.omnipartners.deals.getDeal({
      ref: deal_ref,
      default_lang: default_lang || "fr",
    });
    return new Deal(data);
  }
}
