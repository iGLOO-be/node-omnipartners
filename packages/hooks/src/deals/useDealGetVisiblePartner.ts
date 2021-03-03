import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { useUserToken } from "../user";
import {
  DealVisiblePartnerForUser,
  DealVisiblePartnerForUserVariables,
} from "./__generated__/DealVisiblePartnerForUser";

const DealVisiblePartnerForUserQuery = gql`
  query DealVisiblePartnerForUser(
    $token: String!
    $deal_ref: String!
    $search: String
    $favorite_only: Boolean
    $partner_lat: Float
    $partner_lng: Float
    $radius: Float
  ) {
    dealVisiblePartnerForUser(
      token: $token
      deal_ref: $deal_ref
      search: $search
      favorite_only: $favorite_only
      partner_lat: $partner_lat
      partner_lng: $partner_lng
      radius: $radius
    ) {
      pageInfo {
        hasNextPage
        page
        limit
        count
      }
      result {
        id
        extid
        name
        street1
        street2
        streetnum
        postal_code
        city
        region
        country
        lat
        lng
      }
    }
  }
`;

export const useDealVisiblePartnerForUser = ({
  token,
  deal_ref,
  search,
  favorite_only,
  partner_lat,
  partner_lng,
  radius,
  skip,
}: {
  token?: string;
  deal_ref: string;
  search?: string;
  favorite_only?: boolean;
  partner_lat?: number;
  partner_lng?: number;
  radius?: number;
  skip?: boolean;
}) => {
  const defaultToken = useUserToken();
  token = token || defaultToken;
  const { data, ...res } = useQuery<
    DealVisiblePartnerForUser,
    DealVisiblePartnerForUserVariables
  >(DealVisiblePartnerForUserQuery, {
    variables: {
      token,
      deal_ref,
      search,
      favorite_only,
      partner_lat,
      partner_lng,
      radius,
    },
    skip: skip || !token || !deal_ref,
  });

  return {
    ...res,
    data: data && data.dealVisiblePartnerForUser,
  };
};
