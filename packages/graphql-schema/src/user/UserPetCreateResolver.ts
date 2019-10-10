import { IUserPetCreateInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserPet } from "./UserPet";
import { UserPetUpdateResult } from "./UserPetUpdateResult";
import { userDataOptions } from "./UserResolver";

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
  public neutered?: boolean;

  @Field({ nullable: true })
  public gender?: string;

  @Field({ nullable: true })
  public pictureUrl?: string;

  @Field({ nullable: true })
  public placeOfPurchase: string;
}

const mapClixrayFields = (userPetInput: UserPetCreateInput) => {
  const result: Pick<
    IUserPetCreateInput,
    | "pet_name"
    | "pet_type"
    | "pet_breed"
    | "pet_dob"
    | "pet_neutered"
    | "pet_gender"
    | "pet_picture"
  > = {
    pet_name: userPetInput.name,
    pet_type: userPetInput.type,
    pet_breed: userPetInput.breed,
    pet_dob: userPetInput.dob,
    pet_gender: userPetInput.gender,
  };

  if (typeof userPetInput.neutered !== "undefined") {
    result.pet_neutered = userPetInput.neutered ? "Y" : "N";
  }

  if (userPetInput.pictureUrl) {
    result.pet_picture = {
      value: Buffer.from(userPetInput.pictureUrl, "base64"),
      options: {
        filename: "foo",
      },
    };
  }

  return result;
};

const fieldsMapping = {
  pet_name: "name",
  pet_type: "type",
  pet_breed: "breed",
  pet_dob: "dob",
  pet_birthday: "dob",
  pet_neutered: "neutered",
  pet_gender: "gender",
  pet_picture: "pictureUrl",
};


@Resolver(() => User)
export class UserPetCreateResolver {
  @Mutation(() => UserPetUpdateResult, { nullable: false })
  public async userPetCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userPetInput") userPetInput: UserPetCreateInput,
  ): Promise<UserPetUpdateResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      const pet = (await ctx.omnipartners.identity.createPet({
        ...mapClixrayFields(userPetInput),
        user_guid,
      })).data;
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: userDataOptions,
        user_guid,
      });
      if (userPetInput.placeOfPurchase) {
        await ctx.omnipartners.identity.updatePetPlaceOfPurchase({
          pet_guid: pet.guid,
          place_id: userPetInput.placeOfPurchase,
          place_rating: "5"
        })
      }

      return new UserPetUpdateResult({
        result: {
          pet: new UserPet(pet),
          user: new User(user),
        },
      });
    } catch (err) {
      return new UserPetUpdateResult({
        error: new GenericValidationError(err, { fieldsMapping }),
      });
    }
  }
}
