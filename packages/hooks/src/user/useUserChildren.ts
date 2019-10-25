import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { sortBy } from "lodash";
import { useUserToken } from "../user/tokenContext";
import {
  UserChildren,
  UserChildrenVariables,
} from "./__generated__/UserChildren";
import { UserChildrenFragment } from "./Fragments";

export const UserChildrenQuery = gql`
  query UserChildren($token: String!) {
    user(token: $token) {
      result {
        token
        owner {
          guid
        }
        ...UserChildrenFragment
      }
      error {
        message
        code
      }
    }
  }
  ${UserChildrenFragment}
`;

export const useUserChildren = () => {
  const token = useUserToken();
  const res = useQuery<UserChildren, UserChildrenVariables>(UserChildrenQuery, {
    skip: !token,
    variables: {
      token,
    },
  });

  const children = sortBy(
    (res.data &&
      res.data.user &&
      res.data.user.result &&
      res.data.user.result.children &&
      res.data.user.result.children.map(child => ({
        ...child,
        firstName: child.firstName === "--" ? "" : child.firstName,
      }))) ||
      [],
    [child => child.birthday],
  ).reverse();

  return {
    ...res,
    data: children.map(child => ({
      ...child,
      firstName: child.firstName === "--" ? "" : child.firstName,
    })),
  };
};
