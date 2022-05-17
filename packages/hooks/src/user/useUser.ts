import { useApolloClient, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { User, UserVariables } from "./__generated__/User";
import { useUserToken } from "./tokenContext";

export * from "./__generated__/User";

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

export const useFetchUser = () => {
  const client = useApolloClient();
  return (variables: UserVariables) =>
    client.query<User, UserVariables>({
      query: UserQuery,
      variables,
    });
};

export const useUser = ({ token: givenToken }: { token?: string } = {}) => {
  const userToken = useUserToken();
  const token = givenToken || userToken;
  const res = useQuery<User, UserVariables>(UserQuery, {
    skip: !token,
    variables: {
      token,
    },
    notifyOnNetworkStatusChange: true,
  });

  return {
    ...res,
    error: res.data && res.data.user && res.data.user.error,
    user: res.data && res.data.user && res.data.user.result,
  };
};
