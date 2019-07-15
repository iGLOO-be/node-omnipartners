import { IUserPet, IUserPetBreedDetail } from "omnipartners";
import { Ctx, Field, ObjectType } from "type-graphql";
import { Context } from "..";

@ObjectType()
class UserBreedDetail implements Pick<IUserPetBreedDetail, "name"> {
  @Field()
  public name: string;
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

  constructor(data: IUserPet) {
    Object.assign(this, data);
    this.dob = data.pet_dob;
    this.type = data.petType;
    this.hasPicture = data.has_picture === "1" ? true : false ;
  }

  @Field()
  public pictureUrl(@Ctx() ctx: Context): string {
    return ctx.omnipartners.identity.getPetPictureUrl({
      pet_guid: this.guid,
    });
  }
}
