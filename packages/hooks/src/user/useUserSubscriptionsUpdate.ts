import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  UserSubscriptionsUpdate,
  UserSubscriptionsUpdateVariables,
} from "./__generated__/UserSubscriptionsUpdate";
import { useUserToken } from "./tokenContext";
import { UserSubscriptionsQuery } from "./useUserSubscriptions";

export * from "./__generated__/UserSubscriptionsUpdate";

const UserSubscriptionsUpdateMutation = gql`
  mutation UserSubscriptionsUpdate(
    $updateSubscriptionsInput: UserUpdateSubscriptionsInput!
    $token: String!
  ) {
    userUpdateSubscriptions(
      updateSubscriptionsInput: $updateSubscriptionsInput
      token: $token
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

export const useUserSubscriptionsUpdate = () => {
  const token = useUserToken();
  const [updateSubscriptions, mutationResult] = useMutation<
    UserSubscriptionsUpdate,
    UserSubscriptionsUpdateVariables
  >(UserSubscriptionsUpdateMutation);

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userUpdateSubscriptions),
    userUpdateSubscriptions: async (subscriptions: string[]) =>
      updateSubscriptions({
        refetchQueries: [
          {
            query: UserSubscriptionsQuery,
            variables: {
              token,
            },
          },
        ],
        awaitRefetchQueries: true,
        variables: {
          token,
          updateSubscriptionsInput: {
            subscriptions,
          },
        },
      }),
  };
};
