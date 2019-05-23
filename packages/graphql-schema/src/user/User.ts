import { IUser, IUserOwner, IUserPreferences } from "omnipartners";
import { Arg, Ctx, Field, ObjectType } from "type-graphql";
import { Context } from "..";
import { UserAddress } from "./UserAddress";
import { UserPartnerRelations } from "./UserPartnerRelations";
import { UserPet } from "./UserPet";

interface ILightUser extends Pick<IUser, "owner" | "session_token"> {}

@ObjectType()
class UserOwner
  implements
    Pick<
      IUserOwner,
      | "firstName"
      | "lastName"
      | "email"
      | "guid"
      | "title"
      | "dob"
      | "gender"
      | "mobilePhone"
      | "language"
    > {
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
export class User {
  @Field(() => UserOwner)
  public owner: UserOwner;

  public readonly data: ILightUser;

  constructor(data: ILightUser) {
    this.data = data;
    this.owner = data.owner;
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
  public async preferences(@Ctx() ctx: Context): Promise<IUserPreferences> {
    const res = await ctx.omnipartners.identity.retrieveUserSubscriptions({
      user_guid: this.owner.guid,
    });
    return res.data;
  }

  @Field(() => UserPartnerRelations, { nullable: false })
  public async partners(@Ctx() ctx: Context): Promise<UserPartnerRelations> {
    const res = await ctx.omnipartners.identity.getPartnerAccountRelations({
      user_guid: this.owner.guid,
    });
    return new UserPartnerRelations(res.data);
  }
}
