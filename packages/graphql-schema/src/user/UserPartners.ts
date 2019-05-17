import { IUser, IUserPartner } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

// TODO: clean props name in UserPartner (ex: ptn_typ => type, ptn_ext_cutomer_id => extCustomerId, ...)
// TODO: quid ptn_id, ... http://doc.omnipartners.be/index.php/Retrieve_User_Accounts
// TODO: clean unused props
// TODO: add new relation
// TODO: edit relation

@ObjectType()
class UserPartner {
  @Field()
  public ptn_ext_customer_id: string;

  @Field()
  public ptn_type: string;

  @Field()
  public updated_on: string;

  @Field(() => [String])
  public partner_relationship_roles: string[];

  @Field()
  public partner_relationship_status: string;

  @Field()
  public partner_relationship_is_explicit: string;

  @Field()
  public partner_relationship_deleted: string;

  @Field({ nullable: true })
  public partner_relationship_implicit_on: string;

  @Field({ nullable: true })
  public partner_relationship_explicit_on: string;

  @Field({ nullable: true })
  public partner_relationship_deleted_on: string;

  @Field()
  public partner_relationship_added_on: string;

  constructor(data: IUserPartner) {
    Object.assign(this, data);
  }
}


@ObjectType()
export class UserPartners {
  @Field(() => [UserPartner])
  public partof: UserPartner[];
  @Field(() => [UserPartner])
  public clientof: UserPartner[];

  constructor(data: IUser["partners"]) {
    this.partof = data.partof;
    this.clientof = data.clientof;
  }
}
