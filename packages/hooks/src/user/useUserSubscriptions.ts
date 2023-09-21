import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  UserSubscriptions,
  UserSubscriptionsVariables,
} from "./__generated__/UserSubscriptions";
import { useUserToken } from "./tokenContext";

export * from "./__generated__/UserSubscriptions";

export const UserSubscriptionsFragment = gql`
  fragment UserSubscriptionsFragment on User {
    owner {
      id
      guid
    }
    preferences {
      subscriptions
    }
  }
`;

export const UserSubscriptionsQuery = gql`
  query UserSubscriptions($token: String!) {
    user(token: $token) {
      result {
        id
        token
        ...UserSubscriptionsFragment
      }
      error {
        message
        code
      }
    }
  }
  ${UserSubscriptionsFragment}
`;

export const useUserSubscriptions = ({ token: givenToken }: { token?: string } = {}) => {
  const userToken = useUserToken();
  const token = givenToken || userToken;
  const res = useQuery<UserSubscriptions, UserSubscriptionsVariables>(
    UserSubscriptionsQuery,
    {
      skip: !token,
      variables: {
        token,
      },
    },
  );

  return {
    ...res,
    data:
      (res.data &&
        res.data.user &&
        res.data.user.result &&
        res.data.user.result.preferences &&
        res.data.user.result.preferences.subscriptions) ||
      [],
  };
};
