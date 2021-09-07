import { GraphQLJSON } from "graphql-type-json";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericError } from "../types/GenericResult";
import { User } from "./User";
import { UserResult } from "./UserResult";

@Resolver(() => User)
export class UserLoginByPublicTokenResolver {
  @Query(() => UserResult)
  public async userLoginByPublicToken(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userContextData", () => GraphQLJSON, { nullable: true })
    userContextData?: any,
  ): Promise<UserResult> {
    try {
      const { data } = await ctx.omnipartners.identity.findAccountByPublicToken(
        {
          token,
        },
      );

      const user = await ctx.omnipartners.identity.authenticateByGUID({
        user_guid: data.user_guid,
      });

      return new UserResult({
        result: await ctx.userHelper.createUser(user, userContextData),
      });
    } catch (err) {
      return new UserResult({
        error: new GenericError(err),
      });
    }
  }
}
