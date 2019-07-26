import { Field, ObjectType } from "type-graphql";
import { GenericResult } from "../types/GenericResult";
import { GenericValidationError } from "../types/GenericValidationError";

@ObjectType()
class DirectCashbackRedemptionRequestURL {
  @Field()
  public url: string;
}

@ObjectType()
export class DirectCashbackRedemptionRequestResult extends GenericResult<
  DirectCashbackRedemptionRequestURL
> {
  @Field(() => GenericValidationError, { nullable: true })
  public error?: GenericValidationError;

  @Field(() => DirectCashbackRedemptionRequestURL, { nullable: true })
  public result?: DirectCashbackRedemptionRequestURL;
}