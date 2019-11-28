import { format } from "date-fns";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserFavouritesResult } from "./UserFavouritesResult";
import { userDataOptions } from "./UserResolver";
@InputType()
export class UserFavouritesCreateInput {
  @Field()
  public date!: Date;

  @Field()
  public type!: string;

  @Field()
  public content!: string;

  @Field()
  public source!: string;
}

export class UserFavouritesCreateResolver {
  @Mutation(() => UserFavouritesResult, { nullable: false })
  public async userFavouritesCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userFavouritesCreateInput")
    userFavouritesCreateInput: UserFavouritesCreateInput,
  ): Promise<UserFavouritesResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);

    try {
      await ctx.omnipartners.identity.addUserFavourites({
        ...userFavouritesCreateInput,
        date: format(userFavouritesCreateInput.date, "yyyy-MM-dd"),
        user_guid,
      });
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: userDataOptions,
        user_guid,
      });

      return new UserFavouritesResult({
        result: {
          user: new User(user),
        },
      });
    } catch (err) {
      return new UserFavouritesResult({
        error: new GenericValidationError(err),
      });
    }
  }
}

export class UserFavouritesDeleteResolver {
  @Mutation(() => UserFavouritesResult, { nullable: false })
  public async userFavouritesDelete(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("id") id: string,
  ): Promise<UserFavouritesResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);

    try {
      await ctx.omnipartners.identity.deleteUserFavourites({
        content_id: id,
        user_guid,
      });
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: userDataOptions,
        user_guid,
      });

      return new UserFavouritesResult({
        result: {
          user: new User(user),
        },
      });
    } catch (err) {
      return new UserFavouritesResult({
        error: new GenericValidationError(err),
      });
    }
  }
}
