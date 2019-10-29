import { useMutation } from "@apollo/react-hooks";
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

export const useUserConfirmLegalForms = () => {
  const [confirmLegalForms, result] = useMutation<
    UserConfirmLegalForms,
    UserConfirmLegalFormsVariables
  >(UserConfirmLegalFormsMutation);

  return {
    ...result,
    error: result.error || (result.data && result.data.userConfirmLegalForms),
    userConfirmLegalForms: async ({
      token = useUserToken(),
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
