import { IUserEligibleDirectCashbackDeal } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserEligibleDirectCashbackDeal {
  @Field()
  public id: string;

  @Field()
  public ref: string;

  @Field()
  public name: string;

  @Field()
  public availableFrom: string;

  @Field({ nullable: true })
  public availableTo: string;

  constructor(data: IUserEligibleDirectCashbackDeal) {
    Object.assign(this, data);
    this.availableFrom = data.available_from;
    this.availableTo = data.available_to;
  }
}
