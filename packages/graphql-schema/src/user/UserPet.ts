import {
  IUserPet,
  IUserPetBreedDetail,
  IUserPetPlaceOfPurchase,
} from "omnipartners";
import { Ctx, Field, ObjectType } from "type-graphql";
import { Context } from "..";

@ObjectType()
class UserBreedDetail implements Pick<IUserPetBreedDetail, "name"> {
  @Field()
  public name: string;
}

@ObjectType()
class UserPetPlaceOfPurchase {
  @Field()
  public placeId: string;
  @Field()
  public placeRating: string;
  @Field()
  public placeRatedOn: Date;

  constructor(data: IUserPetPlaceOfPurchase) {
    this.placeId = data.place_id;
    this.placeRating = data.place_rating;
    this.placeRatedOn = data.place_rated_on && new Date(data.place_rated_on);
  }
}
@ObjectType()
export class UserPet
  implements
    Pick<Partial<IUserPet>, "name" | "guid" | "gender" | "neutered" | "breed"> {
  @Field()
  public name: string;

  @Field()
  public guid: string;

  @Field({ nullable: true })
  public dob?: string;

  @Field({ nullable: true })
  public gender?: string;

  @Field()
  public neutered: boolean;

  @Field()
  public type: string;

  @Field()
  public breed: string;

  @Field()
  public breedDetails: UserBreedDetail;

  @Field()
  public hasPicture: boolean;

  @Field()
  public lastUpdated: Date;

  constructor(data: IUserPet) {
    Object.assign(this, data);
    this.dob = data.pet_dob;
    this.type = data.petType;
    this.hasPicture = data.has_picture === "1" ? true : false;
    this.lastUpdated = data.lastUpdated && new Date(data.lastUpdated);
  }

  @Field()
  public pictureUrl(@Ctx() ctx: Context): string {
    return (
      ctx.omnipartners.identity.getPetPictureUrl({
        pet_guid: this.guid,
      }) + `&_cachebuster_=${this.lastUpdated.getTime()}`
    );
  }

  @Field(() => [UserPetPlaceOfPurchase])
  public async placeOfPurchase(
    @Ctx() ctx: Context,
  ): Promise<UserPetPlaceOfPurchase[]> {
    const res =
      (await ctx.omnipartners.identity.retrievePetPlaceOfPurchase({
        pet_guid: this.guid,
      })).data || [];

    return res.map(d => new UserPetPlaceOfPurchase(d));
  }
}
