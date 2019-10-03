import { Field, ObjectType } from "type-graphql";
import { GenericResult } from "../types/GenericResult";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserChild } from "./UserChild";

@ObjectType()
class UserAndChild {
  @Field(() => User)
  public user: User;
  @Field(() => UserChild)
  public child: UserChild;
}

@ObjectType()
export class UserChildResult extends GenericResult<UserAndChild> {
  @Field(() => GenericValidationError, { nullable: true })
  public error?: GenericValidationError;
  @Field(() => UserAndChild, { nullable: true })
  public result?: UserAndChild;
}
