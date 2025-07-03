import pickBy = require("lodash/pickBy");
import { IUserChildCreateInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserChild } from "./UserChild";
import { UserChildResult } from "./UserChildResult";
import { userDataOptions } from "./UserResolver";

@InputType()
export class UserChildCreateInput {
  @Field()
  public firstName!: string;

  @Field()
  public birthday!: string;

  @Field()
  public gender!: string;

  @Field({ nullable: true })
  public extId?: string;

  @Field({ nullable: true })
  public multiples?: boolean;
}

type IMapClixrayFieldsResult = Pick<
  IUserChildCreateInput,
  | "child_first_name"
  | "child_birthday"
  | "child_gender"
  | "child_ext_id"
  | "multiples"
>;
const mapClixrayFields = (userChildCreateInput: UserChildCreateInput) => {
  const result = pickBy<IMapClixrayFieldsResult>({
    child_first_name: userChildCreateInput.firstName,
    child_birthday: userChildCreateInput.birthday,
    child_gender: userChildCreateInput.gender,
    child_ext_id: userChildCreateInput.extId,
    multiples:
      userChildCreateInput.multiples !== undefined
        ? userChildCreateInput.multiples === true
          ? 1
          : 0
        : undefined,
  });

  return result as IMapClixrayFieldsResult;
};

const fieldsMapping = {
  child_first_name: "firstName",
  child_birthday: "birthday",
  child_gender: "gender",
  child_ext_id: "extId",
};

export class UserChildCreateResolver {
  @Mutation(() => UserChildResult, { nullable: false })
  public async userChildCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userChildCreateInput") userChildCreateInput: UserChildCreateInput,
  ): Promise<UserChildResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      const child = (
        await ctx.omnipartners.identity.createChild({
          user_guid,
          ...mapClixrayFields(userChildCreateInput),
        })
      ).data;
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: userDataOptions,
        user_guid,
      });

      return new UserChildResult({
        result: {
          child: new UserChild(child),
          user: new User(user),
        },
      });
    } catch (err) {
      return new UserChildResult({
        error: new GenericValidationError(err, { fieldsMapping }),
      });
    }
  }
}
