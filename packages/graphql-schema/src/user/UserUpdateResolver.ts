import { IUpdateUserInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { dataOptions } from "./UserResolver";
import { UserUpdateResult } from "./UserUpdateResult";

@InputType()
class UserUpdateInput {
  // The title code of the user. Please refer <b><a href="/index.php/User_title_list" title="User title list">User title list</a></b> for valid values.
  @Field({ nullable: true })
  public title: string;

  // The first name of the user.
  // 50 chars
  @Field({ nullable: true })
  public firstName: string;

  // The last name of the user.
  // 50 chars
  @Field({ nullable: true })
  public lastName: string;

  // The date of birth of the user.
  @Field({ nullable: true })
  public dob: string;

  // The gender of the user. Valid values are "M" for male and "F" for female.
  @Field({ nullable: true })
  public gender: string;

  // The telephone number of the user.
  @Field({ nullable: true })
  public telephone: string;

  // The mobile phone number of the user. It needs to be between 4 and 20 chars long. There is no regex validation. Regex specified in the <b><a href="/index.php/Country_list" title="Country list">Country list</a></b> is for front end information and validation.
  @Field({ nullable: true })
  public mobilePhone: string;

  // The email address of the user.
  // 90 chars
  @Field({ nullable: true })
  public email: string;

  // The password of the user. It needs to be at least 5 characters long.
  // 20 chars
  @Field({ nullable: true })
  public password: string;

  // The language code of the user’s language. Please refer <b><a href="/index.php/Language_list" title="Language list">Language list</a></b> for valid values.
  @Field({ nullable: true })
  public language: string;

  @Field()
  public country: string;

  @Field()
  public postalCode: string;
}

const mapClixrayFields = (
  userInput: UserUpdateInput,
): Pick<
  IUpdateUserInput,
  | "user_title"
  | "user_first_name"
  | "user_last_name"
  | "user_dob"
  | "user_gender"
  | "user_telephone"
  | "user_mobile_phone"
  | "user_email"
  | "user_password"
  | "user_language"
  | "user_postal_code"
  | "user_country"
> => ({
  user_title: userInput.title,
  user_first_name: userInput.firstName,
  user_last_name: userInput.lastName,
  user_dob: userInput.dob,
  user_gender: userInput.gender,
  user_telephone: userInput.telephone,
  user_mobile_phone: userInput.mobilePhone,
  user_email: userInput.email,
  user_password: userInput.password,
  user_language: userInput.language,
  user_postal_code: userInput.postalCode,
  user_country: userInput.country,
});

@Resolver(() => User)
export class UserUpdateResolver {
  @Mutation(() => UserUpdateResult, { nullable: false })
  public async userUpdate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userInput") userInput: UserUpdateInput,
  ): Promise<UserUpdateResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const data: IUpdateUserInput = {
      ...mapClixrayFields(userInput),
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
