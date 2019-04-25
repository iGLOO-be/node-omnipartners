import { Field, ObjectType } from "type-graphql";
import { GenericResult } from "./GenericResult";
import { User } from "./User";

@ObjectType()
export class UserResult extends GenericResult<User> {
  @Field(() => User, { nullable: true })
  public result?: User;
}
