import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import {
  DealCheckSecureCode,
  DealCheckSecureCodeVariables,
} from "./__generated__/DealCheckSecureCode";

export { DealCheckSecureCode, DealCheckSecureCodeVariables };

const DealCheckSecureCodeQuery = gql`
  query DealCheckSecureCode($code: String!, $deal_ref: String!) {
    dealCheckSecureCode(code: $code, deal_ref: $deal_ref) {
      message
      code
      validationErrors {
        field
        errors {
          validator
          message
        }
      }
    }
  }
`;

export const useDealCheckSecureCode = () => {
  const { data, ...res } = useQuery<
    DealCheckSecureCode,
    DealCheckSecureCodeVariables
  >(DealCheckSecureCodeQuery, {
    skip: true,
  });

  return {
    ...res,
    data: data && data.dealCheckSecureCode,
  };
};
