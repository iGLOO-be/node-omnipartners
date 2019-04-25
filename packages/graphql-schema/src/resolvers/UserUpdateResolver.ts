import { IUpdateUserInput } from "omnipartners";
import { Omit } from "type-fest";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { parse } from "../lib/userToken";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "../types/User";
import { UserUpdateResult } from "../types/UserUpdateResult";
import { dataOptions } from "./UserResolver";

@InputType()
class UserUpdateInput implements Omit<IUpdateUserInput, "user_guid"> {
  // The title code of the user. Please refer <b><a href="/index.php/User_title_list" title="User title list">User title list</a></b> for valid values.
  @Field({ nullable: true })
  public user_title: string;
  // The first name of the user.
  // 50 chars
  @Field({ nullable: true })
  public user_first_name: string;
  // The last name of the user.
  // 50 chars
  @Field({ nullable: true })
  public user_last_name: string;
  // The date of birth of the user.
  @Field({ nullable: true })
  public user_dob: string;
  // The gender of the user. Valid values are "M" for male and "F" for female.
  @Field({ nullable: true })
  public user_gender: string;
  // Part of the user’s address.
  // 20 chars
  @Field({ nullable: true })
  public user_streetnum: string;
  // Part of the user’s address.
  // 100 chars
  @Field({ nullable: true })
  public user_street1: string;
  // Part of the user’s address.
  // 100 chars
  @Field({ nullable: true })
  public user_street2: string;
  // Latitude of the geo location associated to the user's address.
  @Field({ nullable: true })
  public user_lat: string;
  // Longitude of the geo location associated to the user's address.
  @Field({ nullable: true })
  public user_lng: string;
  // Post code that comes along with the address.
  // 15 chars
  @Field({ nullable: true })
  public user_postal_code: string;
  // City that comes along with the address.
  // 100 chars
  @Field({ nullable: true })
  public user_city: string;
  // County that comes along with the address. Please refer <b><a href="/index.php/County_list" title="County list">County list</a></b> for valid values. Since county is dependent on country when updating the county it's advisable to supply the country as well to preserve the correctness of the information
  @Field({ nullable: true })
  public user_county: string;
  // Country that comes along with the address. Please refer <b><a href="/index.php/Country_list" title="Country list">Country list</a></b> for valid values.
  @Field({ nullable: true })
  public user_country: string;
  // The telephone number of the user.
  @Field({ nullable: true })
  public user_telephone: string;
  // The mobile phone number of the user. It needs to be between 4 and 20 chars long. There is no regex validation. Regex specified in the <b><a href="/index.php/Country_list" title="Country list">Country list</a></b> is for front end information and validation.
  @Field({ nullable: true })
  public user_mobile_phone: string;
  // The website of the user.
  // 255 chars
  @Field({ nullable: true })
  public user_website: string;
  // The email address of the user.
  // 90 chars
  @Field({ nullable: true })
  public user_email: string;
  // The username of the user. The username should be a unique value. If it's not supplied the value of email will be used.
  // 90 chars
  @Field({ nullable: true })
  public user_username: string;
  // The external id of the user. This should be a unique value.
  // 50 chars
  @Field({ nullable: true })
  public user_ext_id: string;
  // National id of the user.
  // 20 chars
  @Field({ nullable: true })
  public user_national_id: string;
  // The facebook id of the user. This should be a unique value.
  // 50 chars
  @Field({ nullable: true })
  public user_facebook_id: string;
  // The password of the user. It needs to be at least 5 characters long.
  // 20 chars
  @Field({ nullable: true })
  public user_password: string;
  // The language code of the user’s language. Please refer <b><a href="/index.php/Language_list" title="Language list">Language list</a></b> for valid values.
  @Field({ nullable: true })
  public user_language: string;
}

@Resolver(() => User)
export class UserUpdateResolver {
  @Mutation(() => UserUpdateResult, { nullable: false })
  public async userUpdate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userInput") userInput: UserUpdateInput,
  ): Promise<UserUpdateResult> {
    const { user_guid } = parse(token);
    const data: IUpdateUserInput = {
      ...userInput,
      user_guid,
    };
    try {
      await ctx.omnipartners.identity.update(data);
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: dataOptions,
        user_guid,
      });
      return new UserUpdateResult({
        result: new User(user),
      });
    } catch (err) {
      return new UserUpdateResult({
        error: new GenericValidationError(err),
      });
    }
  }
}
