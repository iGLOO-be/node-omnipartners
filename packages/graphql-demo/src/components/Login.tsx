import { Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { SimpleInput } from "../layout/SimpleInput";
import { Login, LoginVariables } from "./__generated__/Login";

const LoginQuery = gql`
  query Login($identifier: String!, $password: String!) {
    userLogin(identifier: $identifier, password: $password) {
      result {
        token
      }
      error {
        message
        code
      }
    }
  }
`;

export const LoginForm = () => {
  const { refetch } = useQuery<Login, LoginVariables>(LoginQuery, {
    skip: true,
  });

  return (
    <div>
      <h1>Login</h1>
      <Formik
        onSubmit={async values => {
          const { data } = await refetch({ ...values });
          console.log(data);
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
    </div>
  );
};
