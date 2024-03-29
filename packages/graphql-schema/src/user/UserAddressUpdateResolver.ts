import { IUpdateUserAddressInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserAddress } from "./UserAddress";
import { UserAddressCreateInput } from "./UserAddressCreateResolver";
import { UserAddressUpdateResult } from "./UserAddressUpdateResult";
import { userDataOptions } from "./UserResolver";

@InputType()
class UserAddressUpdateInput extends UserAddressCreateInput {
  @Field()
  public id!: string;
}

const mapClixrayFields = (
  userAddressInput: UserAddressUpdateInput,
): Pick<
  IUpdateUserAddressInput,
  | "address_id"
  | "address_name"
  | "address_streetnum"
  | "address_street1"
  | "address_street2"
  | "address_postal_code"
  | "address_city"
  | "address_country"
  | "address_type"
  | "address_phone"
> => ({
  address_id: userAddressInput.id,
  address_name: userAddressInput.name,
  address_streetnum: userAddressInput.streetnum,
  address_street1: userAddressInput.street1,
  address_street2: userAddressInput.street2,
  address_postal_code: userAddressInput.postalCode,
  address_city: userAddressInput.city,
  address_country: userAddressInput.country,
  address_type: userAddressInput.type,
  address_phone: userAddressInput.phone,
});

const fieldsMapping = {
  address_id: "id",
  address_name: "name",
  address_streetnum: "streetnum",
  address_street1: "street1",
  address_street2: "street2",
  address_postal_code: "postalCode",
  address_city: "city",
  address_country: "country",
  address_type: "type",
  address_phone: "phone",
};

@Resolver(() => User)
export class UserAddressUpdateResolver {
  @Mutation(() => UserAddressUpdateResult, { nullable: false })
  public async userAddressUpdate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userAddressInput") userAddressInput: UserAddressUpdateInput,
  ): Promise<UserAddressUpdateResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      const address = (
        await ctx.omnipartners.identity.updateUserAddress({
          ...mapClixrayFields(userAddressInput),
          user_guid,
        })
      ).data;

      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: userDataOptions,
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
        error: new GenericValidationError(err, { fieldsMapping }),
      });
    }
  }
}
