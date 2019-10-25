import { useUser, useUserUpdate } from "@igloo-be-omnipartners/hooks";
import { Field, Form, Formik } from "formik";
import React from "react";
import { SimpleInput } from "../layout/SimpleInput";
import { Radio } from "./Radio";
import { TitleRadio } from "./TitleRadio";

export const UserUpdateForm = () => {
  const { user } = useUser();
  const { userUpdate } = useUserUpdate();

  return (
    <div>
      <h1>Update current profile</h1>

      {user && (
        <Formik
          onSubmit={async values => {
            const { result, error } = await userUpdate(values);
            if (result) {
              console.log(result.owner);
            }
            if (error) {
              console.log(error);
            }
          }}
          initialValues={{
            title: user.owner.title || "",
            firstName: user.owner.firstName || "",
            lastName: user.owner.lastName || "",
            dob: user.owner.dob || "",
            gender: user.owner.gender || "",
            mobilePhone: user.owner.mobilePhone || "",
            email: user.owner.email || "",
            language: user.owner.language || "",
          }}
          render={() => (
            <Form>
              <TitleRadio />
              <Field name="firstName" component={SimpleInput} />
              <Field name="lastName" component={SimpleInput} />
              <Field name="dob" type="date" component={SimpleInput} />
              <Radio choices={["M", "F"]} label="Gender" name="gender" />
              <Field name="mobilePhone" type="phone" component={SimpleInput} />
              <Field name="email" type="email" component={SimpleInput} />
              <Field name="language" component={SimpleInput} />
              <button type="submit">Submit</button>
            </Form>
          )}
        />
      )}
    </div>
  );
};
