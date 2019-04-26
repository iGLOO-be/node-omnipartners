import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { parse } from "../lib/userToken";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserAddress } from "./UserAddress";
import { UserAddressCreateInput } from "./UserAddressCreateResolver";
import { UserAddressUpdateResult } from "./UserAddressUpdateResult";
import { dataOptions } from "./UserResolver";

@InputType()
class UserAddressUpdateInput extends UserAddressCreateInput {
  @Field()
  public address_id: string;
}

@Resolver(() => User)
export class UserAddressUpdateResolver {
  @Mutation(() => UserAddressUpdateResult, { nullable: false })
  public async userAddressUpdate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userAddressInput") userAddressInput: UserAddressUpdateInput,
  ): Promise<UserAddressUpdateResult> {
    const { user_guid } = parse(token);
    try {
      const address = (await ctx.omnipartners.identity.updateUserAddress({
        ...userAddressInput,
        user_guid,
      })).data;

      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: dataOptions,
        user_guid,
      });
      return new UserAddressUpdateResult({
        result: {
          address: new UserAddress(address),
          user: new User(user),
        },
      });
    } catch (err) {
      return new UserAddressUpdateResult({
        error: new GenericValidationError(err),
      });
    }
  }
}
