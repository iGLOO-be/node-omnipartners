import {
  IUserPetBmiEntry,
  IUserPetCreateInput,
  IUserPetWeightEntry,
  IUserPetDietRecommendationEntry,
} from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserPet } from "./UserPet";
import { UserPetUpdateResult } from "./UserPetUpdateResult";
import { userDataOptions } from "./UserResolver";

@InputType()
export class UserPetBmiEntry implements IUserPetBmiEntry {
  @Field()
  public date!: string;

  @Field()
  public bmi!: number;

  @Field({ nullable: true })
  public partner_ext_id?: string;

  @Field()
  public source!: string;
}

@InputType()
export class UserPetWeightEntry implements IUserPetWeightEntry {
  @Field()
  public date!: string;

  @Field()
  public weight!: number;

  @Field({ nullable: true })
  public partner_ext_id?: string;

  @Field()
  public source!: string;
}

@InputType()
export class UserPetDietRecommendationEntry
  implements IUserPetDietRecommendationEntry {
  @Field()
  public creation_date!: string;

  @Field()
  public collection_reference!: string;

  @Field({ nullable: true })
  public expiration_date?: string;

  @Field({ nullable: true })
  public partner_ext_id?: string;

  @Field({ nullable: true })
  public ration?: string;

  @Field({ nullable: true })
  public ration_unit?: string;
}

@InputType()
class UserPetCreateInput {
  @Field()
  public name!: string;

  @Field()
  public type!: string;

  @Field()
  public breed!: string;

  @Field()
  public dob!: string;

  @Field({ nullable: true })
  public neutered?: boolean;

  @Field({ nullable: true })
  public gender?: string;

  @Field({ nullable: true })
  public pictureUrl?: string;

  @Field({ nullable: true })
  public placeOfPurchase!: string;

  @Field({ nullable: true })
  public insured?: boolean;

  @Field({ nullable: true })
  public tattooNumber?: string;

  @Field({ nullable: true })
  public chipNumber?: string;

  @Field(() => UserPetBmiEntry, { nullable: true })
  public bmi!: UserPetBmiEntry;

  @Field(() => UserPetWeightEntry, { nullable: true })
  public weight!: UserPetWeightEntry;

  @Field(() => UserPetDietRecommendationEntry, { nullable: true })
  public dietRecommendation!: UserPetDietRecommendationEntry;
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
    | "chip_number"
    | "pet_insured"
    | "tattoo_number"
  > = {
    pet_name: userPetInput.name,
    pet_type: userPetInput.type,
    pet_breed: userPetInput.breed,
    pet_dob: userPetInput.dob,

    ...(typeof userPetInput.gender !== "undefined" && { pet_gender: userPetInput.gender }),
    ...(typeof userPetInput.tattooNumber !== "undefined" && { chip_number: userPetInput.tattooNumber }),
    ...(typeof userPetInput.chipNumber !== "undefined" && { chip_number: userPetInput.chipNumber }),
  };

  if (typeof userPetInput.neutered !== "undefined") {
    result.pet_neutered = userPetInput.neutered ? "Y" : "N";
  }

  if (typeof userPetInput.insured !== "undefined") {
    result.pet_insured = userPetInput.insured ? "Y" : "N";
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
  pet_insured: "insured",
  chip_number: "chipNumber",
  tattoo_number: "tattooNumber",
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
      const pet = (
        await ctx.omnipartners.identity.createPet({
          ...mapClixrayFields(userPetInput),
          user_guid,
        })
      ).data;
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: userDataOptions,
        user_guid,
      });

      await Promise.all([
        userPetInput.pictureUrl &&
          ctx.omnipartners.identity.updatePetPicture({
            pet_guid: pet.guid,
            pet_picture: {
              value: Buffer.from(userPetInput.pictureUrl, "base64"),
              options: {
                filename: "image.jpg",
              },
            },
          }),
        userPetInput.placeOfPurchase &&
          ctx.omnipartners.identity.updatePetPlaceOfPurchase({
            pet_guid: pet.guid,
            place_id: userPetInput.placeOfPurchase,
            place_rating: "5",
          }),
        userPetInput.bmi &&
          ctx.omnipartners.identity.addPetBmi({
            pet_guid: pet.guid,
            ...userPetInput.bmi,
          }),
        userPetInput.weight &&
          ctx.omnipartners.identity.addPetWeight({
            pet_guid: pet.guid,
            ...userPetInput.weight,
          }),
        userPetInput.dietRecommendation &&
          ctx.omnipartners.identity.addPetDietRecommendation({
            pet_guid: pet.guid,
            ...userPetInput.dietRecommendation,
          }),
      ]);

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
