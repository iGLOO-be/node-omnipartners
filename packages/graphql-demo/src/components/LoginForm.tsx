import { useLogin } from "@igloo-be-omnipartners/hooks";
import { Field, Form, Formik } from "formik";
import React from "react";
import { SimpleInput } from "../layout/SimpleInput";

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const login = useLogin();

  return (
    <Formik
      onSubmit={async (values, { setSubmitting }) => {
        console.log("values", values);

        await login(values);
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
