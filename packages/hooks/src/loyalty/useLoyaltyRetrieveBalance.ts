import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { QueryOptions } from "apollo-client";
import gql from "graphql-tag";
import { useUserToken } from "../user";
import {
  LoyaltyRetrieveBalance,
  LoyaltyRetrieveBalanceVariables,
} from "./__generated__/LoyaltyRetrieveBalance";

const LoyaltyRetrieveBalanceQuery = gql`
  query LoyaltyRetrieveBalance(
    $token: String!
    $program_id: String!
    $card_program_id: String
  ) {
    loyaltyRetrieveBalance(
      token: $token
      program_id: $program_id
      card_program_id: $card_program_id
    ) {
      user_total_points
      user_guid
      user_hold_points
      status
    }
  }
`;

export const useFetchLoyaltyRetrieveBalance = (
  queryOptions?: Omit<
    QueryOptions<LoyaltyRetrieveBalanceVariables>,
    "variables" | "query"
  >,
) => {
  const client = useApolloClient();
  const defaultToken = useUserToken();
  return ({
    token,
    program_id,
    card_program_id,
  }: {
    token?: string;
    program_id: string;
    card_program_id?: string;
  }) =>
    client.query<LoyaltyRetrieveBalance, LoyaltyRetrieveBalanceVariables>({
      query: LoyaltyRetrieveBalanceQuery,
      variables: {
        token: token || defaultToken,
        program_id,
        card_program_id,
      },
      ...queryOptions,
    });
};

export const useLoyaltyRetrieveBalance = ({
  token,
  program_id,
  card_program_id,
  skip,
}: {
  token?: string;
  program_id: string;
  card_program_id?: string;
  skip?: boolean;
}) => {
  const defaultToken = useUserToken();
  token = token || defaultToken;
  const res = useQuery<LoyaltyRetrieveBalance, LoyaltyRetrieveBalanceVariables>(
    LoyaltyRetrieveBalanceQuery,
    {
      skip: skip || !token,
      variables: {
        token,
        program_id,
        card_program_id,
      },
    },
  );

  return {
    ...res,
    balance: res.data && res.data.loyaltyRetrieveBalance,
  };
};
