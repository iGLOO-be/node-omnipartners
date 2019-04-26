import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { LoginForm } from "../components/Login";
import { UserCreateForm } from "../components/UserCreateForm";
import { UserUpdateForm } from "../components/UserUpdateForm";
import { UserQuery, UserQueryVariables } from "./__generated__/UserQuery";

const User = gql`
  query UserQuery($token: String!) {
    user(token: $token) {
      result {
        owner {
          guid
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

const UserPage = () => {
  const { data, loading } = useQuery<UserQuery, UserQueryVariables>(User, {
    variables: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRhNDAwZDk4ZGU2YTBlOWRkNWU4YmY4ZDM1Y2MzOTMyNGQyNWM1ZjciLCJ1c2VyX2d1aWQiOiJkOTYyZDNlZTk2ZGUxMmNlYTc3ZDk1ZmNiMTllMmU0ZCIsImlhdCI6MTU1NjI2ODAwNSwiZXhwIjoxNTU3MTMyMDA1fQ.silTkoOnL__dmlCQBuALgPUenCaIX8Mt98lJEFA_8s8",
    },
  });

  if (loading) {
    return "Loading ...";
  }

  if (data && data.user && data.user.result) {
    return (
      <>
        <LoginForm />
        <UserCreateForm />
        <UserUpdateForm />
      </>
    );
  }
  return "";
};

export default UserPage;
