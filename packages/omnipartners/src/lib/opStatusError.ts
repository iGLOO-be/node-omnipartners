export interface IErrorMap {
  [key: number]: { message: string };
}

const errorMap: IErrorMap = {
  2: {
    message:
      "Invalid request in which required header or parameters are either missing or invalid.",
  },
  3: {
    message: "User not found in the system.",
  },
  4: {
    message: "User is found but not active in the system.",
  },
  5: {
    message: "Password is incorrect.",
  },
  6: {
    message: "Not authorised to use this function or its disabled.",
  },
  7: {
    message: "Token not found in the system.",
  },
  8: {
    message: "Internal error.",
  },
  16: {
    message: "Invalid hash.",
  },
  17: {
    message: "Password not found.",
  },
  28: {
    message: "Password does not meet the required specifications.",
  },
  37: {
    message: "An email address with the specified domain is not allowed.",
  },
  53: {
    message: "External sso service returned unknown response or totally inaccessible",
  },
  54: {
    message: "Member authentication through external sso service failed because of invalid credentials or missing credentials",
  },
  55	: {
    message: "External sso service failed with unknown status code or does not provide details about the failure",
  },
  56: {
    message: "External sso service failed during request to access the service (OAuth failure)",
  },
};

export function findOpStatus({
  status,
  statusCode,
}: {
  status?: string | number | boolean;
  statusCode?: string | number | boolean;
}) {
  let foundStatus =
    typeof status !== "undefined"
      ? status
      : typeof statusCode !== "undefined"
      ? statusCode
      : "-1";

  // Hack for `confirmLegalForm` which may results status:
  // { statusCode: false,
  //   errors:
  //    { legal_form_code:
  //       { invalidLegalFormCode: 'Invalid legal form code \'foo\' specified' } } }
  if (foundStatus === false) {
    foundStatus = -1;
  }

  return parseInt(`${foundStatus}`, 10);
}

export function getOpErrorFromStatus(opStatus: number) {
  return errorMap[opStatus];
}
