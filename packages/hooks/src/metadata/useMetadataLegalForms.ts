import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  MetadataLegalForms,
  MetadataLegalFormsVariables,
} from "./__generated__/MetadataLegalForms";

export * from "./__generated__/MetadataLegalForms";

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
  const res = useQuery<MetadataLegalForms, MetadataLegalFormsVariables>(
    MetadataLegalFormsQuery,
    {
      variables: {
        lang,
        codes: codes.join(","),
      },
    },
  );

  const items = (res.data && res.data.metadataLegalForms) || [];

  return {
    ...res,
    items,
  };
};
