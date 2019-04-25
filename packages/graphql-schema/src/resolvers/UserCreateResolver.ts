import { IRegisterUserInput } from "omnipartners";
import { Omit } from "type-fest";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import yn from "yn";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "../types/User";
import { UserUpdateResult } from "../types/UserUpdateResult";
import { dataOptions } from "./UserResolver";

interface IOwnRegisterUserInput extends Omit<IRegisterUserInput, "noPets"> {
  noPets: boolean;
}

@InputType()
class UserCreateInput implements Omit<IOwnRegisterUserInput, "data_options"> {
  // The title code of the user. Please refer <b><a href="/index.php/User_title_list" title="User title list">User title list</a></b> for valid values.
  @Field()
  public user_title: string;
  // The first name of the user.
  // 50 chars
  @Field()
  public user_first_name: string;
  // The last name of the user.
  // 50 chars
  @Field()
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
  @Field()
  public user_country: string;
  // The telephone number of the user.
  @Field({ nullable: true })
  public user_telephone: string;
  // The mobile phone number of the user. It needs to be between 4 and 20 chars long. There is no regex validation. Regex specified in the <b><a href="/index.php/Country_list" title="Country list">Country list</a></b> is for front end information and validation.
  @Field()
  public user_mobile_phone: string;
  // The website of the user.
  // 255 chars
  @Field({ nullable: true })
  public user_website: string;
  // The email address of the user.
  // 90 chars
  @Field()
  public user_email: string;
  // The username of the user. The username should be a unique value. If it's not supplied the value of email will be used.
  // 90 chars
  @Field({ nullable: true })
  public user_username: string;
  // The confirmation status of the user. Valid values will be 0 or 1. Default value is 0. Please refer <b><a href="/index.php/Confirm_User_Accounts" title="Confirm User Accounts">Confirm User Accounts</a></b> for more details.
  @Field({ nullable: true })
  public user_confirmed: string;
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
  @Field()
  public user_password: string;
  // When no password is supplied for the user in the registration request this parameter specifies the method to retrieve a valid password. Valid values are <b>link</b>, <b>password</b> and <b>remoteform</b>. The default value is <b>link</b>. If <b>link</b> is specified the registration confirmation email will contain a link to create a new password. If <b>password</b> is specified the registration confirmation mail will contain a auto generated password for the account. Otherwise the response will contain an additional property called “url”. This property contains a url which a remote site could use to create a new password. Please refer to the <b><a href="/index.php/Update_Password" title="Update Password">Update Password</a></b> page for more details about using this feature.
  @Field({ nullable: true })
  public password_mode: string;
  // The language code of the user’s language. Please refer <b><a href="/index.php/Language_list" title="Language list">Language list</a></b> for valid values.
  @Field()
  public user_language: string;
  // This state whether the user has a pet. If there is no pet 1 should be passed and otherwise 0 should be passed. When noPets = 1 is passed then the account will be created as an active account even if there is a global / key constraint on pets. In other words this parameter allows to bypass the pet constraint for an active account.
  @Field({ nullable: true })
  public noPets: boolean;
  // Required if “noPet” is 0. The name of the pet.
  // 50 chars
  @Field({ nullable: true })
  public pet_name: string;
  // Required if “noPet” is 0. The type of pet. Please refer <b><a href="/index.php/Animal_types_list" title="Animal types list">Animal types list</a></b> for valid values.
  @Field({ nullable: true })
  public pet_type: string;
  // Required if “noPet” is 0 and pet_breed_com_id is not supplied. Please refer <b><a href="/index.php/Animal_breeds_list" title="Animal breeds list">Animal breeds list</a></b> for valid values.
  @Field({ nullable: true })
  public pet_breed: string;
  // Required if “noPet” is 0 and pet_breed is not supplied. Please refer <b><a href="/index.php/Animal_breeds_list" title="Animal breeds list">Animal breeds list</a></b> for valid values. If both pet_breed and pet_breed_com_id are supplied pet_breed_com_id has the priority.
  @Field({ nullable: true })
  public pet_breed_com_id: string;
  // The pedigree name of the pet.
  // 50 chars
  @Field({ nullable: true })
  public pet_pedigreename: string;
  // Required if “noPet” is 0. The date of birth of the pet in the format YYYY-MM-DD.
  @Field({ nullable: true })
  public pet_dob: string;
  // States whether pet date of birth is approximative. Valid values are 0 (no correction), 1 (day is not provided by user) and 2 (day and month are not provided by user). Default value is 0.
  @Field({ nullable: true })
  public pet_dob_approx: string;
  // The gender of the pet. Valid values are “M” and “F”.
  @Field({ nullable: true })
  public pet_gender: string;
  // This state whether pet is neutered or not. Valid values are “Y” and “N”.
  @Field({ nullable: true })
  public pet_neutered: string;
  // The date of vaccination in the format YYYY-MM-DD.
  @Field({ nullable: true })
  public vaccination_date: string;
  // This state whether pet is insured or not. Valid values are “Y” and “N”.
  @Field({ nullable: true })
  public pet_insured: string;
  // The medical conditions for the pet. Multiple values (see metadata page) can be sent mimicking the submission behavior of check boxes in a html form. Please refer <b><a href="/index.php/Animal_medical_conditions_list" title="Animal medical conditions list">Animal medical conditions list</a></b> for valid values.
  @Field({ nullable: true })
  public pet_medical_condition: string;
  // The tattoo number of the pet.
  // 40 chars
  @Field({ nullable: true })
  public tattoo_number: string;
  // The chip number of the pet.
  // 40 chars
  @Field({ nullable: true })
  public chip_number: string;
  // The Kennel Club number of the pet.
  // 40 chars
  @Field({ nullable: true })
  public kc_number: string;
  // The external id of the pet. This should be a unique value.
  // 50 chars
  @Field({ nullable: true })
  public pet_ext_id: string;
  // The communications preferences of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in a html form. Please refer <b><a href="/index.php/Communications_preferences_list" title="Communications preferences list">Communications preferences list</a></b> for valid values.
  @Field({ nullable: true })
  public com_prefs: string;
  // The interests of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in an html form. Please refer <b><a href="/index.php/Interest_list" title="Interest list">Interest list</a></b> for valid values.
  @Field({ nullable: true })
  public interests: string;
  // The subscriptions of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in an html form. Please refer <b><a href="/index.php/Subscriptions_list" title="Subscriptions list">Subscriptions list</a></b> for valid values.
  @Field({ nullable: true })
  public subscriptions: string;
  // The access rights of the user. Multiple values (see metadata page) can be sent mimicking the check boxes in an html form. Please refer <b><a href="/index.php/Access_rights_list" title="Access rights list">Access rights list</a></b> for valid values.
  @Field({ nullable: true })
  public user_access_rights: string;
  // This states whether to send the registration confirmation mail or not. If registration confirmation mail is needed the value should be 1 and otherwise it should be 0. The default value is 1.
  @Field({ nullable: true })
  public send_welcome_mail: string;
  // Stores reference information on the origin of the user. This is used to give more context to the source of the registration. The source is taken automatically from the api key reference.
  // 50 chars
  @Field({ nullable: true })
  public user_origin_details: string;
}

@Resolver(() => User)
export class UserCreateResolver {
  @Mutation(() => UserUpdateResult, { nullable: false })
  public async userCreate(
    @Ctx() ctx: Context,
    @Arg("userInput") userInput: UserCreateInput,
  ): Promise<UserUpdateResult> {
    // Fix clixray boolean parsing
    const data: IRegisterUserInput = {
      ...userInput,
      data_options: dataOptions,
      noPets: yn(userInput.noPets) ? "1" : "0",
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
