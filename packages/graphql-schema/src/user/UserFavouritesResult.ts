import { Field, ObjectType } from "type-graphql";
import { GenericResult } from "../types/GenericResult";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";

@ObjectType()
class UserAndFavourites {
  @Field(() => User)
  public user!: User;
}

@ObjectType()
export class UserFavouritesResult extends GenericResult<UserAndFavourites> {
  @Field(() => GenericValidationError, { nullable: true })
  public error?: GenericValidationError;
  @Field(() => UserAndFavourites, { nullable: true })
  public result?: UserAndFavourites;
}
