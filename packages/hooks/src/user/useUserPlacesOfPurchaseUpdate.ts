import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import {
  UserPlacesOfPurchaseUpdate,
  UserPlacesOfPurchaseUpdateVariables,
} from "./__generated__/UserPlacesOfPurchaseUpdate";
import { useUserToken } from "./tokenContext";
import { UserUpdatePlacesOfPurchaseInput } from "..";

export * from "./__generated__/UserPlacesOfPurchaseUpdate";

const UserPlacesOfPurchaseUpdateMutation = gql`
  mutation UserPlacesOfPurchaseUpdate(
    $updatePlacesOfPurchaseInput: UserUpdatePlacesOfPurchaseInput!
    $token: String!
  ) {
    userUpdatePlacesOfPurchase(
      updatePlacesOfPurchaseInput: $updatePlacesOfPurchaseInput
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

export const useUserPlacesOfPurchaseUpdate = () => {
  const userToken = useUserToken();
  const [updatePlacesOfPurchase, mutationResult] = useMutation<
    UserPlacesOfPurchaseUpdate,
    UserPlacesOfPurchaseUpdateVariables
  >(UserPlacesOfPurchaseUpdateMutation);

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userUpdatePlacesOfPurchase),
    userUpdatePlacesOfPurchase: async ({
      token = userToken,
      ...updatePlacesOfPurchaseInput
    }: {
      token?: string;
    } & UserUpdatePlacesOfPurchaseInput) => {
      return updatePlacesOfPurchase({
        variables: {
          token,
          updatePlacesOfPurchaseInput,
        },
      });
    },
  };
};
