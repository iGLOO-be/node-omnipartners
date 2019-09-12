import { IUserPetUpdateInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserPet } from "./UserPet";
import { UserPetUpdateResult } from "./UserPetUpdateResult";
import { dataOptions } from "./UserResolver";

@InputType()
class UserPetUpdateInput {
  @Field()
  public guid: string;

  @Field()
  public name: string;

  @Field({ nullable: true })
  public type?: string;

  @Field({ nullable: true })
  public breed?: string;

  @Field({ nullable: true })
  public dob?: string;

  @Field({ nullable: true })
  public gender?: string;

  @Field({ nullable: true })
  public neutered?: boolean;

  @Field({ nullable: true })
  public pictureUrl?: string;

  @Field({ nullable: true })
  public placeOfPurchase: string;
}

const mapClixrayFields = (userPetInput: UserPetUpdateInput) => {
  const result: Pick<
    IUserPetUpdateInput,
    | "pet_guid"
    | "pet_name"
    | "pet_type"
    | "pet_breed"
    | "pet_dob"
    | "pet_gender"
    | "pet_neutered"
    | "pet_picture"
  > = {
    pet_guid: userPetInput.guid,
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
  pet_guid: "guid",
  pet_name: "name",
  pet_type: "type",
  pet_breed: "breed",
  pet_dob: "dob",
  pet_birthday: "dob",
  pet_gender: "gender",
  pet_neutered: "neutered",
  pet_picture: "pictureUrl",
};

@Resolver(() => User)
export class UserPetUpdateResolver {
  @Mutation(() => UserPetUpdateResult, { nullable: false })
  public async userPetUpdate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userPetInput") userPetInput: UserPetUpdateInput,
  ): Promise<UserPetUpdateResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      const pet = (await ctx.omnipartners.identity.getPet({
        pet_guid: userPetInput.guid,
      })).data;

      if (pet.pet_owner.user_guid !== user_guid) {
        // TODO: better error
        throw new Error("Not your pet!");
      }

      const updatedPet = (await ctx.omnipartners.identity.updatePet(
        mapClixrayFields(userPetInput),
      )).data;

      if (userPetInput.placeOfPurchase) {
        await ctx.omnipartners.identity.updatePetPlaceOfPurchase({
          pet_guid: pet.guid,
          place_id: userPetInput.placeOfPurchase,
          place_rating: "5",
        });
      }

      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: dataOptions,
        user_guid,
      });
      return new UserPetUpdateResult({
        result: {
          pet: new UserPet(updatedPet),
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
