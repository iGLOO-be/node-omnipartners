import { OmnipartnersError } from "omnipartners";
import { Field, ObjectType } from "type-graphql";
import { GenericError } from "./GenericResult";

@ObjectType()
class ValidationError {
  @Field()
  public validator: string;
  @Field()
  public message: string;
}

@ObjectType()
class FieldValidationError {
  @Field()
  public field: string;
  @Field(() => [ValidationError])
  public errors: ValidationError[];
}

@ObjectType()
export class GenericValidationError extends GenericError {
  @Field(() => [FieldValidationError], { nullable: true })
  public get validationErrors(): FieldValidationError[] {
    if (!(this.error instanceof OmnipartnersError)) {
      return [];
    }
    const errors = this.error.errors;
    if (!errors) {
      return [];
    }
    return Object.keys(errors).map(field => ({
      errors: Object.keys(errors[field]).map(validator => ({
        message: errors[field][validator],
        validator,
      })),
      field,
    }));
  }
}
