import {
  useUserLogin,
  useUserRecoverPassword,
} from "@igloo-be-omnipartners/hooks";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { SimpleInput } from "../layout/SimpleInput";
import { ErrorView } from "./ErrorView";

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [view, setView] = useState("login");
  const { userLogin, error } = useUserLogin();
  const {
    userRecoverPassword,
    error: errorForgotPassword,
  } = useUserRecoverPassword();

  return (
    <>
      {view === "login" && (
        <Formik
          onSubmit={async (values, { setSubmitting }) => {
            const { result } = await userLogin(values);
            if (result) {
              onSuccess();
              setSubmitting(false);
            }
          }}
          initialValues={{
            identifier: "",
            password: "",
          }}
          render={() => (
            <Form>
              <Field name="identifier" component={SimpleInput} />
              <Field name="password" type="password" component={SimpleInput} />
              <button type="submit">Submit</button>{" "}
              <a
                href="/"
                onClick={e => {
                  e.preventDefault();
                  setView("forgotPassword");
                }}
              >
                Forgot password
              </a>
              {!!error && <ErrorView errors={[error]} />}
            </Form>
          )}
        />
      )}

      {view === "forgotPassword" && (
        <Formik
          onSubmit={async (values, { setSubmitting }) => {
            const { error: errorRecoverPassword } = await userRecoverPassword(
              values.email,
            );
            if (!errorRecoverPassword) {
              alert("Success !");
            }
            setSubmitting(false);
          }}
          initialValues={{
            email: "",
          }}
          render={() => (
            <Form>
              <Field name="email" component={SimpleInput} />
              <button type="submit">Submit</button>{" "}
              <a
                href="/"
                onClick={e => {
                  e.preventDefault();
                  setView("login");
                }}
              >
                Login
              </a>
              {!!errorForgotPassword && (
                <ErrorView errors={[errorForgotPassword]} />
              )}
            </Form>
          )}
        />
      )}
    </>
  );
};
