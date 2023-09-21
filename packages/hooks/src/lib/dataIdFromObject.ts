export const dataIdFromObject = (value: any) => {
  const { __typename } = value;

  if (__typename === "Partner") {
    if (value.extId) {
      return `${__typename}:${value.extId}`;
    } else {
      console.warn("Missing `extId` in `Partner`");
    }
  }

  if (__typename === "AnimalType") {
    if (value.extId) {
      return `${__typename}:${value.code}`;
    } else {
      console.warn("Missing `code` in `AnimalType`");
    }
  }

  if (__typename === "LoyaltyBalance") {
    if (value.user_guid) {
      return `${__typename}:${value.user_guid}`;
    } else {
      console.warn("Missing `user_guid` in `LoyaltyBalance`");
    }
  }

  return null;
};
