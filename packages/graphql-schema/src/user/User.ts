import {
  IUser,
  IUserOwner,
  IUserPreferences,
} from "omnipartners";
import { Arg, Ctx, Field, ObjectType } from "type-graphql";
import { Context } from "..";
import { UserAddress } from "./UserAddress";
import { UserPartnerRelations } from "./UserPartnerRelations";
import { UserPet } from "./UserPet";

interface ILightUser extends Pick<IUser, "owner" | "session_token"> {}

@ObjectType()
class UserOwner {
  @Field()
  public guid: string;
  @Field()
  public firstName: string;
  @Field()
  public lastName: string;
  @Field()
  public email: string;
  @Field()
  public title: string;
  @Field({ nullable: true })
  public dob: string;
  @Field()
  public gender: string;
  @Field()
  public mobilePhone: string;
  @Field()
  public language: string;
  @Field({ nullable: true })
  public country?: string | null;
  @Field({ nullable: true })
  public postalCode?: string | null;

  constructor(data: IUserOwner) {
    Object.assign(this, data);
    this.postalCode = data.zip;
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
  @Field(() => String)
  public code: string;
  @Field()
  public label: string;
  @Field()
  public confirmed: boolean;
}

@ObjectType()
export class User {
  @Field(() => UserOwner)
  public owner: UserOwner;

  public readonly data: ILightUser;

  constructor(data: ILightUser) {
    this.data = data;
    this.owner = {
      ...data.owner,
      postalCode: data.owner.zip,
    };
  }

  @Field(() => String)
  public async token(@Ctx() ctx: Context): Promise<string> {
    return ctx.userTokenHelper.sign({
      user_guid: this.owner.guid,
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
    @Ctx() ctx: Context,
    @Arg("codes", () => [String], { nullable: true }) codes?: string[],
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<UserLegalForms> {
    return new UserLegalForms(codes, lang, this);
  }

  @Field(() => UserPartnerRelations, { nullable: false })
  public async partners(@Ctx() ctx: Context): Promise<UserPartnerRelations> {
    const res = await ctx.omnipartners.identity.getPartnerAccountRelations({
      user_guid: this.owner.guid,
    });
    return new UserPartnerRelations(res.data);
  }
}

@ObjectType()
class UserLegalForms {
  private readonly codes: string[];
  private readonly lang: string;
  private readonly user: User;

  constructor(codes: undefined | string[], lang: undefined | string, user: User) {
    this.codes = codes;
    this.lang = lang;
    this.user = user;
  }

  @Field(() => Boolean)
  public async confirmed(@Ctx() ctx: Context): Promise<boolean> {
    const userConfirmedLegalForms = (await ctx.omnipartners.identity.getConfirmedLegalForm(
      {
        user_guid: this.user.data.owner.guid,
      },
    )).data.map(legal => legal.legal_form_code);

    const legalFormsFilter =
      this.codes && this.codes.length ? this.codes.join(",") : "";
    const legalForms = await ctx.omnipartners.metadata.getLegalForms({
      legal_form_codes: legalFormsFilter,
      lang: this.lang,
    });

    return !legalForms.data.some(
      legal => !userConfirmedLegalForms.includes(legal.code),
    );
  }

  @Field(() => [UserLegalFormsItems])
  public async items(@Ctx() ctx: Context): Promise<UserLegalFormsItems[]> {
    const userConfirmedLegalForms = (await ctx.omnipartners.identity.getConfirmedLegalForm(
      {
        user_guid: this.user.data.owner.guid,
      },
    )).data.map(legal => legal.legal_form_code);

    const legalFormsFilter =
      this.codes && this.codes.length ? this.codes.join(",") : "";
    const legalForms = await ctx.omnipartners.metadata.getLegalForms({
      legal_form_codes: legalFormsFilter,
      lang: this.lang,
    });

    return legalForms.data.map(legal => ({
      code: legal.code,
      label: legal.name,
      confirmed: userConfirmedLegalForms.includes(legal.code),
    }));
  }
}
