import { Field, Form, Formik } from "formik";
import React from "react";
import { SimpleInput } from "../layout/SimpleInput";
import { useUserLogin } from "../lib/user/useUserLogin";

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { doLogin } = useUserLogin();

  return (
    <Formik
      onSubmit={async (values, { setSubmitting }) => {
        console.log("values", values);

        await doLogin(values);
        onSuccess();
        setSubmitting(false);
      }}
      initialValues={{
        identifier: "",
        password: "",
      }}
      render={() => (
        <Form>
          <Field name="identifier" component={SimpleInput} />
          <Field name="password" type="password" component={SimpleInput} />
          <button type="submit">Submit</button>
        </Form>
      )}
    />
  );
};
