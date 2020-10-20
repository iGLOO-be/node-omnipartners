import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  UserPublicSubscriptions,
  UserPublicSubscriptionsVariables,
} from "./__generated__/UserPublicSubscriptions";
import {
  UserPublicSubscriptionsUpdate,
  UserPublicSubscriptionsUpdateVariables,
} from "./__generated__/UserPublicSubscriptionsUpdate";

export * from "./__generated__/UserPublicSubscriptions";

const UserPublicSubscriptionsQuery = gql`
  query UserPublicSubscriptions($publicToken: String!, $userEmail: String!) {
    userPublicSubscriptions(publicToken: $publicToken, userEmail: $userEmail) {
      result {
        subscriptions
      }
      error {
        message
        code
      }
    }
  }
`;

export const useUserPublicSubscriptions = ({
  publicToken,
  userEmail,
}: {
  publicToken?: string;
  userEmail?: string;
}) => {
  const res = useQuery<
    UserPublicSubscriptions,
    UserPublicSubscriptionsVariables
  >(UserPublicSubscriptionsQuery, {
    skip: !(publicToken || userEmail),
    variables: {
      publicToken: publicToken || "",
      userEmail: userEmail || "",
    },
  });

  return {
    ...res,
    userPublicSubscriptions: res.data?.userPublicSubscriptions?.result,
  };
};

const UserPublicSubscriptionsUpdateMutation = gql`
  mutation UserPublicSubscriptionsUpdate(
    $input: UserPublicSubscriptionsUpdateInput!
    $publicToken: String!
    $userEmail: String!
  ) {
    userPublicSubscriptionsUpdate(
      input: $input
      publicToken: $publicToken
      userEmail: $userEmail
    ) {
      message
      code
      validationErrors {
        field
        errors {
          validator
          message
        }
      }
    }
  }
`;

export const useUserPublicSubscriptionsUpdate = ({
  publicToken,
  userEmail,
}: {
  publicToken: string;
  userEmail: string;
}) => {
  const [updateSubscriptions, mutationResult] = useMutation<
    UserPublicSubscriptionsUpdate,
    UserPublicSubscriptionsUpdateVariables
  >(UserPublicSubscriptionsUpdateMutation);

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data &&
        mutationResult.data.userPublicSubscriptionsUpdate),
    userPublicSubscriptionsUpdate: async (
      optionsOrSubscriptions:
        | {
            subscriptions: string[];
          }
        | string[],
    ) => {
      const subscriptions = Array.isArray(optionsOrSubscriptions)
        ? optionsOrSubscriptions
        : optionsOrSubscriptions.subscriptions;

      return updateSubscriptions({
        refetchQueries: [
          {
            query: UserPublicSubscriptionsQuery,
            variables: {
              publicToken,
              userEmail,
            },
          },
        ],
        awaitRefetchQueries: true,
        variables: {
          publicToken,
          userEmail,
          input: {
            subscriptions,
          },
        },
      });
    },
  };
};
