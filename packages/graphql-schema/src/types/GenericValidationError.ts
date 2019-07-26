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

interface IGenericValidationErrorOptions {
  fieldsMapping: {
    [k: string]: string;
  };
}

@ObjectType()
export class GenericValidationError extends GenericError {
  private options: undefined | IGenericValidationErrorOptions;

  constructor(error: any, options?: IGenericValidationErrorOptions) {
    super(error);
    this.options = options;
  }

  private getFieldName(field: string) {
    if (
      this.options &&
      this.options.fieldsMapping &&
      this.options.fieldsMapping[field]
    ) {
      return this.options.fieldsMapping[field];
    } else {
      return field;
    }
  }

  @Field(() => [FieldValidationError], { nullable: true })
  public get validationErrors(): FieldValidationError[] {
    if (!(this.error instanceof OmnipartnersError)) {
      return [];
    }
    const errors = this.error.errors;
    if (!errors || typeof errors === "string") {
      return [];
    }
    return Object.keys(errors).map(field => ({
      errors: Object.keys(errors[field]).map(validator => ({
        message: errors[field][validator],
        validator,
      })),
      field: this.getFieldName(field),
    }));
  }
}
