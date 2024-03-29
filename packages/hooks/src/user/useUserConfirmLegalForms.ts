import { MutationHookOptions, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import {
  UserConfirmLegalForms,
  UserConfirmLegalFormsVariables,
} from "./__generated__/UserConfirmLegalForms";
import { useUserToken } from "./tokenContext";

export * from "./__generated__/UserConfirmLegalForms";

const UserConfirmLegalFormsMutation = gql`
  mutation UserConfirmLegalForms(
    $token: String!
    $legalForms: [String!]!
    $confirmedPlace: String!
  ) {
    userConfirmLegalForms(
      token: $token
      confirmLegalFormsInput: {
        legal_form_code: $legalForms
        confirmed_place: $confirmedPlace
      }
    ) {
      message
      code
    }
  }
`;

export const useUserConfirmLegalForms = (
  options?: MutationHookOptions<
    UserConfirmLegalForms,
    UserConfirmLegalFormsVariables
  >,
) => {
  const [confirmLegalForms, result] = useMutation<
    UserConfirmLegalForms,
    UserConfirmLegalFormsVariables
  >(UserConfirmLegalFormsMutation, options);
  const userToken = useUserToken();

  return {
    ...result,
    error: result.error || (result.data && result.data.userConfirmLegalForms),
    userConfirmLegalForms: async ({
      token = userToken,
      legalForms,
      confirmedPlace,
    }: UserConfirmLegalFormsVariables & {
      token?: string;
    }) => {
      await confirmLegalForms({
        variables: {
          token,
          legalForms,
          confirmedPlace,
        },
      });
    },
  };
};
