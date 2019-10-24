import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  MetadataSubscriptions,
  MetadataSubscriptionsVariables,
} from "./__generated__/MetadataSubscriptions";

const MetadataSubscriptionsQuery = gql`
  query MetadataSubscriptions($lang: String!) {
    metadataSubscriptions(lang: $lang) {
      name
      code
    }
  }
`;

export const useMetadataSubscriptions = (lang: string) => {
  const { data, loading } = useQuery<
    MetadataSubscriptions,
    MetadataSubscriptionsVariables
  >(MetadataSubscriptionsQuery, {
    variables: {
      lang,
    },
  });

  const items = (data && data.metadataSubscriptions) || [];

  return {
    items,
    loading,
  };
};
