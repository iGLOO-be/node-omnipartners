import jsonwebtoken from "jsonwebtoken";

const secret = "omumjsa8ahqNJbXxQMpcX88WZ5YdyySM";
const expiresIn = "10 days";

interface IUserTokenPayload {
  user_guid: string;
  token: string;
}

export const sign = (payload: IUserTokenPayload) =>
  jsonwebtoken.sign(payload, secret, {
    expiresIn,
  });

export const parse = (token: string): IUserTokenPayload => {
  try {
    return jsonwebtoken.verify(token, secret) as IUserTokenPayload;
  } catch (err) {
    if (err.name !== "JsonWebTokenError" && err.name !== "TokenExpiredError") {
      throw err;
    }
    throw new AuthenticationError();
  }
};

export class AuthenticationError extends Error {
  public message = "Not logged!";
  public code = "E_NOT_LOGGED";
}
