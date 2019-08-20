import { IUserEligibleDirectCashbackDeal } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

interface IExtendedUserEligibleDirectCashbackDeal
  extends IUserEligibleDirectCashbackDeal {
  slogan: string;
  publicName: string;
}

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

  @Field()
  public slogan: string;

  @Field()
  public publicName: string;

  constructor(data: IExtendedUserEligibleDirectCashbackDeal) {
    Object.assign(this, data);
    this.availableFrom = new Date(data.available_from);
    this.availableTo = new Date(data.available_to);
  }
}
