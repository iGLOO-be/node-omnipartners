import { Omnipartners } from "omnipartners";
import { UserTokenHelper, UserTokenSignOptions } from "../lib/UserTokenHelper";

export interface IContextOptions {
  omnipartners: Omnipartners;
  userTokenSecret: string;
  userTokenSignOptions?: UserTokenSignOptions;
}

export class Context {
  public readonly omnipartners: Omnipartners;
  public readonly userTokenHelper: UserTokenHelper;

  constructor({
    omnipartners,
    userTokenSecret,
    userTokenSignOptions,
  }: IContextOptions) {
    this.omnipartners = omnipartners;
    this.userTokenHelper = new UserTokenHelper(
      userTokenSecret,
      userTokenSignOptions,
    );
  }
}
