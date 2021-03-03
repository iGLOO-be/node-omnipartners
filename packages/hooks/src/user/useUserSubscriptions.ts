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
        token
        owner {
          guid
        }
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

export const useUserSubscriptions = () => {
  const token = useUserToken();
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
