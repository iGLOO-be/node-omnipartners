import { Omnipartners } from "omnipartners";
import { IUserHelperOptions, UserHelper } from "../lib/UserHelper";
import { UserTokenHelper, UserTokenSignOptions } from "../lib/UserTokenHelper";

export interface IContextOptions<T = {}> {
  omnipartners: Omnipartners;
  userTokenSecret: string;
  userTokenSignOptions?: UserTokenSignOptions;
  userHelperOptions?: IUserHelperOptions<T>;
}

export class Context<T = {}> {
  public readonly omnipartners: Omnipartners;
  public readonly userTokenHelper: UserTokenHelper<T>;
  public readonly userHelper: UserHelper;

  constructor({
    omnipartners,
    userTokenSecret,
    userTokenSignOptions,
    userHelperOptions,
  }: IContextOptions<T>) {
    this.omnipartners = omnipartners;
    this.userTokenHelper = new UserTokenHelper(
      userTokenSecret,
      userTokenSignOptions,
    );
    this.userHelper = new UserHelper(userHelperOptions || {});
  }
}
