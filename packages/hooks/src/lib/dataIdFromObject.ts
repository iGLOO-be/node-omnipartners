export const dataIdFromObject = (value: any) => {
  const { __typename } = value;

  if (__typename === "UserResult") {
    if (value.result && value.result.owner && value.result.owner.guid) {
      return `${__typename}:${value.result.owner.guid}`;
    } else {
      console.warn("Missing `result.owner.guid` in `UserResult`");
    }
  }
  if (__typename === "User") {
    if (value.owner && value.owner.guid) {
      return `${__typename}:${value.owner.guid}`;
    } else {
      console.warn("Missing `owner.guid` in `User`");
    }
  }
  if (__typename === "UserOwner") {
    if (value.guid) {
      return `${__typename}:${value.guid}`;
    } else {
      console.warn("Missing `guid` in `UserOwner`");
    }
  }
  if (__typename === "UserPet") {
    if (value.guid) {
      return `${__typename}:${value.guid}`;
    } else {
      console.warn("Missing `guid` in `UserPet`");
    }
  }
  if (__typename === "UserChild") {
    if (value.guid) {
      return `${__typename}:${value.guid}`;
    } else {
      console.warn("Missing `guid` in `UserChild`");
    }
  }

  if (__typename === "Partner") {
    if (value.extId) {
      return `${__typename}:${value.extId}`;
    } else {
      console.warn("Missing `extId` in `Partner`");
    }
  }

  return null;
};
