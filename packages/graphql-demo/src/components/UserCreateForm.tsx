import { useUserCreate } from "@igloo-be-omnipartners/hooks";
import { Field, Form, Formik } from "formik";
import React from "react";
import { SimpleInput } from "../layout/SimpleInput";
import { Radio } from "./Radio";
import { TitleRadio } from "./TitleRadio";

export const UserCreateForm = () => {
  const { userCreate } = useUserCreate();

  return (
    <div>
      <h1>Create user</h1>
      <Formik
        onSubmit={async values => {
          const { result, error } = await userCreate(values);
          if (result) {
            console.log(result);
          }
          if (error) {
            console.error(error);
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
