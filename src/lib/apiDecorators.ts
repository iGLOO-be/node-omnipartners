import pick from "lodash/pick";

const setPropertyOnMethod = (fn: any, property: string, value: any) => {
  (fn._originalFn || fn)[property] = value;
};

export const doc = (url: string) => (target: any, property: string) => {
  setPropertyOnMethod(target[property], "documentationUrl", url);
};

export const filterInput = (allowKeys: string[]) => (
  target: any,
  property: string,
) => {
  const fn = target[property];
  target[property] = (data: any) => {
    return fn.apply(target, pick(data, allowKeys));
  };
  target[property]._originalFn = fn;

  setPropertyOnMethod(target[property], "filterInput", allowKeys);
};
