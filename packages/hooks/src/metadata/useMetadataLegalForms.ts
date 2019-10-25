import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  MetadataLegalForms,
  MetadataLegalFormsVariables,
} from "./__generated__/MetadataLegalForms";

const MetadataLegalFormsQuery = gql`
  query MetadataLegalForms($lang: String!, $codes: String!) {
    metadataLegalForms(lang: $lang, codes: $codes) {
      name
      code
      description
      url
    }
  }
`;

export const useMetadataLegalForms = (lang: string, codes: string[] = []) => {
  const { data, loading } = useQuery<
    MetadataLegalForms,
    MetadataLegalFormsVariables
  >(MetadataLegalFormsQuery, {
    variables: {
      lang,
      codes: codes.join(","),
    },
  });

  const items = (data && data.metadataLegalForms) || [];

  return {
    items,
    loading,
  };
};
