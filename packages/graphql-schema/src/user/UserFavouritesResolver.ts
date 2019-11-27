import { format } from "date-fns";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
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
  @Mutation(() => GenericValidationError, { nullable: true })
  public async userFavouritesCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userFavouritesCreateInput")
    userFavouritesCreateInput: UserFavouritesCreateInput,
  ): Promise<GenericValidationError | undefined> {
    const { user_guid } = ctx.userTokenHelper.parse(token);

    try {
      await ctx.omnipartners.identity.addUserFavourites({
        ...userFavouritesCreateInput,
        date: format(userFavouritesCreateInput.date, "yyyy-MM-dd"),
        user_guid,
      });

      return;
    } catch (err) {
      return new GenericValidationError(err);
    }
  }
}

export class UserFavouritesDeleteResolver {
  @Mutation(() => GenericValidationError, { nullable: true })
  public async userFavouritesDelete(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("id") id: string,
  ): Promise<GenericValidationError | undefined> {
    const { user_guid } = ctx.userTokenHelper.parse(token);

    try {
      await ctx.omnipartners.identity.deleteUserFavourites({
        content_id: id,
        user_guid,
      });

      return;
    } catch (err) {
      return new GenericValidationError(err);
    }
  }
}
