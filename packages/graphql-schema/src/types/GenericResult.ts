import { OmnipartnersError } from "omnipartners";
import { Field, ObjectType } from "type-graphql";
import { AuthenticationError } from "../lib/userToken";

export async function handleGeneric<T>(
  ResultClass: any,
  GenericResultClass: any,
  promise: Promise<any>,
  GenericErrorClass: any = GenericError,
): Promise<T> {
  let result: any;
  let error: any;
  try {
    result = new ResultClass(await promise);
  } catch (err) {
    error = err;
  }
  if (error && !(error instanceof OmnipartnersError)) {
    throw error;
  }

  return new GenericResultClass({
    error: error && new GenericErrorClass(error),
    result,
  });
}

function isInternalError(error: Error) {
  return (
    !(error instanceof OmnipartnersError) &&
    !(error instanceof AuthenticationError)
  );
}

@ObjectType()
export class GenericError {
  @Field(() => String)
  public message: string = "";
  @Field(() => String)
  public code: string = "";

  protected error: Error;

  constructor(error: any) {
    if (error && isInternalError(error)) {
      throw error;
    }

    this.error = error;
    this.message = error.message;
    this.code = error.code || "UNKNOWN_ERROR";
  }
}

@ObjectType({ isAbstract: true })
export abstract class GenericResult<TResult, TError = GenericError> {
  @Field(() => GenericError, { nullable: true })
  public error?: TError;
  public result?: TResult;
  constructor({ error, result }: { error?: TError; result?: TResult }) {
    this.error = error;
    this.result = result;
  }
}
