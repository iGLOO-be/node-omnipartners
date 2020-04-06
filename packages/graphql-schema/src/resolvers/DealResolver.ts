import { IDealProduct, ISubscribeToDealInput } from "omnipartners";
import {
  Arg,
  Args,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
} from "type-graphql";
import { ConnectionArgs } from "../connections";
import { Deal as DealDetails } from "../deals/Deal";
import {
  DealVisiblePartnerForUserResult,
  GetVisiblePartnerInputArgs,
} from "../deals/VisiblePartner";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { ProductCollectionDetail } from "../products/ProductCollection";

@InputType()
export class DealSubscribeInput
  implements Omit<ISubscribeToDealInput, "user_guid"> {
  @Field()
  public ref!: string;

  @Field({ nullable: true })
  public partner_extid?: string;

  @Field({ nullable: true })
  public ean_code?: string;

  @Field({ nullable: true })
  public secure_code?: string;

  @Field({ nullable: true })
  public pet_guid?: string;

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
  public child_guid?: string;
}

@ObjectType()
class DealProduct implements Omit<IDealProduct, "collection"> {
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

  constructor(data: IDealProduct) {
    this.ean = data.ean;
    this.id = data.id;
    this.label = data.label;
    this.friendly_name = data.friendly_name;
    this.min_qty = data.min_qty;
    this.collectionReference = data.collection.reference;
  }

  @Field(() => ProductCollectionDetail, { nullable: true })
  public async collection(
    @Ctx() ctx: Context,
    @Arg("lang") lang: string,
  ): Promise<ProductCollectionDetail | undefined> {
    if (!this.collectionReference) {
      return;
    }
    return (await ctx.omnipartners.products.getCollectionDetails({
      collection_reference: this.collectionReference,
      language: lang,
    })).data;
  }
}

export class DealResolver {
  @Query(() => [DealProduct], { nullable: true })
  public async dealProducts(
    @Ctx() ctx: Context,
    @Arg("deal_ref") deal_ref: string,
  ): Promise<DealProduct[]> {
    const res = (await ctx.omnipartners.deals.getProductList({
      deal_ref,
    })).data;
    return res.map(v => new DealProduct(v));
  }

  @Query(() => GenericValidationError, { nullable: true })
  public async dealCheckSecureCode(
    @Ctx() ctx: Context,
    @Arg("deal_ref") deal_ref: string,
    @Arg("code") code: string,
  ): Promise<GenericValidationError | undefined> {
    try {
      await ctx.omnipartners.deals.checkSecureCode({
        code,
        deal_ref,
      });
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

  @Query(() => DealVisiblePartnerForUserResult, { nullable: true })
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
      ...inputs,
      user_guid,
      p_page: page,
      p_length: limit,
    });

    const count = parseInt(p_total, 10);
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

  @Query(() => DealDetails, { nullable: true })
  public async deal(
    @Ctx() ctx: Context,
    @Arg("deal_ref") deal_ref: string,
    @Arg("default_lang", { nullable: true }) default_lang?: string,
  ): Promise<DealDetails> {
    const { data } = await ctx.omnipartners.deals.getDeal({
      ref: deal_ref,
      default_lang: default_lang || "fr",
    });
    return new DealDetails(data);
  }
}
