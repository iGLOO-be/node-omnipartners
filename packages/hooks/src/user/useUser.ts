import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { User, UserVariables } from "./__generated__/User";
import { useUserToken } from "./tokenContext";

const UserQuery = gql`
  query User($token: String!) {
    user(token: $token) {
      result {
        token
        owner {
          guid
          firstName
          lastName
          email
          mobilePhone
          title
          country
          dob
          gender
        }
      }
      error {
        message
        code
      }
    }
  }
`;

export const useFetchUser = () => {
  const client = useApolloClient();
  return (variables: UserVariables) =>
    client.query<User, UserVariables>({
      query: UserQuery,
      variables,
    });
};

export const useUser = () => {
  const token = useUserToken();
  const res = useQuery<User, UserVariables>(UserQuery, {
    skip: !token,
    variables: {
      token,
    },
  });

  return {
    ...res,
    error: res.data && res.data.user && res.data.user.error,
    user: res.data && res.data.user && res.data.user.result,
  };
};
