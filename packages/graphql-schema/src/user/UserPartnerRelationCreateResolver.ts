import { IPartnerAccountRelationCreateInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserPartnerUpdateResult } from "./UserPartnerUpdateResult";
import { userDataOptions } from "./UserResolver";

@InputType()
export class UserPartnerRelationCreateInput {
  @Field()
  public extId: string;

  @Field()
  public relationship: string;

  @Field()
  public roles?: string;

  @Field()
  public status: string;
}

const mapClixrayFields = (
  userPartnerInput: UserPartnerRelationCreateInput,
): Pick<
  IPartnerAccountRelationCreateInput,
  "partner_ext_id" | "partner_relationship" | "partner_roles" | "partner_status"
> => ({
  ...userPartnerInput,
  partner_ext_id: userPartnerInput.extId,
  partner_relationship: userPartnerInput.relationship,
  partner_roles: userPartnerInput.roles,
  partner_status: userPartnerInput.status,
});

const fieldsMapping = {
  partner_ext_id: "extId",
  partner_relationship: "relationship",
  partner_roles: "roles",
  partner_status: "status",
};

@Resolver(() => User)
export class UserPartnerRelationCreateResolver {
  @Mutation(() => UserPartnerUpdateResult, { nullable: false })
  public async userPartnerRelationCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userPartnerInput") userPartnerInput: UserPartnerRelationCreateInput,
  ): Promise<UserPartnerUpdateResult> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    try {
      const partners = (await ctx.omnipartners.identity.createPartnerAccountRelation(
        {
          ...mapClixrayFields(userPartnerInput),
          user_guid,
        },
      )).data;

      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: userDataOptions,
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
