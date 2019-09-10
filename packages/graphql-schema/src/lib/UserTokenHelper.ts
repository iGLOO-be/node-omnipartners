import jsonwebtoken, { SignOptions } from "jsonwebtoken";

interface IUserTokenPayload {
  user_guid: string;
}

export type UserTokenSignOptions = SignOptions;

const defaultSignOptions: UserTokenSignOptions = {
  expiresIn: "10 days",
};

export class UserTokenHelper {
  private secret: string;
  private signOptions: UserTokenSignOptions;

  constructor(secret: string, signOptions?: UserTokenSignOptions) {
    this.secret = secret;
    this.signOptions = signOptions || defaultSignOptions;
  }

  public sign(payload: IUserTokenPayload) {
    return jsonwebtoken.sign(payload, this.secret, this.signOptions);
  }

  public parse(token: string): IUserTokenPayload {
    try {
      return jsonwebtoken.verify(token, this.secret) as IUserTokenPayload;
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

export class AuthenticationError extends Error {
  public message = "Not logged!";
  public code = "E_NOT_LOGGED";
}
