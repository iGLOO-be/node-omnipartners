import { Field, ObjectType } from "type-graphql";
import { GenericResult } from "../types/GenericResult";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserPet } from "./UserPet";

@ObjectType()
class UserAndPet {
  @Field(() => User)
  public user!: User;
  @Field(() => UserPet)
  public pet!: UserPet;
}

@ObjectType()
export class UserPetUpdateResult extends GenericResult<UserAndPet> {
  @Field(() => GenericValidationError, { nullable: true })
  public error?: GenericValidationError;
  @Field(() => UserAndPet, { nullable: true })
  public result?: UserAndPet;
}
