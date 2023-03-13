import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  MetadataPartnerTypeRoles,
  MetadataPartnerTypeRolesVariables,
} from "./__generated__/MetadataPartnerTypeRoles";
export * from "./__generated__/MetadataPartnerTypeRoles";

const MetadataPartnerTypeRolesQuery = gql`
  query MetadataPartnerTypeRoles($partnerType: String) {
    metadataPartnerTypeRoles(partnerType: $partnerType) {
      code
      name
      type
      relationship
    }
  }
`;

export const useMetadataPartnerTypeRoles = ({ type, skip }: {
  type?: string;
  skip?: boolean;
}) => {
  const res = useQuery<
    MetadataPartnerTypeRoles,
    MetadataPartnerTypeRolesVariables
  >(MetadataPartnerTypeRolesQuery, {
    variables: {
      partnerType: type,
    },
    skip,
  });

  const items = (res.data && res.data.metadataPartnerTypeRoles) || [];

  return {
    ...res,
    items,
  };
};
