import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  MetadataPlaceOfPurchase,
  MetadataPlaceOfPurchaseVariables,
} from "./__generated__/MetadataPlaceOfPurchase";

export * from "./__generated__/MetadataPlaceOfPurchase";

const MetadataPlaceOfPurchaseQuery = gql`
  query MetadataPlaceOfPurchase($lang: String!) {
    metadataPlaceOfPurchase(lang: $lang) {
      name
      code
    }
  }
`;

export const useMetadataPlaceOfPurchase = (
  optionsOrLang:
    | string
    | {
        lang: string;
        skip?: boolean;
      },
) => {
  const lang =
    typeof optionsOrLang === "object" ? optionsOrLang.lang : optionsOrLang;
  const skip = typeof optionsOrLang === "object" ? optionsOrLang.skip : false;
  const res = useQuery<
    MetadataPlaceOfPurchase,
    MetadataPlaceOfPurchaseVariables
  >(MetadataPlaceOfPurchaseQuery, {
    variables: {
      lang,
    },
    skip,
  });

  const items = (res.data && res.data.metadataPlaceOfPurchase) || [];

  return {
    ...res,
    items,
  };
};
