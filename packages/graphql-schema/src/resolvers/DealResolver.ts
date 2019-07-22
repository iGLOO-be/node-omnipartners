import {
  IDealProduct,
  IDirectCashbackDealDetail,
  ISubscribeToDealInput,
  ISubscribeToDirectCashbackDealInput,
} from "omnipartners";
import { Omit } from "type-fest";
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
import { ProductCollection } from "../types/ProductCollection";

@InputType()
export class DealSubscribeInput
  implements Omit<ISubscribeToDealInput, "user_guid"> {
  @Field()
  public ref: string;
  @Field()
  public partner_extid: string;
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
  public delivery_address_id?: string;
}

@InputType()
export class DirectCashbackDealSubscribeInput {
  @Field()
  public ref: string;

  @Field({ nullable: true })
  public pet_guid?: string;

  @Field({ nullable: true })
  public child_guid: string;

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
  public collectionReference: string;

  constructor(data: IDealProduct) {
    this.ean = data.ean;
    this.id = data.id;
    this.label = data.label;
    this.friendly_name = data.friendly_name;
    this.min_qty = data.min_qty;
    this.collectionReference = data.collection.reference;
  }

  @Field(() => ProductCollection, { nullable: true })
  public async collection(
    @Ctx() ctx: Context,
    @Arg("lang") lang: string,
  ): Promise<ProductCollection> {
    if (!this.collectionReference) {
      return;
    }
    return (await ctx.omnipartners.products.getCollectionDetails({
      collection_reference: this.collectionReference,
      language: lang,
    })).data;
  }
}

@ObjectType()
class DirectCashbackDealDetail {
  @Field()
  public id: string;

  @Field()
  public ref: string;

  @Field()
  public redeemDurationValue: number;

  @Field()
  public redeemDurationUnit: string;

  @Field()
  public isRelativeRedeemDate: boolean;

  @Field()
  public status: string;

  @Field()
  public publicName: string;

  @Field()
  public availableFrom: string;

  @Field()
  public availableTo: string;

  @Field()
  public slogan: string;

  constructor(data: IDirectCashbackDealDetail) {
    Object.assign(this, data);
    this.redeemDurationValue = data.redeem_duration_value;
    this.redeemDurationUnit = data.redeem_duration_unit;
    this.isRelativeRedeemDate = data.is_relative_redeem_dates;
    this.publicName = data.public_name;
    this.availableFrom = data.available_from;
    this.availableTo = data.available_from;
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
    } catch (err) {
      return new GenericValidationError(err);
    }
  }

  @Query(() => [DirectCashbackDealDetail], { nullable: true })
  public async directCashbackDealDetail(
    @Ctx() ctx: Context,
    @Arg("ref") ref: string,
  ): Promise<DirectCashbackDealDetail> {
    const res = (await ctx.omnipartners.deals.getDirectCashbackDealDetail({
      ref,
    })).data;
    return new DirectCashbackDealDetail(res);
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
    } catch (err) {
      return new GenericValidationError(err);
    }
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
