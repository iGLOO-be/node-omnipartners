import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  UserSegments,
  UserSegmentsVariables,
} from "./__generated__/UserSegments";
import { useUserToken } from "./tokenContext";

export const UserSegmentsFragment = gql`
  fragment UserSegmentsFragment on User {
    owner {
      id
      guid
    }
    segments {
      handle
      id
    }
  }
`;

// ------------
// QUERY
// ------------

export const UserSegmentsQuery = gql`
  query UserSegments($token: String!) {
    user(token: $token) {
      result {
        id
        token
        ...UserSegmentsFragment
      }
      error {
        message
        code
      }
    }
  }
  ${UserSegmentsFragment}
`;

export const useUserSegments = ({
  token,
  skip,
}: { token?: string; skip?: boolean } = {}) => {
  const defaultToken = useUserToken();
  token = token || defaultToken;
  const res = useQuery<UserSegments, UserSegmentsVariables>(UserSegmentsQuery, {
    skip: skip || !token,
    variables: {
      token,
    },
  });

  return {
    ...res,
    segments:
      (res.data &&
        res.data.user &&
        res.data.user.result &&
        res.data.user.result.segments &&
        res.data.user.result.segments) ||
      [],
  };
};
