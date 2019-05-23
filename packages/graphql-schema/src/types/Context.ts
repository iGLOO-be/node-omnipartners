import { Omnipartners } from "omnipartners";
import { UserTokenHelper, UserTokenSignOptions } from "../lib/UserTokenHelper";

export class Context {
  public readonly omnipartners: Omnipartners;
  public readonly userTokenHelper: UserTokenHelper;

  constructor({
    omnipartners,
    userTokenSecret,
    userTokenSignOptions,
  }: {
    omnipartners: Omnipartners;
    userTokenSecret: string;
    userTokenSignOptions?: UserTokenSignOptions;
  }) {
    this.omnipartners = omnipartners;
    this.userTokenHelper = new UserTokenHelper(
      userTokenSecret,
      userTokenSignOptions,
    );
  }
}
