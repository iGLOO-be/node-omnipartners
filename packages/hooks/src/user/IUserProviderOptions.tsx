import { ITokenStorage } from "../lib/tokenStorage";

export interface IUserProviderOptions {
  env?: string;
  refreshTokenAfter?: null | number; // in days
  userTokenStorage?: ITokenStorage;
}
