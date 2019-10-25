import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  UserSubscriptions,
  UserSubscriptionsVariables,
} from "./__generated__/UserSubscriptions";
import { UserSubscriptionsFragment } from "./Fragments";
import { useUserToken } from "./useUser";

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
