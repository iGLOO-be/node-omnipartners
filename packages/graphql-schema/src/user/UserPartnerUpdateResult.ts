import { Field, ObjectType } from "type-graphql";
import { GenericResult } from "../types/GenericResult";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserPartners } from "./UserPartners";

@ObjectType()
class UserAndPartner {
  @Field(() => User)
  public user: User;
}

@ObjectType()
export class UserPartnerUpdateResult extends GenericResult<UserAndPartner> {
  @Field(() => GenericValidationError, { nullable: true })
  public error?: GenericValidationError;
  @Field(() => UserAndPartner, { nullable: true })
  public result?: UserAndPartner;
}
