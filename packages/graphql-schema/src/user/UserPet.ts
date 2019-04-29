import { IUserPet } from "omnipartners";
import { Ctx, Field, ObjectType } from "type-graphql";
import { Context } from "..";

@ObjectType()
export class UserPet implements Partial<IUserPet> {
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
    this.dob = data.pet_dob;
    Object.assign(this, data);
  }

  @Field()
  public pictureUrl(@Ctx() ctx: Context): string {
    return ctx.omnipartners.identity.getPetPictureUrl({
      pet_guid: this.guid
    })
  }
}
