import { IUserPetCreateInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { parse } from "../lib/userToken";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserPet } from "./UserPet";
import { UserPetUpdateResult } from "./UserPetUpdateResult";
import { dataOptions } from "./UserResolver";

@InputType()
class UserPetCreateInput {
  @Field()
  public name: string;

  @Field()
  public type: string;

  @Field()
  public breed: string;

  @Field()
  public dob: string;

  @Field({ nullable: true })
  public neutered?: string;

  @Field({ nullable: true })
  public gender?: string;

  @Field({ nullable: true })
  public picture?: string;
}

const mapClixrayFields = (
  userPetInput: UserPetCreateInput,
): Pick<
  IUserPetCreateInput,
  | "pet_name"
  | "pet_type"
  | "pet_breed"
  | "pet_dob"
  | "pet_neutered"
  | "pet_gender"
  | "pet_picture"
> => ({
  pet_name: userPetInput.name,
  pet_type: userPetInput.type,
  pet_breed: userPetInput.breed,
  pet_dob: userPetInput.dob,
  pet_neutered: userPetInput.neutered,
  pet_gender: userPetInput.gender,
  pet_picture: userPetInput.picture,
});

@Resolver(() => User)
export class UserPetCreateResolver {
  @Mutation(() => UserPetUpdateResult, { nullable: false })
  public async userPetCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userPetInput") userPetInput: UserPetCreateInput,
  ): Promise<UserPetUpdateResult> {
    const { user_guid } = parse(token);
    try {
      const pet = (await ctx.omnipartners.identity.createPet({
        ...mapClixrayFields(userPetInput),
        user_guid,
      })).data;
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: dataOptions,
        user_guid,
      });
      return new UserPetUpdateResult({
        result: {
          pet: new UserPet(pet),
          user: new User(user),
        },
      });
    } catch (err) {
      return new UserPetUpdateResult({
        error: new GenericValidationError(err),
      });
    }
  }
}
