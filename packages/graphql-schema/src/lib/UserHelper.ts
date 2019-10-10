import { ILightUser, IUserOptions, User } from "../user/User";

export interface IUserHelperOptions<T = {}> {
  validateUser?: (user: ILightUser) => Promise<IUserOptions<T>>
}

export class UserHelper {
  private readonly options: IUserHelperOptions;

  constructor(options: IUserHelperOptions) {
    this.options = options;
  }

  public async createUser(user: ILightUser) {
    const options = {
      ...this.options.validateUser && await this.options.validateUser(user)
    }

    return new User(user, options)
  }
}
