import { ICreatePartnerAccountRelation } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { parse } from "../lib/userToken";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserPartners } from "./UserPartners";
import { UserPartnerUpdateResult } from "./UserPartnerUpdateResult";
import { dataOptions } from "./UserResolver";


@InputType()
export class UserPartnerCreateInput {
  @Field()
  public extId: string;

  @Field()
  public relationship: string;

  @Field()
  public roles?: string;

  @Field()
  public status: string;

  // sent an email to the user if 1
  // @Field()
  // public notify?: boolean;
}

const mapClixrayFields = (
  userPartnerInput: UserPartnerCreateInput,
): Pick<
  ICreatePartnerAccountRelation,
  | "partner_ext_id"
  | "partner_relationship"
  | "partner_roles"
  | "partner_status"
> => ({
  ...userPartnerInput,
  partner_ext_id: userPartnerInput.extId,
  partner_relationship: userPartnerInput.relationship,
  partner_roles: userPartnerInput.roles,
  partner_status: userPartnerInput.status,
});

@Resolver(() => User)
export class UserPartnerCreateResolver {
  @Mutation(() => UserPartnerUpdateResult, { nullable: false })
  public async userPartnerCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userPartnerInput") userPartnerInput: UserPartnerCreateInput,
  ): Promise<UserPartnerUpdateResult> {
    const { user_guid } = parse(token);
    try {
      console.log(await ctx.omnipartners.identity.createPartnerAccountRelation({
        ...mapClixrayFields(userPartnerInput),
        user_guid,
      }))
      const partners = (await ctx.omnipartners.identity.createPartnerAccountRelation({
        ...mapClixrayFields(userPartnerInput),
        user_guid,
      })).data;

      console.log("partners", partners)

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
        error: new GenericValidationError(err),
      });
    }
  }
}