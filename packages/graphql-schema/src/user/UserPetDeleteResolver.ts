import {
  IUserPetDeleteInput,
  IUserPetDietRecommendationDeleteInput,
} from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { userDataOptions } from "./UserResolver";
import { UserResult } from "./UserResult";
import { UserPet } from "./UserPet";
import { UserPetUpdateResult } from "./UserPetUpdateResult";

@InputType()
class UserPetDeleteInput {
  @Field()
  public guid!: string;

  @Field()
  public petDeletionCause?: string;
}
@InputType()
class UserPetDeleteDietRecommendationInput
  implements IUserPetDietRecommendationDeleteInput {
  @Field()
  public pet_guid!: string;

  @Field({ nullable: true })
  public creation_date?: string;

  @Field({ nullable: true })
  public collection_reference?: string;

  @Field({ nullable: true })
  public partner_ext_id?: string;

  @Field({ nullable: true })
  public custom_logger_info?: string;
}

const mapClixrayFields = (userPetInput: UserPetDeleteInput) => {
  const result: Pick<IUserPetDeleteInput, "pet_guid" | "pet_deletion_cause"> = {
    pet_guid: userPetInput.guid,
    pet_deletion_cause: userPetInput.petDeletionCause,
  };

  return result;
};

@Resolver(() => User)
export class UserPetDeleteResolver {
  @Mutation(() => UserResult, { nullable: false })
  public async userPetDelete(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userPetDeleteInput") userPetDeleteInput: UserPetDeleteInput,
  ): Promise<UserResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const pet = (
      await ctx.omnipartners.identity.getPet({
        pet_guid: userPetDeleteInput.guid,
      })
    ).data;

    if (pet.pet_owner.user_guid !== user_guid) {
      // TODO: better error
      throw new Error("Not your pet!");
    }

    try {
      await ctx.omnipartners.identity.deletePet(
        mapClixrayFields(userPetDeleteInput),
      );
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: userDataOptions,
        user_guid,
      });

      return new UserResult({
        result: new User(user),
      });
    } catch (err) {
      return new UserResult({
        error: new GenericValidationError(err),
      });
    }
  }
  @Mutation(() => UserPetUpdateResult, { nullable: false })
  public async userPetDeleteDietRecommendation(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userPetDeleteDietrecommendationInput")
    userPetDeleteDietrecommendationInput: UserPetDeleteDietRecommendationInput,
  ): Promise<UserPetUpdateResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const pet = (
      await ctx.omnipartners.identity.getPet({
        pet_guid: userPetDeleteDietrecommendationInput.pet_guid,
      })
    ).data;

    if (pet.pet_owner.user_guid !== user_guid) {
      // TODO: better error
      throw new Error("Not your pet!");
    }

    try {
      await ctx.omnipartners.identity.deletePetDietRecommendation(
        userPetDeleteDietrecommendationInput,
      );
      const updatedPet = (
        await ctx.omnipartners.identity.getPet({
          pet_guid: userPetDeleteDietrecommendationInput.pet_guid,
        })
      ).data;
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
        error: new GenericValidationError(err),
      });
    }
  }
}
