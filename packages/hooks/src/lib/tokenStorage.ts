import decode from "jwt-decode";

const localStorageIsEnabled = () => {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const key = "test-write-local-storage/" + Date.now();
    window.localStorage.setItem(key, "test");
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

const TOKEN_STORAGE_KEY = "userToken";
const storage = localStorageIsEnabled() ? window.localStorage : undefined;
class TokenStorage {
  private value?: string;
  public async set(env: string, token: string) {
    if (storage) {
      tryFn(() => storage.setItem(TOKEN_STORAGE_KEY + "." + env, token));
    } else {
      this.value = token;
    }
  }
  public async get(env: string) {
    if (storage) {
      return tryFn(() => storage.getItem(TOKEN_STORAGE_KEY + "." + env));
    } else {
      return this.value;
    }
  }
  public async remove(env: string) {
    if (storage) {
      tryFn(() => storage.removeItem(TOKEN_STORAGE_KEY + "." + env));
    } else {
      this.value = undefined;
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
