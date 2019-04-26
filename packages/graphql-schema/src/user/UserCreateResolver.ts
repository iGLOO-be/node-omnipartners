import { IRegisterUserInput } from "omnipartners";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { dataOptions } from "./UserResolver";
import { UserUpdateResult } from "./UserUpdateResult";

@InputType()
class UserCreateInput {
  // The title code of the user. Please refer <b><a href="/index.php/User_title_list" title="User title list">User title list</a></b> for valid values.
  @Field()
  public title: string;

  // The first name of the user.
  // 50 chars
  @Field()
  public firstName: string;

  // The last name of the user.
  // 50 chars
  @Field()
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
  @Field()
  public mobilePhone: string;

  // The email address of the user.
  // 90 chars
  @Field()
  public email: string;

  // The password of the user. It needs to be at least 5 characters long.
  // 20 chars
  @Field()
  public password: string;

  // The language code of the user’s language. Please refer <b><a href="/index.php/Language_list" title="Language list">Language list</a></b> for valid values.
  @Field()
  public language: string;

  // Stores reference information on the origin of the user. This is used to give more context to the source of the registration. The source is taken automatically from the api key reference.
  // 50 chars
  @Field({ nullable: true })
  public originDetails: string;
}

const userCreateInputToRegisterUserInput = (
  userInput: UserCreateInput,
): Pick<
  IRegisterUserInput,
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
  | "user_origin_details"
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
  user_origin_details: userInput.originDetails
});

@Resolver(() => User)
export class UserCreateResolver {
  @Mutation(() => UserUpdateResult, { nullable: false })
  public async userCreate(
    @Ctx() ctx: Context,
    @Arg("userInput") userInput: UserCreateInput,
  ): Promise<UserUpdateResult> {
    // Fix clixray boolean parsing
    const data: IRegisterUserInput = {
      ...userCreateInputToRegisterUserInput(userInput),
      data_options: dataOptions,
      noPets: "1",
    };
    try {
      const register = await ctx.omnipartners.identity.register(data);
      return new UserUpdateResult({
        result: new User(register.data),
      });
    } catch (err) {
      return new UserUpdateResult({
        error: new GenericValidationError(err),
      });
    }
  }
}
