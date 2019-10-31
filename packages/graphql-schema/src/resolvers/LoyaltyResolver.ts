import { ILoyaltyBalance } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query } from "type-graphql";
import { Context } from "../types/Context";

@ObjectType()
class LoyaltyBalance implements Omit<ILoyaltyBalance, "user_profile"> {
  @Field()
  public user_total_points!: string;
  @Field()
  public user_guid!: string;
  @Field()
  public user_hold_points!: string;
  @Field()
  public status!: string;
}

export class LoyaltyResolver {
  @Query(() => LoyaltyBalance)
  public async loyaltyRetrieveBalance(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("program_id") program_id: string,
    @Arg("card_program_id", { nullable: true }) card_program_id?: string,
  ): Promise<LoyaltyBalance> {
    const { user_guid } = ctx.userTokenHelper.parse(token);
    return ctx.omnipartners.loyalty.retrieveBalance({
      user_id: user_guid,
      program_id,
      card_program_id,
      auth_type: "user_guid",
    });
  }
}
