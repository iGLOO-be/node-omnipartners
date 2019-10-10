import jsonwebtoken, { SignOptions } from "jsonwebtoken";
import { AuthenticationError } from "./AuthenticationError";

export interface IUserTokenPayload {
  user_guid: string;
}

export type UserTokenSignOptions = SignOptions;

const defaultSignOptions: UserTokenSignOptions = {
  expiresIn: "10 days",
};

export class UserTokenHelper<AdditionnalPayload> {
  private secret: string;
  private signOptions: UserTokenSignOptions;

  constructor(secret: string, signOptions?: UserTokenSignOptions) {
    this.secret = secret;
    this.signOptions = signOptions || defaultSignOptions;
  }

  public sign(payload: IUserTokenPayload & AdditionnalPayload) {
    return jsonwebtoken.sign(payload, this.secret, this.signOptions);
  }

  public parse(token: string): IUserTokenPayload & AdditionnalPayload {
    try {
      return jsonwebtoken.verify(token, this.secret) as IUserTokenPayload & AdditionnalPayload;
    } catch (err) {
      if (
        err.name !== "JsonWebTokenError" &&
        err.name !== "TokenExpiredError" &&
        err.name !== "SyntaxError"
      ) {
        throw err;
      }
      throw new AuthenticationError();
    }
  }
}
