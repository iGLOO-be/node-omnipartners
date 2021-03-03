import { gql, useApolloClient } from "@apollo/client";
import {
  PartnerLocator,
  PartnerLocatorVariables,
} from "./__generated__/PartnerLocator";

export * from "./__generated__/PartnerLocator";

const PartnerLocatorQuery = gql`
  query PartnerLocator($partnerLocatorInput: PartnerLocatorInput!) {
    findPartners(partnerLocatorInput: $partnerLocatorInput) {
      extId
      lat
      lng
      partnerGroups
    }
  }
`;

export const useFetchPartnerLocator = () => {
  const client = useApolloClient();
  return (variables: PartnerLocatorVariables) =>
    client.query<PartnerLocator, PartnerLocatorVariables>({
      query: PartnerLocatorQuery,
      variables,
    });
};
