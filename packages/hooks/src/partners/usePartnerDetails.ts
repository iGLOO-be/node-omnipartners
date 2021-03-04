import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import {
  PartnerDetails,
  PartnerDetailsVariables,
} from "./__generated__/PartnerDetails";

export * from "./__generated__/PartnerDetails";

const PartnerDetailsQuery = gql`
  query PartnerDetails($extId: String!) {
    partnerDetails(partner_ext_id: $extId) {
      extId
      lat
      lng
      street1
      postalCode
      city
      name
      type
      streetnum
      partnerGroups
    }
  }
`;

export const usePartnerDetails = ({ extId }: { extId?: string }) => {
  const { data, ...res } = useQuery<PartnerDetails, PartnerDetailsVariables>(
    PartnerDetailsQuery,
    {
      variables: {
        extId: extId || "",
      },
      skip: !extId,
    },
  );

  return {
    ...res,
    data: (data && data.partnerDetails) || [],
  };
};
