import { Field, ObjectType } from "type-graphql";
import { GenericValidationError } from "../types/GenericValidationError";
import { UserResult } from "./UserResult";

@ObjectType()
export class UserUpdateResult extends UserResult {
  @Field(() => GenericValidationError, { nullable: true })
  public error?: GenericValidationError;
}
