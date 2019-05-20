import { Field, Form, Formik, FormikValues } from "formik";
import React from "react";
import { SimpleInput } from "../layout/SimpleInput";

export const PartnersListForm = ({
  setConnectionArgs,
}: {
  setConnectionArgs: React.Dispatch<React.SetStateAction<{
    page: number;
    limit: number;
}>>
}) => (
  <Formik
    onSubmit={(values, { setSubmitting }) => {
      setConnectionArgs({
          ...values,
        });
      setSubmitting(false);
    }}
    initialValues={{
      page: 1,
      limit: 10,
    }}
    render={() => (
      <Form>
        <Field name="page" type="number" component={SimpleInput} />
        <Field name="limit" min="10" max="100" type="number" component={SimpleInput} />
        <button type="submit">Submit</button>
      </Form>
    )}
  />
);
