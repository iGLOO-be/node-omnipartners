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
  public availableFrom: Date;

  @Field({ nullable: true })
  public availableTo: Date;

  constructor(data: IUserEligibleDirectCashbackDeal) {
    Object.assign(this, data);
    this.availableFrom = new Date(data.available_from);
    this.availableTo = new Date(data.available_to);
  }
}
