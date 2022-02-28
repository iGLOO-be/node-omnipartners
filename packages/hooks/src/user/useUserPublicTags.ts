import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  UserPublicTags,
  UserPublicTagsVariables,
} from "./__generated__/UserPublicTags";

export * from "./__generated__/UserPublicTags";

const UserPublicTagsQuery = gql`
  query UserPublicTags($publicToken: String!, $userEmail: String!) {
    userPublicTags(publicToken: $publicToken, userEmail: $userEmail) {
      result {
        tags
      }
      error {
        message
        code
      }
    }
  }
`;

export const useUserPublicTags = ({
  publicToken,
  userEmail,
}: {
  publicToken?: string;
  userEmail?: string;
}) => {
  const res = useQuery<UserPublicTags, UserPublicTagsVariables>(
    UserPublicTagsQuery,
    {
      skip: !(publicToken || userEmail),
      variables: {
        publicToken: publicToken || "",
        userEmail: userEmail || "",
      },
    },
  );

  return {
    ...res,
    userPublicTags: res.data?.userPublicTags?.result,
  };
};
