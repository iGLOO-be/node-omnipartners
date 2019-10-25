import { ILightUser, IUserOptions, User } from "../user/User";

export interface IUserHelperOptions<T = {}> {
  validateUser?: (user: ILightUser, userContextData?: any) => Promise<IUserOptions<T>> | IUserOptions<T>;
}

export class UserHelper {
  private readonly options: IUserHelperOptions;

  constructor(options: IUserHelperOptions) {
    this.options = options;
  }

  public async createUser(user: ILightUser, userContextData?: any) {
    const options = {
      ...(this.options.validateUser && (await this.options.validateUser(user, userContextData))),
    };

    return new User(user, options);
  }
}
