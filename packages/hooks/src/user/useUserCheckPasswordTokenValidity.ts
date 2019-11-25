import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  UserCheckPasswordTokenValidity,
  UserCheckPasswordTokenValidityVariables,
} from "./__generated__/UserCheckPasswordTokenValidity";

export * from "./__generated__/UserCheckPasswordTokenValidity";

const UserCheckPasswordTokenValidityQuery = gql`
  query UserCheckPasswordTokenValidity($token: String!) {
    userCheckPasswordTokenValidity(token: $token)
  }
`;

export const useUserCheckPasswordTokenValidity = (token: string) => {
  const res = useQuery<
    UserCheckPasswordTokenValidity,
    UserCheckPasswordTokenValidityVariables
  >(UserCheckPasswordTokenValidityQuery, {
    variables: {
      token: token || "",
    },
    skip: !token,
  });

  return {
    ...res,
    isValid: res.data && res.data.userCheckPasswordTokenValidity,
  };
};

export const useFetchUserCheckPasswordTokenValidity = () => {
  const { refetch } = useQuery<
    UserCheckPasswordTokenValidity,
    UserCheckPasswordTokenValidityVariables
  >(UserCheckPasswordTokenValidityQuery, {
    skip: true,
  });

  return {
    passwordTokenIsValid: async ({ token }: { token: string }) => {
      const { data, errors, ...res } = await refetch({
        token,
      });

      return {
        ...res,
        data,
        error: errors,
        isValid: data && data.userCheckPasswordTokenValidity,
      };
    },
  };
};
