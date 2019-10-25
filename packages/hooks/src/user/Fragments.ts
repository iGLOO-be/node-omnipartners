import gql from "graphql-tag";

export const UserChildrenFragment = gql`
  fragment UserChildrenFragment on User {
    owner {
      guid
    }
    children {
      birthday
      gender
      guid
      firstName
    }
  }
`;

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
