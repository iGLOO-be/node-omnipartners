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
  query UserPublicSubscriptions($userGuid: String!, $userEmail: String!) {
    userPublicSubscriptions(userGuid: $userGuid, userEmail: $userEmail) {
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
  userGuid,
  userEmail,
}: {
  userGuid?: string;
  userEmail?: string;
}) => {
  const res = useQuery<
    UserPublicSubscriptions,
    UserPublicSubscriptionsVariables
  >(UserPublicSubscriptionsQuery, {
    skip: !(userGuid || userEmail),
    variables: {
      userGuid: userGuid || "",
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
    $userGuid: String!
    $userEmail: String!
  ) {
    userPublicSubscriptionsUpdate(input: $input, userGuid: $userGuid, userEmail: $userEmail) {
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
  userGuid,
  userEmail,
}: {
  userGuid: string;
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
              userGuid,
              userEmail,
            },
          },
        ],
        awaitRefetchQueries: true,
        variables: {
          userGuid,
          userEmail,
          input: {
            subscriptions,
          },
        },
      });
    },
  };
};
