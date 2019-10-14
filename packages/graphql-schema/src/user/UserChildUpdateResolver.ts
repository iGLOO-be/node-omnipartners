import pickBy from "lodash/pickBy";
import { IUserChildUpdateInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserChild } from "./UserChild";
import { UserChildResult } from "./UserChildResult";
import { userDataOptions } from "./UserResolver";

@InputType()
class UserChildUpdateInput {
  @Field()
  public guid: string;

  @Field({ nullable: true })
  public firstName?: string;

  @Field({ nullable: true })
  public birthday?: string;

  @Field({ nullable: true })
  public gender?: string;

  @Field({ nullable: true })
  public extId?: string;
}

type IMapClixrayFieldsResult = Pick<
  IUserChildUpdateInput,
  | "child_guid"
  | "child_first_name"
  | "child_birthday"
  | "child_gender"
  | "child_ext_id"
>;

const mapClixrayFields = (userChildUpdateInput: UserChildUpdateInput) => {
  const result = pickBy<IMapClixrayFieldsResult>({
    child_guid: userChildUpdateInput.guid,
    child_first_name: userChildUpdateInput.firstName,
    child_birthday: userChildUpdateInput.birthday,
    child_gender: userChildUpdateInput.gender,
    child_ext_id: userChildUpdateInput.extId,
  });

  return result as IMapClixrayFieldsResult;
};

const fieldsMapping = {
  child_guid: "guid",
  child_first_name: "firstName",
  child_birthday: "birthday",
  child_gender: "gender",
  child_ext_id: "extId",
};

@Resolver(() => User)
export class UserChildUpdateResolver {
  @Mutation(() => UserChildResult, { nullable: false })
  public async userChildUpdate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userChildUpdateInput") userChildUpdateInput: UserChildUpdateInput,
  ): Promise<UserChildResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      const child = (await ctx.omnipartners.identity.getChildren({
        user_guid,
      })).data.find(c => c.child_guid === userChildUpdateInput.guid);

      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: userDataOptions,
        user_guid,
      });

      if (child && child.child_parent !== user.owner.id) {
        // TODO: better error
        throw new Error("Not your child!");
      }

      const updatedChild = (await ctx.omnipartners.identity.updateChild(
        mapClixrayFields(userChildUpdateInput),
      )).data;

      return new UserChildResult({
        result: {
          child: new UserChild(updatedChild),
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
