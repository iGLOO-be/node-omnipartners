import {
  IUserConfirmLegalFormsInput,
  IUserDataOptions,
  IUserUpdatePlacesOfPurchaseInput,
  IUserUpdateSubscriptionsInput,
} from "omnipartners";
import { Omit } from "type-fest";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "../types/Context";
import { GenericError, handleGeneric } from "../types/GenericResult";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserResult } from "./UserResult";

export const dataOptions: IUserDataOptions = [
  "-pet_details",
  "-preferences",
  "-loyalty_cards",
  "-access_rights",
];

@InputType()
class UserConfirmLegalFormsInput
  implements
    Omit<IUserConfirmLegalFormsInput, "user_guid" | "legal_form_code"> {
  @Field(() => [String])
  public legal_form_code: string | string[];
  @Field()
  public confirmed_place: string;
  @Field({ nullable: true })
  public send_notification?: string;
  @Field({ nullable: true })
  public signature?: string;
}

@InputType()
class UserUpdatePlacesOfPurchaseInput
  implements Omit<IUserUpdatePlacesOfPurchaseInput, "user_guid"> {
  @Field()
  public place_id: string;

  @Field({ nullable: true })
  public place_rating: string;
}

@InputType()
class UserUpdateSubscriptionsInput
  implements
    Omit<IUserUpdateSubscriptionsInput, "user_guid" | "subscriptions"> {
  @Field({ nullable: true })
  public com_prefs?: string;
  @Field({ nullable: true })
  public interests?: string;
  @Field(() => [String], { nullable: true })
  public subscriptions?: string | string[];
}

@Resolver(() => User)
export class UserResolver {
  @Query(() => UserResult, { nullable: true })
  public async user(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
  ): Promise<UserResult> {
    try {
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        user_guid: ctx.userTokenHelper.parse(token).user_guid,
        data_options: dataOptions,
      });

      return new UserResult({
        result: new User(user),
      });
    } catch (err) {
      return new UserResult({
        error: new GenericError(err),
      });
    }
  }

  @Query(() => UserResult, { nullable: true })
  public async userLogin(
    @Ctx() ctx: Context,
    @Arg("identifier") identifier: string,
    @Arg("password") password: string,
  ): Promise<UserResult> {
    return handleGeneric(
      User,
      UserResult,
      ctx.omnipartners.identity.authenticate({
        data_options: dataOptions,
        identifier,
        password,
      }),
    );
  }

  @Query(() => Boolean, { nullable: false })
  public async userEmailExists(
    @Ctx() ctx: Context,
    @Arg("email") email: string,
  ): Promise<boolean> {
    try {
      await ctx.omnipartners.identity.findAccountByEmail({
        email,
      });
    } catch (err) {
      if (err.isOmnipartnersError && err.code === "OP/OPStatusError/3") {
        return false;
      }
      throw err;
    }
    return true;
  }

  @Query(() => String)
  public async userCreateAuthCode(
    @Ctx() ctx: Context,
    @Arg("type") type: "mobile" | "email",
    @Arg("value") value: string,
    @Arg("ttl") ttl: number,
  ): Promise<string> {
    try {
      await ctx.omnipartners.identity.createAuthCode({
        type,
        value,
        ttl,
      });
    } catch (err) {
      throw err;
    }
    return "";
  }

  @Query(() => UserResult, { nullable: true })
  public async userLoginByCode(
    @Ctx() ctx: Context,
    @Arg("auth_code") auth_code: string,
  ): Promise<UserResult> {
    return handleGeneric(
      User,
      UserResult,
      ctx.omnipartners.identity.authenticateByCode({
        auth_code,
        data_options: dataOptions,
      }),
    );
  }

  @Mutation(() => GenericError, { nullable: true })
  public async userRecoverPassword(
    @Ctx() ctx: Context,
    @Arg("email") email: string,
  ): Promise<GenericError | undefined> {
    try {
      await ctx.omnipartners.identity.recoverPassword({
        uid: email,
      });
    } catch (err) {
      return new GenericError(err);
    }
  }

  @Mutation(() => GenericValidationError, { nullable: true })
  public async userConfirmLegalForms(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("confirmLegalFormsInput")
    confirmLegalFormsInput: UserConfirmLegalFormsInput,
  ): Promise<GenericValidationError | undefined> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      await ctx.omnipartners.identity.confirmLegalForm({
        ...confirmLegalFormsInput,
        legal_form_code: Array.isArray(confirmLegalFormsInput.legal_form_code)
          ? confirmLegalFormsInput.legal_form_code.join(",")
          : confirmLegalFormsInput.legal_form_code,
        user_guid,
      });
    } catch (err) {
      return new GenericValidationError(err);
    }
  }

  @Mutation(() => GenericValidationError, { nullable: true })
  public async userUpdateSubscriptions(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("updateSubscriptionsInput")
    updateSubscriptionsInput: UserUpdateSubscriptionsInput,
  ): Promise<GenericValidationError | undefined> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const data: IUserUpdateSubscriptionsInput = {
      ...updateSubscriptionsInput,
      subscriptions: Array.isArray(updateSubscriptionsInput.subscriptions)
        ? updateSubscriptionsInput.subscriptions.join(",")
        : updateSubscriptionsInput.subscriptions,
      user_guid,
    };
    try {
      await ctx.omnipartners.identity.updateSubscriptions(data);
    } catch (err) {
      return new GenericValidationError(err);
    }
  }

  @Mutation(() => GenericValidationError, { nullable: true })
  public async userUpdatePlacesOfPurchase(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("updatePlacesOfPurchaseInput")
    updatePlacesOfPurchaseInput: UserUpdatePlacesOfPurchaseInput,
  ): Promise<GenericValidationError | undefined> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    const data: IUserUpdatePlacesOfPurchaseInput = {
      ...updatePlacesOfPurchaseInput,
      user_guid,
    };
    try {
      await ctx.omnipartners.identity.updateUserPlacesOfPurchase(data);
    } catch (err) {
      return new GenericValidationError(err);
    }
  }

  @Mutation(() => GenericError, { nullable: true })
  public async userForceActivate(
    @Ctx() ctx: Context,
    @Arg("guid") guid: string,
  ): Promise<GenericError | undefined> {
    try {
      await ctx.omnipartners.identity.forceActivate({
        user_guid: guid,
      });
    } catch (err) {
      return new GenericError(err);
    }
  }
}
