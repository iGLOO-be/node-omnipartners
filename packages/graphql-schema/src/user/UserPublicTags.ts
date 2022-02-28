import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericError, GenericResult } from "../types/GenericResult";

@ObjectType()
class UserPublicTagsUser {
  @Field(() => [String])
  public tags!: string[];
}

@ObjectType()
class UserPublicTagsResult extends GenericResult<UserPublicTagsUser> {
  @Field(() => UserPublicTagsUser, { nullable: true })
  public result?: UserPublicTagsUser;
}

@Resolver()
export class UserPublicTags {
  private async identify(ctx: Context, userGuid: string, userEmail: string) {
    try {
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        user_guid: userGuid,
      });
      if (user.owner.email !== userEmail) {
        throw new Error();
      }
    } catch (err) {
      throw new Error("Invalid user_guid or email.");
    }
  }

  @Query(() => UserPublicTagsResult, { nullable: true })
  public async userPublicTags(
    @Ctx() ctx: Context,
    @Arg("publicToken") publicToken: string,
    @Arg("userEmail") userEmail: string,
  ): Promise<UserPublicTagsResult> {
    const { user_guid } = (
      await ctx.omnipartners.identity.findAccountByPublicToken({
        token: publicToken,
      })
    ).data;

    await this.identify(ctx, user_guid, userEmail);

    try {
      const tags = await ctx.omnipartners.identity.getUserTags({
        user_guid,
      });

      return new UserPublicTagsResult({
        result: {
          tags: tags.data,
        },
      });
    } catch (err) {
      return new UserPublicTagsResult({
        error: new GenericError(err),
      });
    }
  }
}
