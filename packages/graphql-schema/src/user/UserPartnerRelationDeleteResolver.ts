import { IPartnerAccountRelationDeleteInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserPartnerUpdateResult } from "./UserPartnerUpdateResult";
import { dataOptions } from "./UserResolver";

@InputType()
export class UserPartnerRelationDeleteInput {
  @Field()
  public extId: string;

  @Field()
  public relationship: string;
}

const mapClixrayFields = (
  userPartnerInput: UserPartnerRelationDeleteInput,
): Pick<
  IPartnerAccountRelationDeleteInput,
  "partner_ext_id" | "partner_relationship"
> => ({
  ...userPartnerInput,
  partner_ext_id: userPartnerInput.extId,
  partner_relationship: userPartnerInput.relationship,
});

const fieldsMapping = {
  partner_ext_id: "extId",
  partner_relationship: "relationship",
};

@Resolver(() => User)
export class UserPartnerRelationDeleteResolver {
  @Mutation(() => UserPartnerUpdateResult, { nullable: false })
  public async userPartnerRelationDelete(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userPartnerInput") userPartnerInput: UserPartnerRelationDeleteInput,
  ): Promise<UserPartnerUpdateResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      await ctx.omnipartners.identity.deletePartnerAccountRelation({
        ...mapClixrayFields(userPartnerInput),
        user_guid,
      });

      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: dataOptions,
        user_guid,
      });
      return new UserPartnerUpdateResult({
        result: {
          user: new User(user),
        },
      });
    } catch (err) {
      return new UserPartnerUpdateResult({
        error: new GenericValidationError(err, { fieldsMapping }),
      });
    }
  }
}
