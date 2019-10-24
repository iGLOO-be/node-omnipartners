import gql from "graphql-tag";

export const UserAddressFragment = gql`
  fragment UserAddressFragment on User {
    owner {
      guid
    }
    addresses {
      id
      street1
      postalCode
      country
      streetnum
      city
      isDefault
    }
  }
`;

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
