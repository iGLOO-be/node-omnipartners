import {
  IUserPet,
  IUserPetBmiEntry,
  IUserPetBreedDetail,
  IUserPetPlaceOfPurchase,
  IUserPetWeightEntry,
} from "omnipartners";
import { Ctx, Field, ObjectType } from "type-graphql";
import { Context } from "..";

@ObjectType()
class UserBreedDetail {
  @Field()
  public name!: string;

  @Field()
  public universeId!: string;

  constructor(data: IUserPetBreedDetail) {
    Object.assign(this, data);
    this.universeId = data.universe_id;
  }
}

@ObjectType()
class UserPetPlaceOfPurchase {
  @Field()
  public placeId: string;
  @Field()
  public placeRating: string;
  @Field({ nullable: true })
  public placeRatedOn?: Date;

  constructor(data: IUserPetPlaceOfPurchase) {
    this.placeId = data.place_id;
    this.placeRating = data.place_rating;
    this.placeRatedOn = data.place_rated_on
      ? new Date(data.place_rated_on)
      : undefined;
  }
}

@ObjectType()
class UserPetWeight {
  @Field()
  public weight!: string;

  constructor(data: IUserPetWeightEntry) {
    Object.assign(this, data);
  }
}

@ObjectType()
class UserPetBmi {
  @Field()
  public bmi!: string;

  @Field()
  public date!: string;

  constructor(data: IUserPetBmiEntry) {
    Object.assign(this, data);
  }
}
@ObjectType()
export class UserPet
  implements
    Pick<Partial<IUserPet>, "name" | "guid" | "gender" | "neutered" | "breed"> {
  @Field()
  public name!: string;

  @Field()
  public guid!: string;

  @Field({ nullable: true })
  public dob?: string;

  @Field({ nullable: true })
  public gender?: string;

  @Field()
  public neutered!: boolean;

  @Field()
  public type: string;

  @Field()
  public breed!: string;

  @Field()
  public profileCompletion: number;

  @Field({ nullable: true })
  public declarativeProduct?: string;

  @Field()
  public breedDetails!: UserBreedDetail;

  @Field()
  public hasPicture: boolean;

  @Field({ nullable: true })
  public lastUpdated?: Date;

  @Field({ nullable: true })
  public lifeStyle?: string;

  constructor(data: IUserPet) {
    Object.assign(this, data);
    this.dob = data.pet_dob;
    this.type = data.petType;
    this.hasPicture = Boolean(parseInt(data.has_picture, 10));
    this.profileCompletion = parseInt(data.profile_completion, 10) || 0;
    this.declarativeProduct = data.pet_declarative_product;
    this.lastUpdated = data.lastUpdated
      ? new Date(data.lastUpdated)
      : undefined;
    this.breedDetails = new UserBreedDetail(data.breedDetails);
    this.lifeStyle = data.pet_lifestyle ? data.pet_lifestyle : undefined;
  }

  @Field()
  public pictureUrl(@Ctx() ctx: Context): string {
    return (
      ctx.omnipartners.identity.getPetPictureUrl({
        pet_guid: this.guid,
      }) +
      `&_cachebuster_=${this.lastUpdated ? this.lastUpdated.getTime() : ""}`
    );
  }

  @Field()
  public customPictureUrl(@Ctx() ctx: Context): string {
    if (this.type && !this.hasPicture) {
      if (this.type === "CAT") {
        return "https://node-omnipartners-public-assets.s3-eu-west-1.amazonaws.com/avatars/Cat.png";
      }

      if (this.type === "DOG") {
        return "https://node-omnipartners-public-assets.s3-eu-west-1.amazonaws.com/avatars/Dog.png";
      }
    }

    return this.pictureUrl(ctx);
  }

  @Field(() => [UserPetPlaceOfPurchase])
  public async placeOfPurchase(
    @Ctx() ctx: Context,
  ): Promise<UserPetPlaceOfPurchase[]> {
    const res =
      (
        await ctx.omnipartners.identity.retrievePetPlaceOfPurchase({
          pet_guid: this.guid,
        })
      ).data || [];

    return res.map(d => new UserPetPlaceOfPurchase(d));
  }

  @Field(() => [UserPetWeight])
  public async weightSeries(@Ctx() ctx: Context): Promise<UserPetWeight[]> {
    const res =
      (
        await ctx.omnipartners.identity.getPetWeight({
          pet_guid: this.guid,
        })
      ).data || [];

    return res.map(d => new UserPetWeight(d));
  }

  @Field(() => [UserPetBmi])
  public async bmiSeries(@Ctx() ctx: Context): Promise<UserPetBmi[]> {
    const res =
      (
        await ctx.omnipartners.identity.getPetBmi({
          pet_guid: this.guid,
        })
      ).data || [];

    return res.map(d => new UserPetBmi(d));
  }
}
