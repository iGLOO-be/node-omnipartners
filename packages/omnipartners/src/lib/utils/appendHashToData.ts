import crypto from "crypto";

interface IData {
  [key: string]: any;
}

export interface IDataHashOptions {
  hashNoKey?: boolean;
  hash?: boolean;
  hashKeys?: string[] | ((data: IData) => string[]);
  hashKey?: string;
}

export default function dataHashAppend(
  data: IData,
  key: string,
  secret: string,
  options: IDataHashOptions,
) {
  const allData = { ...data };
  if (!options.hashNoKey) {
    allData.key = key;
  }

  if (!options.hashKey) {
    options.hashKey = "hash";
  }

  if (options.hash === false) {
    return allData;
  }

  let hashKeys =
    typeof options.hashKeys === "function"
      ? options.hashKeys(data)
      : options.hashKeys;
  if (!hashKeys) {
    hashKeys = Object.keys(allData).sort();
  }

  const hash =
    hashKeys
      .reduce(
        (res, k) => [
          ...res,
          typeof allData[k] === "undefined" ? "" : allData[k],
        ],
        [] as string[],
      )
      .join("") + secret;

  const signedBody: IData = {
    ...allData,
    [options.hashKey]: crypto
      .createHash("sha1")
      .update(hash)
      .digest("hex"),
  };
  if (options.hashNoKey) {
    signedBody.key = key;
  }

  return signedBody;
}
