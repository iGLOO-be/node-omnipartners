import {
  IUserGetPartnerAccountRelationsResult,
  IUserPartnerRelationFromGet,
} from "omnipartners";
import { Ctx, Field, ObjectType } from "type-graphql";
import { Partner } from "../partner/Partner";
import { Context } from "../types/Context";

@ObjectType()
export class UserPartnerRelation {
  @Field()
  public extId: string;

  @Field()
  public type: string;

  @Field(() => [String])
  public roles: string[];

  @Field({ nullable: true })
  public shortDescription?: string;

  constructor(data: IUserPartnerRelationFromGet) {
    Object.assign(this, data);
    this.extId = data.ptn_ext_customer_id;
    this.type = data.ptn_type;
    this.roles = data.partner_relationship_roles || [];
    this.shortDescription = data.ptn_short_description;
  }

  @Field(() => Partner, { nullable: false })
  public async partner(@Ctx() ctx: Context): Promise<Partner> {
    const res = await ctx.omnipartners.partners.partnerDetails({
      partner_ext_id: this.extId,
    });
    return new Partner(res.data[0]);
  }
}

@ObjectType()
export class UserPartnerRelations {
  @Field(() => [UserPartnerRelation])
  public partof: UserPartnerRelation[];
  @Field(() => [UserPartnerRelation])
  public clientof: UserPartnerRelation[];

  constructor(data: IUserGetPartnerAccountRelationsResult) {
    this.partof = data.partof.map(
      (relation) => new UserPartnerRelation(relation),
    );
    this.clientof = data.clientof.map(
      (relation) => new UserPartnerRelation(relation),
    );
  }
}
