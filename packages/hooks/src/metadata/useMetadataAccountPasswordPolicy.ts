import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { MetadataAccountPasswordPolicy } from "./__generated__/MetadataAccountPasswordPolicy";

export * from "./__generated__/MetadataAccountPasswordPolicy";

const MetadataAccountPasswordPolicyQuery = gql`
  query MetadataAccountPasswordPolicy {
    metadataAccountPasswordPolicy {
      password_format
      alt_password_format
    }
  }
`;

export function useMetadataAccountPasswordPolicy({
  skip,
}: { skip?: boolean } = {}) {
  const res = useQuery<MetadataAccountPasswordPolicy>(
    MetadataAccountPasswordPolicyQuery,
    {
      skip,
    },
  );

  return {
    ...res,
    passwordPolicy: res.data?.metadataAccountPasswordPolicy,
  };
}
