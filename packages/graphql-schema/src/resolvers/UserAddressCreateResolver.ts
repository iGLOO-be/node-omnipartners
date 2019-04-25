import { IRegisterUserAddressInput } from "omnipartners";
import { Omit } from "type-fest";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { parse } from "../lib/userToken";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "../types/User";
import { UserAddress } from "../types/UserAddress";
import { UserAddressUpdateResult } from "../types/UserAddressUpdateResult";
import { dataOptions } from "./UserResolver";

@InputType()
export class UserAddressCreateInput implements Omit<IRegisterUserAddressInput, "user_guid"> {
  @Field({ nullable: true })
  public address_type?: string;
  @Field({ nullable: true })
  public address_name?: string;
  @Field({ nullable: true })
  public address_company?: string;
  @Field({ nullable: true })
  public address_phone?: string;
  @Field({ nullable: true })
  public address_streetnum?: string;
  @Field({ nullable: true })
  public address_street1?: string;
  @Field({ nullable: true })
  public address_street2?: string;
  @Field()
  public address_postal_code: string;
  @Field()
  public address_city: string;
  @Field({ nullable: true })
  public address_region?: string;
  @Field({ nullable: true })
  public address_county?: string;
  @Field({ nullable: true })
  public address_country?: string;
  @Field({ nullable: true })
  public address_comment?: string;
  @Field({ nullable: true })
  public address_is_default?: string;
  @Field({ nullable: true })
  public address_lat?: string;
  @Field({ nullable: true })
  public address_lng?: string;
}

@Resolver(() => User)
export class UserAddressCreateResolver {
  @Mutation(() => UserAddressUpdateResult, { nullable: false })
  public async userAddressCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userAddressInput") userAddressInput: UserAddressCreateInput,
  ): Promise<UserAddressUpdateResult> {
    const { user_guid } = parse(token);
    try {
      const address = (await ctx.omnipartners.identity.registerUserAddress({
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
