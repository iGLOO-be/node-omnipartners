import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { DealSubscribeInput } from "../../__generated__/globalTypes";
import { useUserToken } from "../user/tokenContext";
import {
  DealSubscribe,
  DealSubscribeVariables,
} from "./__generated__/DealSubscribe";

const DealSubscribeMutation = gql`
  mutation DealSubscribe(
    $dealSubscribeInput: DealSubscribeInput!
    $token: String!
  ) {
    dealSubscribe(input: $dealSubscribeInput, token: $token) {
      message
      code
      validationErrors {
        field
        errors {
          message
          validator
        }
      }
    }
  }
`;

export const useDealSubscribe = () => {
  const token = useUserToken();
  const [dealSubscribe, res] = useMutation<
    DealSubscribe,
    DealSubscribeVariables
  >(DealSubscribeMutation);

  return {
    ...res,
    dealSubscribe: async (dealSubscribeInput: DealSubscribeInput) => {
      const { data } = await dealSubscribe({
        variables: {
          dealSubscribeInput,
          token,
        },
      });

      return data && data.dealSubscribe;
    },
  };
};
