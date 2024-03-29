import { IUserPetUpdateInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserPet, userPetDataOptions } from "./UserPet";
import {
  UserPetBmiEntry,
  UserPetWeightEntry,
  UserPetDietRecommendationEntry,
} from "./UserPetCreateResolver";
import { UserPetUpdateResult } from "./UserPetUpdateResult";
import { userDataOptions } from "./UserResolver";

@InputType()
class UserPetUpdateInput {
  @Field()
  public guid!: string;

  @Field()
  public name!: string;

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
  public placeOfPurchase?: string;

  @Field(() => UserPetBmiEntry, { nullable: true })
  public bmi?: UserPetBmiEntry;

  @Field(() => UserPetWeightEntry, { nullable: true })
  public weight?: UserPetWeightEntry;

  @Field({ nullable: true })
  public lifestyle?: string;

  @Field(() => [String], { nullable: true })
  public specialNeeds?: string[] | string;

  @Field({ nullable: true, deprecationReason: "Prefer diet recommendation" })
  public declarativeProduct?: string;

  @Field(() => UserPetDietRecommendationEntry, { nullable: true })
  public dietRecommendation?: UserPetDietRecommendationEntry;

  @Field(() => [String], { nullable: true })
  public medicalConditions?: string[] | string;
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
    | "pet_lifestyle"
    | "pet_special_needs"
    | "pet_declarative_product"
    | "pet_medical_condition"
  > = {
    pet_guid: userPetInput.guid,
    pet_name: userPetInput.name,
    pet_type: userPetInput.type,
    pet_breed: userPetInput.breed,
    pet_dob: userPetInput.dob,
    pet_gender: userPetInput.gender,
    pet_lifestyle: userPetInput.lifestyle,
    pet_declarative_product: userPetInput.declarativeProduct,
    pet_medical_condition:
      typeof userPetInput.medicalConditions === "string"
        ? userPetInput.medicalConditions
        : userPetInput.medicalConditions?.join(","),
    pet_special_needs:
      typeof userPetInput.specialNeeds === "string"
        ? userPetInput.specialNeeds
        : userPetInput.specialNeeds?.join(","),
  };

  if (typeof userPetInput.neutered !== "undefined") {
    result.pet_neutered = userPetInput.neutered ? "Y" : "N";
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
  pet_lifestyle: "lifeStyle",
  pet_declarative_product: "declarativeProduct",
  pet_medical_condition: "medicalCondition",
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
      const pet = (
        await ctx.omnipartners.identity.getPet({
          pet_guid: userPetInput.guid,
          data_options: userPetDataOptions,
        })
      ).data;

      if (pet.pet_owner.user_guid !== user_guid) {
        // TODO: better error
        throw new Error("Not your pet!");
      }

      const updatedPet = (
        await ctx.omnipartners.identity.updatePet(
          mapClixrayFields({
            ...userPetInput,
            guid: userPetInput.guid || pet.guid,
            name: userPetInput.name || pet.name,
            breed: userPetInput.breed || pet.breed || "",
            dob: userPetInput.dob || pet.pet_dob,
            gender: userPetInput.gender || pet.gender,
            type: userPetInput.type || pet.type,
            neutered: userPetInput.neutered,
            lifestyle: userPetInput.lifestyle || pet.pet_lifestyle || "",
            declarativeProduct:
              userPetInput.declarativeProduct ||
              pet.pet_declarative_product ||
              "",
            medicalConditions:
              userPetInput.medicalConditions ||
              pet.medicalConditions
                .map((condition) => condition.code)
                .join(",") ||
              "",
            specialNeeds:
              userPetInput.specialNeeds ||
              (pet.pet_special_needs &&
                pet.pet_special_needs.map((need) => need.code).join(",")) ||
              "",
          }),
        )
      ).data;

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

      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: userDataOptions,
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
