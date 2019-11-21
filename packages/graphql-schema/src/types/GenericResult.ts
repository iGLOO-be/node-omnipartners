import { OmnipartnersError } from "omnipartners";
import { Field, ObjectType } from "type-graphql";
import { AuthenticationError } from "../lib/AuthenticationError";

@ObjectType()
export class GenericError {
  @Field(() => String)
  public message: string = "";
  @Field(() => String)
  public code: string = "";

  protected error: Error;

  constructor(error: any) {
    this.error = error;
    this.message = error ? error.message : "Unknown error";
    this.code = error ? error.code : "UNKNOWN_ERROR";
  }
}

@ObjectType({ isAbstract: true })
export abstract class GenericResult<TResult> {
  @Field(() => GenericError, { nullable: true })
  public error?: GenericError;
  public result?: TResult;
  constructor({ error, result }: { error?: any; result?: TResult }) {
    if (error && this.isInternalError && this.isInternalError(error)) {
      throw error;
    }

    this.error = error
      ? error instanceof GenericError
        ? error
        : new GenericError(error)
      : undefined;
    this.result = result;
  }

  public isInternalError?(error: any) {
    return (
      !(error instanceof OmnipartnersError) &&
      !(error instanceof AuthenticationError)
    );
  }
}
