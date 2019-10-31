import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  UserSegments,
  UserSegmentsVariables,
} from "./__generated__/UserSegments";
import { useUserToken } from "./tokenContext";

export const UserSegmentsFragment = gql`
  fragment UserSegmentsFragment on User {
    owner {
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
        token
        owner {
          guid
        }
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

export const useUserSegments = () => {
  const token = useUserToken();
  const res = useQuery<UserSegments, UserSegmentsVariables>(UserSegmentsQuery, {
    skip: !token,
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
