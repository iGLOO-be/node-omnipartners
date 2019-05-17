import { IUser, IUserPartnerRelation } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class UserPartnerRelation {
  // @Field()
  // public partner: Partner;

  @Field()
  public extId: string;

  @Field()
  public type: string;

  @Field(() => [String])
  public roles: string[];

  constructor(data: IUserPartnerRelation) {
    Object.assign(this, data);
    this.extId = data.ptn_ext_customer_id;
    this.type = data.ptn_type;
    this.roles = data.partner_relationship_roles;
  }
}

const mapFields = (userPartnerRelation: IUserPartnerRelation) => ({
  extId: userPartnerRelation.ptn_ext_customer_id,
  type: userPartnerRelation.ptn_type,
  roles: userPartnerRelation.partner_relationship_roles
})


@ObjectType()
export class UserPartnerRelations {
  @Field(() => [UserPartnerRelation])
  public partof: UserPartnerRelation[];
  @Field(() => [UserPartnerRelation])
  public clientof: UserPartnerRelation[];

  constructor(data: IUser["partners"]) {
    this.partof = data.partof.map(relation => mapFields(relation));
    this.clientof = data.clientof.map(relation => mapFields(relation));
  }
}
