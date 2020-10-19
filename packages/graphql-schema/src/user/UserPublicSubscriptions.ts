import { IUserUpdateSubscriptionsInput } from "omnipartners";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  ObjectType,
} from "type-graphql";
import { Context } from "../types/Context";
import { GenericError, GenericResult } from "../types/GenericResult";
import { GenericValidationError } from "../types/GenericValidationError";

@InputType()
class UserPublicSubscriptionsUpdateInput {
  @Field(() => [String])
  public subscriptions!: string[];
}

@ObjectType()
class UserPublicSubscriptionsUser {
  @Field(() => [String])
  public subscriptions!: string[];
}

@ObjectType()
class UserPublicSubscriptionsResult extends GenericResult<
  UserPublicSubscriptionsUser
> {
  @Field(() => UserPublicSubscriptionsUser, { nullable: true })
  public result?: UserPublicSubscriptionsUser;
}

@Resolver()
export class UserPublicSubscriptions {
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

  @Query(() => UserPublicSubscriptionsResult, { nullable: true })
  public async userPublicSubscriptions(
    @Ctx() ctx: Context,
    @Arg("publicToken") publicToken: string,
    @Arg("userEmail") userEmail: string,
  ): Promise<UserPublicSubscriptionsResult> {
    const { user_guid } = (
      await ctx.omnipartners.identity.findAccountByPublicToken({
        token: publicToken,
      })
    ).data;

    await this.identify(ctx, user_guid, userEmail);

    try {
      const subscriptions = await ctx.omnipartners.identity.retrieveUserSubscriptions(
        {
          user_guid,
        },
      );

      return new UserPublicSubscriptionsResult({
        result: {
          subscriptions: subscriptions.data.subscriptions,
        },
      });
    } catch (err) {
      return new UserPublicSubscriptionsResult({
        error: new GenericError(err),
      });
    }
  }

  @Mutation(() => GenericValidationError, { nullable: true })
  public async userPublicSubscriptionsUpdate(
    @Ctx() ctx: Context,
    @Arg("publicToken") publicToken: string,
    @Arg("userEmail") userEmail: string,
    @Arg("input")
    input: UserPublicSubscriptionsUpdateInput,
  ): Promise<GenericValidationError | undefined> {
    const { user_guid } = (
      await ctx.omnipartners.identity.findAccountByPublicToken({
        token: publicToken,
      })
    ).data;

    await this.identify(ctx, user_guid, userEmail);

    const data: IUserUpdateSubscriptionsInput = {
      subscriptions: input.subscriptions.join(","),
      user_guid,
    };

    try {
      await ctx.omnipartners.identity.updateSubscriptions(data);
      return;
    } catch (err) {
      return new GenericValidationError(err);
    }
  }
}
