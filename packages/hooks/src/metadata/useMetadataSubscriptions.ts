import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  MetadataSubscriptions,
  MetadataSubscriptionsVariables,
} from "./__generated__/MetadataSubscriptions";

export * from "./__generated__/MetadataSubscriptions";

const MetadataSubscriptionsQuery = gql`
  query MetadataSubscriptions($lang: String!) {
    metadataSubscriptions(lang: $lang) {
      name
      code
    }
  }
`;

export const useMetadataSubscriptions = (
  optionsOrLang:
    | string
    | {
        skip?: boolean;
        lang: string;
      },
) => {
  const lang =
    typeof optionsOrLang === "object" ? optionsOrLang.lang : optionsOrLang;
  const skip = typeof optionsOrLang === "object" ? optionsOrLang.skip : false;

  const res = useQuery<MetadataSubscriptions, MetadataSubscriptionsVariables>(
    MetadataSubscriptionsQuery,
    {
      variables: {
        lang,
      },
      skip,
    },
  );

  const items = (res.data && res.data.metadataSubscriptions) || [];

  return {
    ...res,
    items,
  };
};
