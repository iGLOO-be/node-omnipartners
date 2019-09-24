import pickBy = require("lodash/pickBy");
import { IUserChildCreateInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserChild } from "./UserChild";
import { UserChildResult } from "./UserChildResult";
import { dataOptions } from "./UserResolver";

@InputType()
export class UserChildCreateInput {
  @Field()
  public firstName: string;

  @Field()
  public birthday: string;

  @Field()
  public gender: string;

  @Field({ nullable: true })
  public extId?: string;
}

type IMapClixrayFieldsResult = Pick<
  IUserChildCreateInput,
  "child_first_name" | "child_birthday" | "child_gender" | "child_ext_id"
>;
const mapClixrayFields = (userChildInput: UserChildCreateInput) => {
  const result = pickBy<IMapClixrayFieldsResult>({
    child_first_name: userChildInput.firstName,
    child_birthday: userChildInput.birthday,
    child_gender: userChildInput.gender,
    child_ext_id: userChildInput.extId,
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
    @Arg("userChildInput") userChildInput: UserChildCreateInput,
  ): Promise<UserChildResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      const child = (await ctx.omnipartners.identity.createChild({
        user_guid,
        ...mapClixrayFields(userChildInput),
      })).data;
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: dataOptions,
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
