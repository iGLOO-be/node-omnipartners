import { useQuery } from "@apollo/client";
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

export const useMetadataLegalForms = (
  optionsOrLang:
    | string
    | {
        lang: string;
        skip?: boolean;
        codes?: string[];
      },
  codes: string[] = [],
) => {
  const lang =
    typeof optionsOrLang === "object" ? optionsOrLang.lang : optionsOrLang;
  const skip = typeof optionsOrLang === "object" ? optionsOrLang.skip : false;
  codes =
    typeof optionsOrLang === "object" ? optionsOrLang.codes || codes : codes;

  const res = useQuery<MetadataLegalForms, MetadataLegalFormsVariables>(
    MetadataLegalFormsQuery,
    {
      variables: {
        lang,
        codes: codes.join(","),
      },
      skip,
    },
  );

  const items = (res.data && res.data.metadataLegalForms) || [];

  return {
    ...res,
    items,
  };
};
