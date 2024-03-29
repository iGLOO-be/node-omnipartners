import { IRegisterUserAddressInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserAddress } from "./UserAddress";
import { UserAddressUpdateResult } from "./UserAddressUpdateResult";
import { userDataOptions } from "./UserResolver";

@InputType()
export class UserAddressCreateInput {
  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public type?: string;

  @Field({ nullable: true })
  public streetnum?: string;

  @Field({ nullable: true })
  public street1?: string;

  @Field({ nullable: true })
  public street2?: string;

  @Field()
  public postalCode!: string;

  @Field()
  public city!: string;

  @Field({ nullable: true })
  public country?: string;

  @Field({ nullable: true })
  public isDefault?: boolean;

  @Field({ nullable: true })
  public phone?: string;
}

const mapClixrayFields = (
  userAddressInput: UserAddressCreateInput,
): Pick<
  IRegisterUserAddressInput,
  | "address_name"
  | "address_streetnum"
  | "address_street1"
  | "address_street2"
  | "address_postal_code"
  | "address_city"
  | "address_country"
  | "address_is_default"
  | "address_type"
  | "address_phone"
> => ({
  address_name: userAddressInput.name,
  address_streetnum: userAddressInput.streetnum,
  address_street1: userAddressInput.street1,
  address_street2: userAddressInput.street2,
  address_postal_code: userAddressInput.postalCode,
  address_city: userAddressInput.city,
  address_country: userAddressInput.country,
  address_is_default: userAddressInput.isDefault ? "1" : "0",
  address_type: userAddressInput.type,
  address_phone: userAddressInput.phone,
});

const fieldsMapping = {
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
export class UserAddressCreateResolver {
  @Mutation(() => UserAddressUpdateResult, { nullable: false })
  public async userAddressCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userAddressInput") userAddressInput: UserAddressCreateInput,
  ): Promise<UserAddressUpdateResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      const address = (
        await ctx.omnipartners.identity.registerUserAddress({
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
