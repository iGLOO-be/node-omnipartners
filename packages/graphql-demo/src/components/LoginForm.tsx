import { useUserLogin } from "@igloo-be-omnipartners/hooks";
import { Field, Form, Formik } from "formik";
import React from "react";
import { SimpleInput } from "../layout/SimpleInput";
import { ErrorView } from "./ErrorView";

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { userLogin, error, data, ...rest } = useUserLogin();
  console.log({ error, data, rest });

  return (
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
          <button type="submit">Submit</button>
          {!!error && <ErrorView errors={[error]} />}
        </Form>
      )}
    />
  );
};
