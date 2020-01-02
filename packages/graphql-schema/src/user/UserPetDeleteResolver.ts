import { IUserPetDeleteInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { userDataOptions } from "./UserResolver";
import { UserResult } from "./UserResult";

@InputType()
class UserPetDeleteInput {
  @Field()
  public guid!: string;

  @Field()
  public petDeletionCause?: string;
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
}
