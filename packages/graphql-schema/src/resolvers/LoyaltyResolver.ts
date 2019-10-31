import { ILoyaltyBalance } from "omnipartners";
import { ILoyaltyRetrieveBalanceInput } from "omnipartners/lib/api/loyalty";
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
    @Arg("program_id") program_id: string,
    @Arg("token", { nullable: true }) token?: string,
    @Arg("user_id", { nullable: true }) user_id?: string,
    @Arg("card_program_id", { nullable: true }) card_program_id?: string,
    @Arg("auth_type", () => String, { nullable: true })
    auth_type?: ILoyaltyRetrieveBalanceInput["auth_type"],
  ): Promise<LoyaltyBalance> {
    const userId = token ? ctx.userTokenHelper.parse(token).user_guid : user_id;
    return ctx.omnipartners.loyalty.retrieveBalance({
      user_id: userId || "",
      program_id,
      card_program_id,
      auth_type,
    });
  }
}
