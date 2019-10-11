import {
  IUser,
  IUserOwner,
  IUserPlaceOfPurchase,
  IUserPreferences,
} from "omnipartners";
import { Arg, Ctx, Field, ObjectType } from "type-graphql";
import { Memoize } from "typescript-memoize";
import { Context } from "..";
import { IUserTokenPayload } from "../lib/UserTokenHelper";
import { LegalForm } from "../metadata/DataLegalFormResolver";
import { UserAddress } from "./UserAddress";
import { UserChild } from "./UserChild";
import { UserPartnerRelations } from "./UserPartnerRelations";
import { UserPet } from "./UserPet";

export interface ILightUser extends Pick<IUser, "owner" | "session_token"> {}

@ObjectType()
class UserOwner {
  @Field()
  public guid: string;
  @Field({ nullable: true })
  public firstName: string;
  @Field({ nullable: true })
  public lastName: string;
  @Field({ nullable: true })
  public email: string;
  @Field({ nullable: true })
  public title: string;
  @Field({ nullable: true })
  public dob: string;
  @Field({ nullable: true })
  public gender: string;
  @Field({ nullable: true })
  public mobilePhone: string;
  @Field({ nullable: true })
  public language: string;
  @Field({ nullable: true })
  public country?: string | null;
  @Field({ nullable: true })
  public postalCode?: string | null;
  @Field()
  public confirmed?: boolean;
  @Field({ nullable: true })
  public customerGroup?: string;

  constructor(data: IUserOwner) {
    Object.assign(this, data);
    this.postalCode = data.zip;
    this.confirmed = !!parseInt(data.user_confirmed, 10);
    this.customerGroup = data.user_customer_group;
  }
}

@ObjectType()
class UserPreferences implements IUserPreferences {
  @Field(() => [String])
  public communicationPreferences: string[];
  @Field(() => [String])
  public interests: string[];
  @Field(() => [String])
  public subscriptions: string[];
}

@ObjectType()
class UserLegalFormsItems {
  @Field()
  public legalForm: LegalForm;
  @Field()
  public confirmed: boolean;
}

@ObjectType()
class UserPlaceOfPurchase implements IUserPlaceOfPurchase {
  @Field()
  public place_id: string;
  @Field()
  public place_rating: string;

  constructor(data: IUserPlaceOfPurchase) {
    Object.assign(this, data);
  }
}

export interface IUserOptions<T = {}> {
  userTokenPayload?: Omit<IUserTokenPayload, "user_guid"> & T;
}

@ObjectType()
export class User<T = {}> {
  @Field(() => UserOwner)
  public owner: UserOwner;

  public readonly data: ILightUser;
  private readonly userTokenPayload: IUserOptions<T>["userTokenPayload"];

  constructor(data: ILightUser, { userTokenPayload }: IUserOptions<T> = {}) {
    this.data = data;
    this.owner = {
      ...data.owner,
      postalCode: data.owner.zip,
      confirmed: !!parseInt(data.owner.user_confirmed, 10),
      customerGroup: data.owner.user_customer_group,
    };
    this.userTokenPayload = userTokenPayload;
  }

  @Field(() => String)
  public async token(@Ctx() ctx: Context): Promise<string> {
    return ctx.userTokenHelper.sign({
      user_guid: this.owner.guid,
      ...this.userTokenPayload,
    });
  }

  @Field(() => [UserPet], { nullable: false })
  public async pets(
    @Ctx() ctx: Context,
    @Arg("dealRef", { nullable: true }) dealRef?: string,
  ): Promise<UserPet[]> {
    const [petsResult, dealPetsResult] = await Promise.all([
      ctx.omnipartners.identity.getPets({
        user_guid: this.owner.guid,
      }),
      dealRef &&
        ctx.omnipartners.deals.listEligiblePets({
          deal_ref: dealRef,
          user_guid: this.owner.guid,
        }),
    ]);

    if (!dealRef) {
      return petsResult.data.map(d => new UserPet(d));
    }

    return dealPetsResult.data
      .map(pet => petsResult.data.find(p => p.guid === pet.pet_guid))
      .filter(Boolean)
      .map(pet => new UserPet(pet));
  }

  @Field(() => [UserAddress], { nullable: false })
  public async addresses(@Ctx() ctx: Context): Promise<UserAddress[]> {
    const res = await ctx.omnipartners.identity.listUserAddress({
      user_guid: this.owner.guid,
    });
    return res.data.map(d => new UserAddress(d));
  }

  @Field(() => UserPreferences, { nullable: false })
  public async preferences(@Ctx() ctx: Context): Promise<UserPreferences> {
    const res = await ctx.omnipartners.identity.retrieveUserSubscriptions({
      user_guid: this.owner.guid,
    });
    return res.data;
  }

  @Field(() => UserLegalForms, { nullable: false })
  public async legalForms(
    @Arg("codes", () => [String], { nullable: true }) codes?: string[],
  ): Promise<UserLegalForms> {
    return new UserLegalForms(codes, this);
  }

  @Field(() => UserPartnerRelations, { nullable: false })
  public async partners(@Ctx() ctx: Context): Promise<UserPartnerRelations> {
    const res = await ctx.omnipartners.identity.getPartnerAccountRelations({
      user_guid: this.owner.guid,
    });
    return new UserPartnerRelations(res.data);
  }

  @Field(() => [UserPlaceOfPurchase], { nullable: false })
  public async placesOfPurchase(
    @Ctx() ctx: Context,
  ): Promise<UserPlaceOfPurchase[]> {
    const res = await ctx.omnipartners.identity.retrieveUserPlacesOfPurchase({
      user_guid: this.owner.guid,
    });

    if (res.data) {
      return res.data.map(d => new UserPlaceOfPurchase(d));
    } else {
      return [];
    }
  }

  @Field(() => [UserChild], { nullable: false })
  public async children(@Ctx() ctx: Context): Promise<UserChild[]> {
    const res = (await ctx.omnipartners.identity.getChildren({
      user_guid: this.owner.guid,
    })).data;

    return res.map(d => new UserChild(d));
  }
}

@ObjectType()
class UserLegalForms {
  private readonly codes: string;
  private readonly user: User;

  constructor(codes: undefined | string[], user: User) {
    this.codes = codes && codes.length ? codes.join(",") : "";
    this.user = user;
  }

  @Field(() => Boolean)
  public async confirmed(@Ctx() ctx: Context): Promise<boolean> {
    const userConfirmedLegalForms = await this.getConfirmedLegalForms(ctx);
    const legalForms = await ctx.omnipartners.metadata.getLegalForms({
      legal_form_codes: this.codes,
    });
    return !legalForms.data.some(
      legal => !userConfirmedLegalForms.includes(legal.code),
    );
  }

  @Field(() => [UserLegalFormsItems])
  public async items(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<UserLegalFormsItems[]> {
    const userConfirmedLegalForms = await this.getConfirmedLegalForms(ctx);
    const legalForms = await ctx.omnipartners.metadata.getLegalForms({
      legal_form_codes: this.codes,
      lang,
    });
    return legalForms.data.map(legalForm => ({
      legalForm,
      confirmed: userConfirmedLegalForms.includes(legalForm.code),
    }));
  }

  @Memoize()
  private async getConfirmedLegalForms(ctx: Context) {
    return (await ctx.omnipartners.identity.getConfirmedLegalForm({
      user_guid: this.user.data.owner.guid,
    })).data.map(legal => legal.legal_form_code);
  }
}
