import { useQuery } from "@apollo/react-hooks";
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
    $auth_type: String
  ) {
    loyaltyRetrieveBalance(
      token: $token
      program_id: $program_id
      card_program_id: $card_program_id
      auth_type: $auth_type
    ) {
      user_total_points
      user_guid
      user_hold_points
      status
    }
  }
`;

export const useLoyaltyRetrieveBalance = ({
  token,
  program_id,
  card_program_id,
}: {
  token?: string;
  program_id: string;
  card_program_id?: string;
}) => {
  const defaultToken = useUserToken();
  token = token || defaultToken;
  const res = useQuery<LoyaltyRetrieveBalance, LoyaltyRetrieveBalanceVariables>(
    LoyaltyRetrieveBalanceQuery,
    {
      skip: !token,
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
