import { IUserPet } from "omnipartners";
import { Ctx, Field, ObjectType } from "type-graphql";
import { Context } from "..";

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

  constructor(data: IUserPet) {
    Object.assign(this, data);
    this.dob = data.pet_dob;
    this.type = data.petType;
  }

  @Field()
  public pictureUrl(@Ctx() ctx: Context): string {
    return ctx.omnipartners.identity.getPetPictureUrl({
      pet_guid: this.guid,
    });
  }
}
