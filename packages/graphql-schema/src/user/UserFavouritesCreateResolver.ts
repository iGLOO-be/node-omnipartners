import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";

@InputType()
export class UserFavouritesCreateInput {
  @Field()
  public date!: string;

  @Field()
  public type!: string;

  @Field()
  public content!: string;

  @Field()
  public source!: string;
}

@Resolver(() => User)
export class UserFavouritesCreateResolver {
  @Mutation(() => GenericValidationError, { nullable: true })
  public async userFavouritesCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userFavouriteInput") userFavouriteInput: UserFavouritesCreateInput,
  ): Promise<GenericValidationError | undefined> {
    const { user_guid } = ctx.userTokenHelper.parse(token);

    try {
      await ctx.omnipartners.identity.addUserFavourites({
        ...userFavouriteInput,
        user_guid,
      });

      return;
    } catch (err) {
      return new GenericValidationError(err);
    }
  }
}
