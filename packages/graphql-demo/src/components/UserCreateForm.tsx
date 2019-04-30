import { Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { useMutation } from "react-apollo-hooks";
import { SimpleInput } from "../layout/SimpleInput";
import { UserCreate, UserCreateVariables } from "./__generated__/UserCreate";
import { Radio } from "./Radio";
import { TitleRadio } from "./TitleRadio";

const UserCreateMutation = gql`
  mutation UserCreate($userInput: UserCreateInput!) {
    userCreate(userInput: $userInput) {
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

export const UserCreateForm = () => {
  const userCreate = useMutation<UserCreate, UserCreateVariables>(
    UserCreateMutation,
  );

  return (
    <div>
      <h1>Create user</h1>
      <Formik
        onSubmit={async values => {
          const { data } = await userCreate({
            variables: { userInput: { ...values } },
          });
          if (data && data.userCreate) {
            if (data.userCreate.result) {
              console.log(data.userCreate.result);
            }
            if (data.userCreate.error) {
              console.error(data.userCreate.error);
            }
          }
        }}
        initialValues={{
          title: "Mr",
          firstName: "",
          lastName: "",
          dob: "",
          gender: "",
          mobilePhone: "",
          email: "",
          password: "",
          language: "fr",
          originDetails: "hardcoded",
        }}
        render={() => (
          <Form>
            <TitleRadio />
            <Field name="firstName" component={SimpleInput} />
            <Field name="lastName" component={SimpleInput} />
            <Field
              name="dob"
              placeholder="dd-MM-yyyy"
              component={SimpleInput}
            />
            <Radio choices={["M", "F"]} label="Gender" name="gender" />
            <Field name="mobilePhone" type="phone" component={SimpleInput} />
            <Field name="email" type="email" component={SimpleInput} />
            <Field name="password" component={SimpleInput} />
            <Field name="language" component={SimpleInput} />
            <Field name="originDetails" component={SimpleInput} />
            <button type="submit">Submit</button>
          </Form>
        )}
      />
    </div>
  );
};
