import { Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { SimpleInput } from "../layout/SimpleInput";
import { useUser } from "../lib/user/useUser";
import { UserUpdate, UserUpdateVariables } from "./__generated__/UserUpdate";
import { Radio } from "./Radio";
import { TitleRadio } from "./TitleRadio";

const UserUpdateMutation = gql`
  mutation UserUpdate($token: String!, $userInput: UserUpdateInput!) {
    userUpdate(token: $token, userInput: $userInput) {
      result {
        owner {
          guid
          firstName
          lastName
          email
          gender
          mobilePhone
          title
          dob
          language
        }
      }
      error {
        message
        code
      }
    }
  }
`;

export const UserUpdateForm = () => {
  const { userToken, user: { user } } = useUser();

  const userUpdate = useMutation<UserUpdate, UserUpdateVariables>(
    UserUpdateMutation,
  );
  return (
    <div>
      <h1>Update current profile</h1>

      {user && (
        <Formik
          onSubmit={async values => {
            const { data: updatedData, errors } = await userUpdate({
              variables: {
                token: userToken,
                userInput: values,
              },
            });

            if (
              updatedData &&
              updatedData.userUpdate &&
              updatedData.userUpdate.result
            ) {
              console.log(updatedData.userUpdate.result.owner);
            }

            if (errors) {
              console.error(errors);
            }

            if (
              updatedData &&
              updatedData.userUpdate &&
              updatedData.userUpdate.error
            ) {
              console.log(updatedData.userUpdate.error);
            }
          }}
          initialValues={{
            title: user.result.owner.title || "",
            firstName: user.result.owner.firstName || "",
            lastName: user.result.owner.lastName || "",
            dob: user.result.owner.dob || "",
            gender: user.result.owner.gender || "",
            mobilePhone: user.result.owner.mobilePhone || "",
            email: user.result.owner.email || "",
            language: user.result.owner.language || "",
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
