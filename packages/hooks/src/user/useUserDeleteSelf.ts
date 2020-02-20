import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useUserToken } from "../user/tokenContext";
import {
  UserDeleteSelf,
  UserDeleteSelfVariables,
} from "./__generated__/UserDeleteSelf";

const UserDeleteSelfMutation = gql`
  mutation UserDeleteSelf($token: String!) {
    userDeleteSelf(token: $token) {
      message
      code
    }
  }
`;

export const useUserDeleteSelf = () => {
  const [userDeleteSelf, mutationResult] = useMutation<
    UserDeleteSelf,
    UserDeleteSelfVariables
  >(UserDeleteSelfMutation);
  const token = useUserToken();

  return {
    ...mutationResult,
    error:
      mutationResult.error ||
      (mutationResult.data && mutationResult.data.userDeleteSelf),
    userDeleteSelf: async () => {
      const { data } = await userDeleteSelf({
        variables: {
          token,
        },
      });

      return !!data && !data.userDeleteSelf;
    },
  };
};
