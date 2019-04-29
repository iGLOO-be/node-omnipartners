import { Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { SimpleInput } from "../layout/SimpleInput";
import { useUserToken } from "../lib/useUserToken";
import { UserUpdate, UserUpdateVariables } from "./__generated__/UserUpdate";
import {
  UserUpdateFormRead,
  UserUpdateFormReadVariables,
} from "./__generated__/UserUpdateFormRead";
import { GenderRadio } from "./GenderRadio";
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

const UserUpdateFormReadQuery = gql`
  query UserUpdateFormRead($userToken: String!) {
    user(token: $userToken) {
      result {
        owner {
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
      }
    }
  }
`;

export const UserUpdateForm = () => {
  const userToken = useUserToken();
  const { data } = useQuery<UserUpdateFormRead, UserUpdateFormReadVariables>(
    UserUpdateFormReadQuery,
    {
      skip: !userToken.token,
      variables: {
        userToken: userToken.token,
      },
    },
  );

  const userUpdate = useMutation<UserUpdate, UserUpdateVariables>(
    UserUpdateMutation,
  );
  return (
    <div>
      <h1>Update profile</h1>

      {userToken.renderInput}

      {data && data.user && data.user.result && data.user.result.owner && (
        <Formik
          onSubmit={async values => {
            const { data: updatedData, errors } = await userUpdate({
              variables: {
                token: userToken.token,
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
            title: data.user.result.owner.title || "",
            firstName: data.user.result.owner.firstName || "",
            lastName: data.user.result.owner.lastName || "",
            dob: data.user.result.owner.dob || "",
            gender: data.user.result.owner.gender || "",
            mobilePhone: data.user.result.owner.mobilePhone || "",
            email: data.user.result.owner.email || "",
            language: data.user.result.owner.language || "",
          }}
          render={() => (
            <Form>
              <TitleRadio />
              <Field name="firstName" component={SimpleInput} />
              <Field name="lastName" component={SimpleInput} />
              <Field name="dob" type="date" component={SimpleInput} />
              <GenderRadio />
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
