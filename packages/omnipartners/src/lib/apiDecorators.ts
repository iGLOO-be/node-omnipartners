import pick from "lodash/pick";

const setPropertyOnMethod = (fn: any, property: string, value: any) => {
  (fn._originalFn || fn)[property] = value;
};

export const doc = (url: string) => (target: any, property: string) => {
  setPropertyOnMethod(target[property], "documentationUrl", url);
};

export function filterInput(allowKeys: string[]) {
  return (
    _: any,
    _2: string,
    descriptor: TypedPropertyDescriptor<(data: any) => any>,
  ) => {
    const fn = descriptor.value;
    if (fn) {
      descriptor.value = function(data: {}) {
        return fn.call(this, pick(data, allowKeys));
      };
    }
  };
}
