import { Field, FieldProps, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import {
  UserQuery,
  UserQueryVariables,
} from "./__generated__/UserQuery";

const User = gql`
  query UserQuery($token: String!) {
    user(token: $token) {
      result {
        owner {
          user_guid
          firstName
          lastName
          email
        }
      }
      error {
        message
        code
      }
    }
  }
`;

// const UserUpdate = gql`
//   mutation UserUpdateMutation(
//     $token: String!
//     $userInput: UserUpdateInput!
//   ) {
//     userUpdate(token: $token, userInput: $userInput) {
//       result {
//         owner {
//           user_guid
//           firstName
//           lastName
//           email
//         }
//       }
//       error {
//         message
//         code
//       }
//     }
//   }
// `;

const SimpleInput =({ field }: FieldProps) => (
  <div>
    <div>
      <label htmlFor={field.name}>{field.name}</label>
    </div>
    <input {...field} id={field.name} type="text" />
  </div>
)

const Update = () => {
  const { data, loading } = useQuery<UserQuery, UserQueryVariables>(
    User,
    {
      variables: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRhNDAwZDk4ZGU2YTBlOWRkNWU4YmY4ZDM1Y2MzOTMyNGQyNWM1ZjciLCJ1c2VyX2d1aWQiOiJkOTYyZDNlZTk2ZGUxMmNlYTc3ZDk1ZmNiMTllMmU0ZCIsImlhdCI6MTU1NjI2ODAwNSwiZXhwIjoxNTU3MTMyMDA1fQ.silTkoOnL__dmlCQBuALgPUenCaIX8Mt98lJEFA_8s8",
      },
    },
  );

  if (loading) {
    return "Loading ...";
  }

  if (data && data.user && data.user.result) {
    console.log(data.user.result.owner);
    return (
      <div>
        <h1>Update profile</h1>
        <Formik
          onSubmit={values => console.log(values)}
          initialValues={{
            user_city: "",
            user_country: "",
            user_county: "",
            user_dob: "",
            user_email: "",
            user_ext_id: "",
            user_facebook_id: "",
            user_first_name: "",
            user_gender: "",
            user_language: "",
            user_last_name: "",
            user_lat: "",
            user_lng: "",
            user_mobile_phone: "",
            user_national_id: "",
            user_password: "",
            user_postal_code: "",
            user_street1: "",
            user_street2: "",
            user_streetnum: "",
            user_telephone: "",
            user_title: "",
            user_username: "",
            user_website: "",
          }}
          render={() => (
            <Form>
              <Field
                name="user_first_name"
                component={SimpleInput}
              />
            </Form>
          )}
        />
      </div>
    );
  }
  return "";
};

export default Update;
