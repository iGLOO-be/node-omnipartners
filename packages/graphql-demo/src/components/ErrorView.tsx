import React from "react";

interface IError {
  message: string;
  code?: string;
}

export const ErrorView = ({
  errors = [],
}: {
  errors: Array<IError | null | undefined>;
}) => {
  const errorsFiltered = errors.filter(Boolean) as IError[];
  if (!errorsFiltered.length) {
    return null;
  }

  return (
    <div style={{ margin: "20px 0" }}>
      {errorsFiltered.map(({ code, message }, i) => (
        <div key={i}>
          <span style={{ color: "#ee8b00" }}>
            {!!code && code + " "}
            {message}
          </span>
        </div>
      ))}
    </div>
  );
};
