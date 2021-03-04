import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  MetadataPartnerTypes,
  MetadataPartnerTypesVariables,
} from "./__generated__/MetadataPartnerTypes";

export * from "./__generated__/MetadataPartnerTypes";

const MetadataPartnerTypesQuery = gql`
  query MetadataPartnerTypes($lang: String!) {
    metadataPartnerTypes(lang: $lang) {
      code
      name
    }
  }
`;

export const useMetadataPartnerTypes = (
  optionsOrLang:
    | string
    | {
        lang: string;
        type?: string;
        skip?: boolean;
      },
  type?: string,
) => {
  const lang =
    typeof optionsOrLang === "object" ? optionsOrLang.lang : optionsOrLang;
  const skip = typeof optionsOrLang === "object" ? optionsOrLang.skip : false;
  type = typeof optionsOrLang === "object" ? optionsOrLang.type : type;

  const res = useQuery<MetadataPartnerTypes, MetadataPartnerTypesVariables>(
    MetadataPartnerTypesQuery,
    {
      variables: {
        lang,
      },
      skip,
    },
  );

  const items = (res.data && res.data.metadataPartnerTypes) || [];

  return {
    ...res,
    items,
  };
};
