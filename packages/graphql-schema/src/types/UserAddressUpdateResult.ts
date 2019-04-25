import { Field, ObjectType } from "type-graphql";
import { GenericResult } from "./GenericResult";
import { GenericValidationError } from "./GenericValidationError";
import { User } from "./User";
import { UserAddress } from "./UserAddress";

@ObjectType()
class UserAndAddress {
  @Field(() => User)
  public user: User;
  @Field(() => UserAddress)
  public address: UserAddress;
}

@ObjectType()
export class UserAddressUpdateResult extends GenericResult<UserAndAddress> {
  @Field(() => GenericValidationError, { nullable: true })
  public error?: GenericValidationError;
  @Field(() => UserAndAddress, { nullable: true })
  public result?: UserAndAddress;
}
