import decode from "jwt-decode";

const TOKEN_STORAGE_KEY = "userToken";
const storage = typeof window !== "undefined" ? window.localStorage : undefined;
class TokenStorage {
  public async set(env: string, token: string) {
    if (storage) {
      tryFn(() => storage.setItem(TOKEN_STORAGE_KEY + "." + env, token));
    }
  }
  public async get(env: string) {
    if (storage) {
      return tryFn(() => storage.getItem(TOKEN_STORAGE_KEY + "." + env));
    }
    return "";
  }
  public async remove(env: string) {
    if (storage) {
      tryFn(() => storage.removeItem(TOKEN_STORAGE_KEY + "." + env));
    }
  }
}

const tryFn = <T>(fn: () => T): T | undefined => {
  try {
    return fn();
  } catch (err) {
    console.warn(err);
    return;
  }
};

export const decodeToken = (token?: string) => {
  let result: any;
  if (token) {
    try {
      result = decode(token);
    } catch (err) {
      console.warn("Error during decode user token: " + err.message);
    }
  }

  if (result && result.exp && result.user_guid) {
    return {
      user_guid: result.user_guid,
      exp: result.exp,
    };
  } else {
    return {
      user_guid: "",
      exp: -1,
    };
  }
};

export const tokenStorage = new TokenStorage();
